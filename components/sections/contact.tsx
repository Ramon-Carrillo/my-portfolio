"use client";

import { useActionState, useEffect, useTransition } from "react";
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

const inputClass = cn(
  "w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
  "disabled:opacity-50"
);

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
  const [state, action] = useActionState(sendContactEmail, null);
  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } else {
      toast.error(state.error);
    }
  }, [state, reset]);

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
            onSubmit={handleSubmit((_, e) => {
              startTransition(() => {
                action(new FormData(e?.target as HTMLFormElement));
              });
            })}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
                disabled={pending}
                className={inputClass}
              />
              {errors.name && (
                <p className="text-xs text-destructive" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                disabled={pending}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-xs text-destructive" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                {...register("message")}
                id="message"
                name="message"
                placeholder="Message"
                rows={5}
                disabled={pending}
                className={cn(inputClass, "resize-none")}
              />
              {errors.message && (
                <p className="text-xs text-destructive" role="alert">{errors.message.message}</p>
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
