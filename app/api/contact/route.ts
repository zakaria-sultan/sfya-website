import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contact } from "@/lib/content";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 24_000;
// Best-effort per-instance abuse protection; no message contents are retained.
const attempts = new Map<string, { count: number; expires: number }>();
const reply = (message: string, status: number) => NextResponse.json({ message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return reply("Please send your message from the SFYA website.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply("Please submit the contact form.", 415);
  }
  const reader = request.body?.getReader();
  if (!reader) return reply("Please complete all fields.", 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  let data: Record<string, unknown>;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return reply("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid payload");
    data = parsed as Record<string, unknown>;
  } catch {
    return reply("Please check your message and try again.", 400);
  }
  if (typeof data.website !== "string" || data.website !== "") return reply("Unable to send this message.", 400);
  const field = (key: string) => typeof data[key] === "string" ? data[key].trim() : "";
  const name = field("name"), email = field("email"), subject = field("subject"), message = field("message");
  const headerControl = /[\u0000-\u001f\u007f]/;
  if (name.length < 2 || name.length > 100 || headerControl.test(name) ||
      email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || headerControl.test(email) ||
      subject.length < 3 || subject.length > 160 || headerControl.test(subject) ||
      message.length < 10 || message.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message)) {
    return reply("Please enter a valid name, email, subject and message (10–5,000 characters).", 400);
  }
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const port = Number(SMTP_PORT || "465");
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || ![465, 587].includes(port)) {
    return reply("Email delivery is temporarily unavailable. Please contact us on WhatsApp or email info@sharedyouth.com.", 503);
  }
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  // Vercel supplies this header. Locally all visitors share the fallback bucket.
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "local";
  const attempt = attempts.get(ip) || { count: 0, expires: now + 15 * 60_000 };
  if (attempt.count >= 5 || attempts.size >= 10_000) return reply("Too many messages. Please try again later or use WhatsApp.", 429);
  attempt.count += 1;
  attempts.set(ip, attempt);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: port === 465, requireTLS: true,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "SFYA Website", address: SMTP_USER },
      to: contact.email,
      replyTo: { name, address: email },
      subject: `[SFYA website] ${subject}`,
      // Plain text prevents user-provided markup from being interpreted as HTML.
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (!result.accepted?.length) throw new Error("Recipient not accepted");
    return reply("Thank you! Your message has been sent to the SFYA team.", 200);
  } catch {
    // Never expose SMTP credentials, provider responses or visitor content.
    return reply("Your message could not be sent. Please try again later or contact us on WhatsApp.", 502);
  } finally {
    transport.close();
  }
}
