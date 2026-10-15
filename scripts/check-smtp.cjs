const { loadEnvConfig } = require('@next/env');
const nodemailer = require('nodemailer');

// Use the same development environment-file loading as Next.js. Never print secrets.
loadEnvConfig(process.cwd(), true, { info() {}, error() {} });

async function main() {
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
  const missing = required.filter(key => !process.env[key]?.trim());
  if (missing.length) {
    console.error(`SMTP is not configured. Fill these variables in .env.local: ${missing.join(', ')}.`);
    process.exitCode = 1;
    return;
  }
  const port = Number(process.env.SMTP_PORT || '465');
  if (![465, 587].includes(port)) {
    console.error('SMTP_PORT must be 465 (TLS) or 587 (STARTTLS).');
    process.exitCode = 1;
    return;
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  try {
    await transport.verify();
    console.log('SMTP connection and authentication passed. No email was sent.');
    console.log('Next: submit the Contact form and confirm receipt in info@sharedyouth.com.');
  } catch (error) {
    const hints = {
      EAUTH: 'Authentication failed. Check the mailbox username and password or provider-required app password.',
      EDNS: 'SMTP host could not be resolved. Check SMTP_HOST.',
      ETIMEDOUT: 'Connection timed out. Check the host, port and network access.',
      ESOCKET: 'TLS/socket connection failed. Check the provider host, port and certificate settings.',
      ECONNECTION: 'Could not connect to the SMTP server. Check the host and port.',
    };
    console.error(hints[error.code] || 'SMTP verification failed. Check the provider settings and network access.');
    process.exitCode = 1;
  } finally {
    transport.close();
  }
}

main().catch(() => {
  console.error('Unable to check SMTP configuration. No credentials have been printed.');
  process.exitCode = 1;
});
