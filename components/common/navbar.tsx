'use client'

import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com',   icon: FaGithub   },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
  { label: 'X',        href: 'https://x.com',        icon: FaXTwitter },
] as const

export function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-6'>
        {/* ── Logo ── */}
        <a
          href='#hero'
          className='text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary'>
          Ramon
        </a>

        {/* ── Nav links (desktop) ── */}
        <nav aria-label='Primary navigation'>
          <ul className='hidden items-center gap-7 sm:flex'>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className='text-sm text-muted-foreground transition-colors hover:text-foreground'>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Social icons + theme toggle ── */}
        <div className='flex items-center gap-0.5'>
          {/* Social icons — hidden on mobile */}
          <div className='mr-1.5 hidden items-center gap-0.5 sm:flex'>
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'>
                <Icon size={14} />
              </a>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
