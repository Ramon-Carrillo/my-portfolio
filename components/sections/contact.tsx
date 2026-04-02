"use client";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="text-muted-foreground">
          Have a project in mind or just want to say hello?
        </p>
        {/* Wire up a form (react-hook-form + zod + a server action or email API) */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full resize-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-olive"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
