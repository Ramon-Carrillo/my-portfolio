import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LocaleProvider } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

interface ProvidersProps {
  initialLocale: Locale;
  children: React.ReactNode;
}

export function Providers({ initialLocale, children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <LocaleProvider initialLocale={initialLocale}>
        {children}
        <Toaster richColors />
      </LocaleProvider>
    </ThemeProvider>
  );
}
