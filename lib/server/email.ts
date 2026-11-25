// Server-only. Order emails through Resend (resend.com), one HTTP call, no extra package.
// Without RESEND_API_KEY the emails are written to the server log instead, and Paystack's own receipt still
// reaches the customer.
import { email, isDemo } from "./config";

export async function sendEmail(to: string, subject: string, text: string, replyTo?: string): Promise<boolean> {
  const { resendKey, from } = email();
  if (!resendKey || isDemo()) {
    console.log(`[email${isDemo() ? ", demo" : ", not sent: RESEND_API_KEY missing"}] to ${to}: ${subject}\n${text}`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.ok;
}
