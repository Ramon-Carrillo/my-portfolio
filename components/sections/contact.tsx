"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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

export function Contact() {
  const [state, action, pending] = useActionState(sendContactEmail, null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
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
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="text-muted-foreground">
          Have a project in mind or just want to say hello?
        </p>

        <form
          action={action}
          onSubmit={handleSubmit((_, e) => {
            action(new FormData(e?.target as HTMLFormElement));
          })}
          className="space-y-4"
        >
          <div className="space-y-1">
            <input
              {...register("name")}
              name="name"
              type="text"
              placeholder="Name"
              disabled={pending}
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder="Email"
              disabled={pending}
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <textarea
              {...register("message")}
              name="message"
              placeholder="Message"
              rows={5}
              disabled={pending}
              className={cn(inputClass, "resize-none")}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
