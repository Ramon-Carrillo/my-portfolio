"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, useReducedMotion } from "framer-motion";
import { sendContactEmail } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

type FormValues = z.infer<typeof schema>;

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
  const reduced = useReducedMotion() ?? false;
  const [pending, setPending] = useState(false);

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
      const result = await sendContactEmail(null, formData);
      if (result.success) {
        toast.success("Message sent! I'll get back to you soon.");
        reset();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
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
            Contact
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
            Have a project in mind or just want to say hello?
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label htmlFor="name" className={labelClass}>Name</label>
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
              <label htmlFor="email" className={labelClass}>Email</label>
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
              <label htmlFor="message" className={labelClass}>Message</label>
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
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
