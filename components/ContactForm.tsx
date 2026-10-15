"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      setStatus({ ok: response.ok, message: result.message });
      if (response.ok) form.reset();
    } catch {
      setStatus({ ok: false, message: "Your message could not be sent. Please try again or contact us on WhatsApp." });
    } finally {
      setPending(false);
    }
  }

  return <div className="card p-8 sm:p-10">
    <p className="eyebrow">Send us a message</p>
    <h2 className="mt-4 text-3xl font-bold tracking-tight">We’d love to hear from you.</h2>
    <p className="mt-4 text-sm leading-7 text-slate-600">Send your enquiry directly to the SFYA team at info@sharedyouth.com.</p>
    <form className="contact-form mt-7" onSubmit={submit} aria-busy={pending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100}/></div>
        <div><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254}/></div>
      </div>
      <div><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required minLength={3} maxLength={160}/></div>
      <div><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6}/></div>
      <div className="contact-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
      <p className="text-xs leading-6 text-slate-500">We use your name, email and message to respond to your enquiry. Please avoid including sensitive personal information.</p>
      <button className="button button-gold w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto" type="submit" disabled={pending}>{pending ? "Sending…" : "Send message"}<Send size={17}/></button>
      <div aria-live="polite" aria-atomic="true">{status && <p role={status.ok ? "status" : "alert"} className={`flex items-start gap-2 rounded-md p-4 text-sm leading-6 ${status.ok ? "bg-teal-50 text-teal-900" : "bg-red-50 text-red-900"}`}>{status.ok && <CheckCircle2 className="mt-1" size={18}/>} {status.message}</p>}</div>
    </form>
  </div>;
}
