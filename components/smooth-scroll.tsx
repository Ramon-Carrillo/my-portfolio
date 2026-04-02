"use client";

import { useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useAnimationFrame } from "framer-motion";

/**
 * Wraps the app in a Lenis smooth-scroll context.
 *
 * Key integration detail:
 * Lenis's own RAF loop is disabled (`autoRaf: false`). Instead, we call
 * `lenis.raf(timestamp)` inside Framer Motion's `useAnimationFrame` hook.
 * This ensures both systems advance on the exact same tick — eliminating the
 * one-frame lag that causes jitter in `useScroll` / `useTransform` animations.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useAnimationFrame((timestamp) => {
    lenisRef.current?.lenis?.raf(timestamp);
  });

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // Disable the internal RAF — Framer Motion drives it above
        autoRaf: false,

        // Feel: gentle momentum, not over-engineered
        lerp: 0.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out

        // Input multipliers
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,

        // Let Lenis intercept <a href="#section"> clicks and smooth-scroll
        // to the target — pairs with `scroll-margin-top` in globals.css so
        // sections land below the fixed navbar
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
