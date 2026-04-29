"use server";

import { Resend } from "resend";
import { z } from "zod";
import { dict, resolveLocale } from "@/lib/i18n";

type State =
  | { success: true }
  | { success: false; error: string };

export async function sendContactEmail(_: State | null, formData: FormData): Promise<State> {
  const locale = resolveLocale(formData.get("locale"));
  const messages = dict[locale].contact;

  const schema = z.object({
    name: z.string().min(1, messages.validation.nameRequired).max(100),
    email: z.string().email(messages.validation.emailInvalid),
    message: z.string().min(10, messages.validation.messageMin).max(5000),
  });

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, message } = parsed.data;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <hello@ramoncarrillo.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { success: false, error: messages.genericError };
  }

  return { success: true };
}
