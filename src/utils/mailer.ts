import nodemailer from "nodemailer";
import { config } from "@/config";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user && config.smtp.pass ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });
  }
  return transporter;
}

export async function sendMail(options: { to: string; subject: string; html?: string; text?: string }) {
  const mailer = getTransporter();
  const { to, subject, html, text } = options;
  return mailer.sendMail({
    from: config.smtp.from,
    to,
    subject,
    html,
    text,
  });
}

export default { sendMail };


