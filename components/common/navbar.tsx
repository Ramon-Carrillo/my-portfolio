'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { ThemeToggle } from '@/components/theme-toggle'
import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'

/**
 * Primary nav links.
 *
 * The `href` values use the absolute-slash form (e.g. `/#about`) so
 * clicking them from non-home routes (/blog, /projects/[slug], etc.)
 * navigates home first, then scrolls to the anchor. The short-form
 * `#about` version only worked when the user was already on /.
 *
 * `sectionId` is optional — present for links that correspond to a
 * scroll-tracked section on the home page (so the nav highlights
 * match `useActiveSection`). Links without one (Blog) use pathname-
 * based active matching instead.
 */
type NavLink = {
  label: string
  href: string
  sectionId?: 'about' | 'projects' | 'contact'
  /** Regex matched against pathname for page-based active state. */
  pathMatch?: RegExp
}

const NAV_LINKS: NavLink[] = [
  { label: 'About',    href: '/#about',    sectionId: 'about'    },
  { label: 'Projects', href: '/#projects', sectionId: 'projects' },
  { label: 'Blog',     href: '/blog',      pathMatch: /^\/blog/  },
  { label: 'Contact',  href: '/#contact',  sectionId: 'contact'  },
]

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/Ramon-Carrillo',           icon: FaGithub   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramon-carrillo/', icon: FaLinkedin },
] as const

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const activeSection = useActiveSection(['hero', 'about', 'projects', 'contact'])

  // Scroll-based active state only applies on the home page. On /blog
  // or /projects/<slug>, we match by pathname instead.
  const isHome = pathname === '/'

  function isLinkActive(link: NavLink): boolean {
    if (link.pathMatch && link.pathMatch.test(pathname)) return true
    if (link.sectionId && isHome && activeSection === link.sectionId) return true
    return false
  }

  function handleNavClick() {
    setMobileOpen(false)
  }

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-6'>

        {/* ── Logo ── */}
        <a
          href='/'
          onClick={handleNavClick}
          className='text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary'>
          Ramon Carrillo
        </a>

        {/* ── Nav links (desktop) ── */}
        <nav aria-label='Primary navigation' className='hidden sm:block'>
          <ul className='flex items-center gap-7'>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'text-sm transition-colors',
                    isLinkActive(link)
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right side: social + theme ── */}
        <div className='flex items-center gap-0.5'>
          {/* Social icons */}
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

          {/* ── Hamburger (mobile only) ── */}
          <button
            type='button'
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls='mobile-nav'
            onClick={() => setMobileOpen((v) => !v)}
            className='ml-1 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden'>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id='mobile-nav'
            key='mobile-menu'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='border-t border-border/40 bg-background/95 backdrop-blur-sm sm:hidden'>
            <nav aria-label='Mobile navigation'>
              <ul className='flex flex-col px-6 py-4'>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className={cn(
                        'flex h-11 items-center text-sm transition-colors',
                        isLinkActive(link)
                          ? 'font-medium text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className='flex items-center gap-2 border-t border-border/40 px-6 py-4'>
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    onClick={handleNavClick}
                    className='inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
