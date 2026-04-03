import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramoncarrillo.dev"),
  title: {
    default: "Ramon | Full-Stack Developer",
    template: "%s | Ramon",
  },
  description:
    "Ramon Carrillo — full-stack developer specialising in Next.js, React, and TypeScript. Building clean, accessible, and performant web applications with modern tools like Tailwind CSS, Prisma, Stripe, and Framer Motion.",
  keywords: [
    "Ramon Carrillo",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Prisma",
    "PostgreSQL",
    "Stripe",
    "Supabase",
    "Node.js",
    "Accessibility",
    "WCAG",
    "Web Developer",
    "Portfolio",
    "JavaScript",
  ],
  authors: [{ name: "Ramon Carrillo" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ramoncarrillo.dev",
    siteName: "Ramon | Portfolio",
    title: "Ramon | Full-Stack Developer",
    description:
      "Full-stack developer specialising in Next.js, React, and TypeScript — building clean, accessible, and performant web apps.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ramon — Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramon | Full-Stack Developer",
    description:
      "Full-stack developer specialising in Next.js, React, and TypeScript — building clean, accessible, and performant web apps.",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1 pt-14">{children}</main>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
