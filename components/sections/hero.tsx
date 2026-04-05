'use client'

import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight, Mail, ChevronDown, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  { ssr: false }
)

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

          <motion.p
            variants={FADE_UP}
            className='mb-3 text-sm font-medium uppercase tracking-widest text-primary'>
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={FADE_UP}
            className='mb-3 font-bold leading-none tracking-tight text-foreground'>
            <span className='block text-7xl sm:text-8xl'>Ramon</span>
            <span className='block text-5xl font-light text-muted-foreground sm:text-6xl'>
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
            I build fast, accessible web apps — from polished UIs to
            production-ready backends.
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
              href='#contact'
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.975 }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5',
                'text-sm font-medium text-foreground',
                'transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}>
              <Mail className='size-4' aria-hidden='true' />
              Get In Touch
            </motion.a>

            <motion.a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.975 }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5',
                'text-sm font-medium text-foreground',
                'transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}>
              <FileText className='size-4' aria-hidden='true' />
              Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: Lottie animation ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className='flex items-center justify-center lg:justify-end'
          aria-hidden='true'>
          <Player
            autoplay={!reduced}
            loop={!reduced}
            src='/astronaut.json'
            style={{ width: 'min(528px, 80vw)', height: 'min(528px, 80vw)' }}
          />
        </motion.div>
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
