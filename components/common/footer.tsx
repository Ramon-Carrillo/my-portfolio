"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Use absolute-slash form (/#about vs #about) so these anchors work
// from any route, not just the home page. Matches the navbar.
const QUICK_LINKS = [
  { label: "About",    href: "/#about"    },
  { label: "Projects", href: "/#projects" },
  { label: "Blog",     href: "/blog"      },
  { label: "Contact",  href: "/#contact"  },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/Ramon-Carrillo",           icon: FaGithub   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ramon-carrillo/", icon: FaLinkedin },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* ── Top row: brand + quick links + social ── */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="space-y-3">
            <a
              href="#hero"
              className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              Ramon Carrillo
            </a>
            <p className="max-w-[18rem] text-xs leading-relaxed text-muted-foreground">
              Production-grade web apps with Next.js, TypeScript, and Claude —
              all shipped live.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Quick Links
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-8 h-px bg-border" aria-hidden="true" />

        {/* ── Bottom row: copyright + made with love ── */}
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Ramon Carrillo. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Made with{" "}
            <Heart
              className="size-3 fill-primary text-primary"
              aria-label="love"
            />{" "}
            using Next.js &amp; Tailwind CSS
          </span>
        </div>

      </div>
    </footer>
  );
}
