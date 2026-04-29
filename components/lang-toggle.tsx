"use client";

import { useEffect, useState } from "react";
import { useLocale, useSetLocale, useT } from "@/components/locale-provider";

/**
 * Compact EN / ES toggle. Mirrors the dimensions of the `ThemeToggle`
 * so the right side of the navbar stays visually balanced. Uses a
 * mounted-guard to avoid the cookie-vs-defaults hydration mismatch
 * that next-themes also avoids.
 */
export function LangToggle() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-9" />;
  }

  const next = locale === "es" ? "en" : "es";
  const nextCode = next.toUpperCase();

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t.nav.langToggle}
      className="inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border border-border bg-card px-2 text-xs font-semibold tracking-wider text-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {nextCode}
    </button>
  );
}
