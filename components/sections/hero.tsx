'use client'

import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((m) => m.Player),
  { ssr: false }
)

// ─── text animation variants ──────────────────────────────────────────────────

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
            className='mb-3 text-7xl font-bold leading-none tracking-tight text-foreground sm:text-8xl'>
            Ramon
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className='mb-5 text-xl font-light tracking-wide text-muted-foreground'>
            Full-Stack Developer
          </motion.p>

          <motion.p
            variants={FADE_UP}
            className='mb-9 max-w-md text-base leading-relaxed text-muted-foreground'>
            Passionate full-stack developer focused on building clean,
            accessible, and performant web applications.
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
          </motion.div>
        </motion.div>

        {/* ── Right: Lottie animation ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
          className='flex items-center justify-center lg:justify-end'
          aria-hidden='true'>
          <Player
            autoplay={!reduced}
            loop={!reduced}
            src='/astronaut.json'
            style={{ width: '528px', height: '528px' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
