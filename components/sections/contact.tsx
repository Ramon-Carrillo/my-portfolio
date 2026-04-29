"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, useReducedMotion } from "framer-motion";
import { sendContactEmail } from "@/app/actions/contact";
import { useLocale, useT } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

// `border-input` was bumped in globals.css (L=0.88 → L=0.72) so this
// now meets WCAG 1.4.11's 3:1 UI-component boundary requirement
// without needing a per-input override.
const inputClass = cn(
  "w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
  "disabled:opacity-50"
);

// Visible label — replaces placeholder-as-label which disappears once
// the user starts typing (loss of context for screen-readers
// mid-compose, and a UX regression for everyone).
const labelClass =
  "block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5";

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const VP = { once: true, margin: "-80px" } as const;

export function Contact() {
  const t = useT();
  const locale = useLocale();
  const reduced = useReducedMotion() ?? false;
  const [pending, setPending] = useState(false);

  // Recompute the schema when the locale changes so validation
  // messages render in the active language.
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t.contact.validation.nameRequired).max(100),
        email: z.string().email(t.contact.validation.emailInvalid),
        message: z
          .string()
          .min(10, t.contact.validation.messageMin)
          .max(5000),
      }),
    [t],
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("locale", locale);
      const result = await sendContactEmail(null, formData);
      if (result.success) {
        toast.success(t.contact.successToast);
        reset();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error(t.contact.genericError);
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">

        {/* ── Heading ── */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t.contact.heading}
          </h2>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={VP}
          variants={FADE_UP}
          className="space-y-8"
        >
          <p className="text-muted-foreground">
            {t.contact.leadIn}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label htmlFor="name" className={labelClass}>{t.contact.name}</label>
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                disabled={pending}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className={labelClass}>{t.contact.email}</label>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                disabled={pending}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className={labelClass}>{t.contact.message}</label>
              <textarea
                {...register("message")}
                id="message"
                name="message"
                rows={5}
                disabled={pending}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(inputClass, "resize-none")}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-destructive" role="alert">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              {pending ? t.contact.sending : t.contact.send}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
