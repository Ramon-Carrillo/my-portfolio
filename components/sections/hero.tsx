'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, ChevronDown, BookOpen } from 'lucide-react'
import { HeroCodeDemo } from '@/components/sections/hero-code-demo'
import { cn } from '@/lib/utils'

// ─── animation variants ───────────────────────────────────────────────────────

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id='hero'
      className='dark relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden px-6 py-20'
      style={{
        background:
          'linear-gradient(145deg, oklch(0.09 0.030 264) 0%, oklch(0.17 0.065 258) 45%, oklch(0.09 0.022 270) 100%)',
      }}>
      <div className='relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6'>

        {/* ── Left: text content ── */}
        <motion.div
          variants={STAGGER}
          initial='hidden'
          animate='show'
          className='max-w-xl'>

          {/*
            "Hello, I'm" label: previously used `text-primary` which at
            14px failed WCAG 1.4.3 against the dark hero gradient
            (~3.5:1, below the 4.5:1 required for small text).
            Switched to a lighter tint with higher luminance so it
            reads without changing the visual hierarchy.
          */}
          <motion.p
            variants={FADE_UP}
            className='mb-3 text-sm font-medium uppercase tracking-widest text-primary-foreground/75'>
            Hello, I&apos;m
          </motion.p>

          {/*
            Name sizes: previously `text-7xl sm:text-8xl` which made
            "Ramon" ~72px at 320px viewport — overflowed the hero
            column. Progressive scale so small phones get a readable
            size that fits.
          */}
          <motion.h1
            variants={FADE_UP}
            className='mb-3 font-bold leading-none tracking-tight text-foreground'>
            <span className='block text-6xl sm:text-7xl md:text-8xl'>Ramon</span>
            <span className='block text-4xl font-light text-muted-foreground sm:text-5xl md:text-6xl'>
              Carrillo
            </span>
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className='mb-5 text-xl font-light tracking-wide text-muted-foreground'>
            Full-Stack Developer
          </motion.p>

          <motion.p
            variants={FADE_UP}
            className='mb-9 max-w-md text-base leading-relaxed text-muted-foreground'>
            I build production-grade web apps with Next.js, TypeScript, and
            Claude — grounded AI, Stripe-powered checkouts, and accessible
            interfaces that actually ship.
          </motion.p>

          <motion.div variants={FADE_UP} className='flex flex-wrap gap-3'>
            <motion.a
              href='#projects'
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.975 }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5',
                'text-sm font-medium text-primary-foreground',
                'transition-colors hover:bg-royal-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}>
              View Projects
              <ArrowRight className='size-4' aria-hidden='true' />
            </motion.a>

            <motion.a
              href='/blog'
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.975 }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5',
                'text-sm font-medium text-foreground',
                'transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}>
              <BookOpen className='size-4' aria-hidden='true' />
              Read the blog
            </motion.a>

            <motion.a
              href='#contact'
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.975 }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-5 py-2.5',
                'text-sm font-medium text-muted-foreground',
                'transition-colors hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}>
              <Mail className='size-4' aria-hidden='true' />
              Contact
            </motion.a>

          </motion.div>
        </motion.div>

        {/* ── Right: live retrieval demo (replaces the previous Lottie) ── */}
        <div className='flex items-center justify-center lg:justify-end'>
          <HeroCodeDemo />
        </div>
      </div>

      {/* ── Scroll-down cue ── */}
      <motion.a
        href='#about'
        aria-label='Scroll to about section'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors'>
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className='size-6' aria-hidden='true' />
        </motion.div>
      </motion.a>
    </section>
  )
}
