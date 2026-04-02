"use client";

import { useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";

/**
 * Returns Framer Motion MotionValues fed directly by Lenis's scroll callback.
 *
 * Why use this instead of FM's `useScroll()`?
 * FM's `useScroll` listens to native scroll events, which fire *after* the
 * browser paints. Lenis fires its scroll callback *inside* our shared RAF tick
 * (before paint), so these values are always one frame fresher — important for
 * animations that need accurate velocity data.
 *
 * @example
 * const { scrollY, progress, velocity } = useLenisScroll()
 *
 * // In a motion component:
 * const opacity = useTransform(scrollY, [0, 500], [1, 0])
 * const y       = useTransform(progress, [0, 1], [0, -200])
 */
export function useLenisScroll() {
  const scrollY   = useMotionValue(0);
  const progress  = useMotionValue(0);
  const velocity  = useMotionValue(0);

  useLenis((lenis: Lenis) => {
    scrollY.set(lenis.scroll);
    progress.set(lenis.progress);
    velocity.set(lenis.velocity);
  });

  return { scrollY, progress, velocity };
}

/**
 * Returns the raw Lenis instance for imperative control.
 *
 * @example — stop scrolling while a modal is open
 * const lenis = useLenisInstance()
 * useEffect(() => {
 *   if (isOpen) lenis?.stop()
 *   else        lenis?.start()
 * }, [isOpen, lenis])
 *
 * @example — programmatic scroll
 * const lenis = useLenisInstance()
 * lenis?.scrollTo('#contact', { offset: -56, duration: 1.4 })
 */
export function useLenisInstance() {
  return useLenis();
}
