"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  dict,
  type Dict,
  resolveLocale,
} from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dict;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  /** Locale read from the cookie on the server. Determines the initial render. */
  initialLocale: Locale;
  children: React.ReactNode;
}

/**
 * Locale state holder. The initial value comes from a server-read
 * cookie (so the first paint is in the right language with no flash).
 * `setLocale` writes the same cookie client-side and refreshes the
 * router so server components (project pages, blog posts) re-render
 * with the new locale on their next read.
 */
export function LocaleProvider({ initialLocale, children }: LocaleProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(resolveLocale(initialLocale));

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // 1-year cookie. SameSite=Lax keeps it on top-level navigations
      // (the whole site is first-party so we never need cross-site).
      const oneYearSeconds = 60 * 60 * 24 * 365;
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${oneYearSeconds}; samesite=lax`;
      // Re-fetch any server components on the current route so they
      // pick up the new cookie. Client components re-render from state.
      router.refresh();
    },
    [router],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dict[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  return ctx?.locale ?? DEFAULT_LOCALE;
}

export function useSetLocale(): (next: Locale) => void {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // No-op fallback if a consumer renders outside the provider.
    return () => undefined;
  }
  return ctx.setLocale;
}

/** Returns the dictionary for the current locale. */
export function useT(): Dict {
  const ctx = useContext(LocaleContext);
  return ctx?.t ?? dict[DEFAULT_LOCALE];
}
