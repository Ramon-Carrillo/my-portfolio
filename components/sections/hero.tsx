"use client";

import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── text animation variants ──────────────────────────────────────────────────

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

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
};

// ─── star field ───────────────────────────────────────────────────────────────
// Hardcoded positions prevent any SSR ↔ client hydration mismatch.

const STARS = [
  { id:  1, x:  "4%", y:  "6%", r: 1.5 },
  { id:  2, x: "12%", y: "22%", r: 1.0 },
  { id:  3, x: "20%", y:  "4%", r: 1.2 },
  { id:  4, x: "30%", y: "14%", r: 0.8 },
  { id:  5, x: "45%", y:  "3%", r: 1.0 },
  { id:  6, x: "62%", y:  "7%", r: 1.5 },
  { id:  7, x: "74%", y:  "4%", r: 1.0 },
  { id:  8, x: "86%", y: "11%", r: 1.2 },
  { id:  9, x: "93%", y: "26%", r: 0.8 },
  { id: 10, x: "90%", y: "42%", r: 1.0 },
  { id: 11, x:  "3%", y: "36%", r: 1.2 },
  { id: 12, x:  "7%", y: "54%", r: 0.8 },
  { id: 13, x:  "2%", y: "70%", r: 1.5 },
  { id: 14, x: "16%", y: "76%", r: 1.0 },
  { id: 15, x: "26%", y: "88%", r: 0.8 },
  { id: 16, x: "40%", y: "92%", r: 1.0 },
  { id: 17, x: "56%", y: "86%", r: 1.5 },
  { id: 18, x: "70%", y: "88%", r: 0.8 },
  { id: 19, x: "82%", y: "78%", r: 1.0 },
  { id: 20, x: "95%", y: "64%", r: 1.2 },
  { id: 21, x: "36%", y: "42%", r: 0.7 },
  { id: 22, x: "52%", y: "56%", r: 1.0 },
  { id: 23, x: "64%", y: "46%", r: 0.8 },
  { id: 24, x: "78%", y: "62%", r: 1.0 },
];

// A handful of stars that gently twinkle (opacity + scale pulse)
const PULSE_STARS = [
  { id: 1, x:  "9%", y: "18%", r: 2.0, dur: 3.5, delay: 0.0 },
  { id: 2, x: "77%", y: "19%", r: 2.2, dur: 4.2, delay: 1.3 },
  { id: 3, x: "91%", y: "50%", r: 1.8, dur: 3.8, delay: 0.7 },
  { id: 4, x:  "4%", y: "58%", r: 2.0, dur: 4.6, delay: 2.1 },
  { id: 5, x: "54%", y: "95%", r: 1.8, dur: 3.4, delay: 1.6 },
];

// ─── Moon ─────────────────────────────────────────────────────────────────────

function Moon() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      {/* Main disc */}
      <circle cx="200" cy="200" r="192" fill="#D0D0D0" />
      {/* Upper-left highlight — lit from top-left, classic space art convention */}
      <ellipse cx="150" cy="146" rx="94" ry="78" fill="#DCDCDC" opacity="0.52" />
      {/* Limb darkening */}
      <circle cx="200" cy="200" r="192" fill="none" stroke="#9E9E9E" strokeWidth="10" opacity="0.26" />

      {/* Mare (dark flat regions) */}
      <ellipse cx="164" cy="150" rx="64" ry="52" fill="#BEBEBE" opacity="0.66" />
      <ellipse cx="284" cy="282" rx="58" ry="72" fill="#BCBCBC" opacity="0.58" />
      <ellipse cx="118" cy="282" rx="44" ry="36" fill="#BEBEBE" opacity="0.50" />

      {/* Prominent craters — rim + inner bowl + central peak */}
      <circle cx="146" cy="104" r="36" fill="#C6C6C6" stroke="#A8A8A8" strokeWidth="2" />
      <circle cx="146" cy="104" r="18" fill="#BEBEBE" stroke="#A0A0A0" strokeWidth="1.2" />
      <circle cx="146" cy="104" r="5"  fill="#B6B6B6" />

      <circle cx="298" cy="76"  r="26" fill="#CACACA" stroke="#ABABAB" strokeWidth="1.8" />
      <circle cx="298" cy="76"  r="12" fill="#C2C2C2" stroke="#A4A4A4" strokeWidth="1" />

      <circle cx="336" cy="244" r="30" fill="#C8C8C8" stroke="#AAAAAA" strokeWidth="1.8" />
      <circle cx="336" cy="244" r="14" fill="#BEBEBE" stroke="#A0A0A0" strokeWidth="1" />

      {/* Medium craters */}
      <circle cx="248" cy="162" r="17" fill="#CCCCCC" stroke="#B0B0B0" strokeWidth="1.2" />
      <circle cx="206" cy="342" r="20" fill="#C4C4C4" stroke="#ABABAB" strokeWidth="1.2" />
      <circle cx="86"  cy="194" r="16" fill="#C8C8C8" stroke="#B2B2B2" strokeWidth="1" />
      <circle cx="358" cy="150" r="14" fill="#CACACA" stroke="#B0B0B0" strokeWidth="1" />

      {/* Small craters */}
      <circle cx="176" cy="70"  r="10" fill="#CCCCCC" stroke="#B6B6B6" strokeWidth="0.8" />
      <circle cx="80"  cy="306" r="11" fill="#C8C8C8" stroke="#B0B0B0" strokeWidth="0.8" />
      <circle cx="288" cy="374" r="12" fill="#C4C4C4" stroke="#AAAAAA" strokeWidth="1" />
      <circle cx="134" cy="364" r="9"  fill="#CACACA" stroke="#B2B2B2" strokeWidth="0.8" />
      <circle cx="372" cy="322" r="8"  fill="#C8C8C8" stroke="#B0B0B0" strokeWidth="0.8" />

      {/* Tiny craters — no stroke needed at this scale */}
      <circle cx="220" cy="222" r="5" fill="#C6C6C6" />
      <circle cx="174" cy="192" r="4" fill="#C8C8C8" />
      <circle cx="252" cy="122" r="5" fill="#CCCCCC" />
      <circle cx="308" cy="186" r="4" fill="#C8C8C8" />
      <circle cx="140" cy="246" r="4" fill="#C8C8C8" />
      <circle cx="64"  cy="238" r="5" fill="#C6C6C6" />
      <circle cx="190" cy="310" r="3" fill="#C4C4C4" />
    </svg>
  );
}

// ─── Retro Astronaut ──────────────────────────────────────────────────────────
// 3/4 view, floating pose — arms angled down from shoulders, legs hanging.
// Pure black / white / gray; single sage-green dot on antenna + status light.
// Drawing order: back-arm → back-leg → torso → back-shoulder →
//   front-shoulder → front-leg → front-arm → neck-rings → helmet.

function Astronaut() {
  return (
    <svg
      viewBox="0 0 340 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        {/* Helmet surface — lit upper-left */}
        <radialGradient id="hg" cx="34%" cy="28%" r="65%">
          <stop offset="0%"   stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#C8C8C8" />
        </radialGradient>
        {/* Visor — deep space dark */}
        <radialGradient id="vg" cx="40%" cy="35%" r="56%">
          <stop offset="0%"   stopColor="#18283C" />
          <stop offset="100%" stopColor="#07101C" />
        </radialGradient>
        {/* Suit body — lit upper-left */}
        <radialGradient id="sg" cx="28%" cy="22%" r="68%">
          <stop offset="0%"   stopColor="#E2E2E2" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </radialGradient>
      </defs>

      {/* ── 1. Right arm (back arm, further from viewer) ── */}
      <path
        d="M252 240 L310 228 L326 238 L322 262 L246 278 Z"
        fill="#C0C0C0" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Elbow ring */}
      <ellipse cx="302" cy="236" rx="14" ry="9"
        fill="#B0B0B0" stroke="#1C1C1C" strokeWidth="1.5"
        transform="rotate(-10 302 236)" />
      {/* Glove */}
      <ellipse cx="324" cy="244" rx="16" ry="14"
        fill="#929292" stroke="#1C1C1C" strokeWidth="2"
        transform="rotate(-6 324 244)" />

      {/* ── 2. Right leg (back leg) ── */}
      <path
        d="M196 386 L203 458 L202 504 L190 514 L176 512 L178 458 L178 386 Z"
        fill="#C8C8C8" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      <ellipse cx="190" cy="460" rx="18" ry="11"
        fill="#B6B6B6" stroke="#1C1C1C" strokeWidth="1.5" />
      {/* Boot */}
      <path
        d="M176 504 C168 510 165 520 168 526 C171 532 183 536 198 534 C208 532 215 526 212 518 L204 504 C200 514 191 518 180 516 C172 514 170 508 175 506 Z"
        fill="#828282" stroke="#1C1C1C" strokeWidth="2"
      />
      {/* Boot sole */}
      <path d="M168 526 C169 528 183 534 198 532 C208 530 215 526 212 524"
        stroke="#1C1C1C" strokeWidth="1.2" fill="none" opacity="0.40" />

      {/* ── 3. Torso (trapezoidal, slightly angled for 3/4 view) ── */}
      <path
        d="M84 228 L254 222 L208 386 L130 386 Z"
        fill="url(#sg)" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Left highlight strip */}
      <path d="M96 232 L90 384 L112 386 L118 384 L106 234 Z"
        fill="white" opacity="0.08" />
      {/* Right shadow strip (far side in 3/4 view) */}
      <path d="M236 224 L254 222 L208 386 L190 386 Z"
        fill="#1C1C1C" opacity="0.07" />
      {/* Horizontal seam lines */}
      <line x1="87"  y1="304" x2="252" y2="298"
        stroke="#1C1C1C" strokeWidth="0.8" opacity="0.14" />
      <line x1="90"  y1="350" x2="248" y2="345"
        stroke="#1C1C1C" strokeWidth="0.8" opacity="0.13" />
      {/* Vertical centre seam */}
      <line x1="170" y1="222" x2="170" y2="386"
        stroke="#1C1C1C" strokeWidth="0.8" opacity="0.13" />

      {/* ── Right shoulder pauldron (back, slightly smaller) ── */}
      <path
        d="M254 222 L302 238 C316 246 318 268 306 278 C294 287 272 284 254 270 L254 242 Z"
        fill="#C2C2C2" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      <path d="M304 242 C313 252 313 267 305 275"
        stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round" opacity="0.14" />

      {/* ── Left shoulder pauldron (front, larger) ── */}
      <path
        d="M84 228 L36 246 C22 254 20 278 34 292 C46 304 70 304 84 292 L84 250 Z"
        fill="#CACACA" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Highlight — lit side */}
      <path d="M38 252 C30 262 30 278 38 288"
        stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round" opacity="0.38" />
      {/* Retro stripe */}
      <path d="M46 254 L40 294"
        stroke="#7A7A7A" strokeWidth="5" strokeLinecap="round" opacity="0.46" />

      {/* ── 4. Left leg (front leg) ── */}
      <path
        d="M130 386 L118 462 L116 508 L132 518 L150 515 L151 462 L148 386 Z"
        fill="#D2D2D2" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      <ellipse cx="134" cy="464" rx="20" ry="12"
        fill="#BEBEBE" stroke="#1C1C1C" strokeWidth="1.5" />
      {/* Leg highlight */}
      <line x1="122" y1="392" x2="118" y2="508"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.14" />
      {/* Boot */}
      <path
        d="M114 506 C106 512 103 522 106 528 C109 534 122 538 137 536 C150 534 157 527 154 519 L147 507 C143 518 133 522 121 520 C113 518 112 512 116 508 Z"
        fill="#747474" stroke="#1C1C1C" strokeWidth="2"
      />
      <path d="M106 528 C108 530 122 536 137 534 C150 532 157 527 154 525"
        stroke="#1C1C1C" strokeWidth="1.2" fill="none" opacity="0.38" />

      {/* ── 5. Left arm (front arm) ── */}
      {/* Upper arm */}
      <path
        d="M36 254 L18 322 C16 336 22 348 34 351 L53 354 C65 352 71 343 69 330 L77 268 Z"
        fill="#CACACA" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Elbow ring */}
      <ellipse cx="32" cy="338" rx="20" ry="13"
        fill="#B8B8B8" stroke="#1C1C1C" strokeWidth="1.5"
        transform="rotate(-18 32 338)" />
      {/* Forearm */}
      <path
        d="M18 347 L10 405 C9 417 14 424 24 426 L43 428 C53 426 57 419 55 408 L55 355 Z"
        fill="#C8C8C8" stroke="#1C1C1C" strokeWidth="2" strokeLinejoin="round"
      />
      {/* Glove */}
      <ellipse cx="22" cy="423" rx="20" ry="22"
        fill="#888888" stroke="#1C1C1C" strokeWidth="2"
        transform="rotate(12 22 423)" />
      {/* Finger lines */}
      <line x1="8"  y1="421" x2="5"  y2="439"
        stroke="#1C1C1C" strokeWidth="1" strokeLinecap="round" opacity="0.46" />
      <line x1="22" y1="445" x2="20" y2="462"
        stroke="#1C1C1C" strokeWidth="1" strokeLinecap="round" opacity="0.46" />
      <line x1="37" y1="441" x2="37" y2="457"
        stroke="#1C1C1C" strokeWidth="1" strokeLinecap="round" opacity="0.46" />
      {/* Arm highlight */}
      <path d="M30 266 C24 284 20 304 20 324"
        stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.17" />

      {/* ── 6. Neck ring assembly (three stacked rings) ── */}
      <ellipse cx="170" cy="214" rx="40" ry="13"
        fill="#BEBEBE" stroke="#1C1C1C" strokeWidth="1.8" />
      <ellipse cx="170" cy="208" rx="37" ry="11"
        fill="#CECECE" stroke="#1C1C1C" strokeWidth="1.2" />
      <ellipse cx="170" cy="202" rx="34" ry="9"
        fill="#D6D6D6" stroke="#1C1C1C" strokeWidth="1" />
      {/* Subtle seam curves */}
      <path d="M132 208 Q170 216 208 208"
        stroke="#1C1C1C" strokeWidth="0.7" fill="none" opacity="0.19" />
      <path d="M134 214 Q170 222 206 214"
        stroke="#1C1C1C" strokeWidth="0.7" fill="none" opacity="0.19" />

      {/* ── 7. Helmet ── */}
      {/* Outer shell */}
      <ellipse cx="172" cy="134" rx="70" ry="74"
        fill="url(#hg)" stroke="#1C1C1C" strokeWidth="2.5" />
      {/* Right-side shadow — creates 3/4 tilt illusion */}
      <ellipse cx="226" cy="144" rx="18" ry="62"
        fill="#1C1C1C" opacity="0.09" />
      {/* Upper-left highlight */}
      <ellipse cx="128" cy="96" rx="18" ry="32"
        fill="white" opacity="0.22"
        transform="rotate(-18 128 96)" />

      {/* Visor glass */}
      <ellipse cx="176" cy="130" rx="52" ry="55"
        fill="url(#vg)" stroke="#1A1A1A" strokeWidth="2" />
      <ellipse cx="176" cy="130" rx="49" ry="52"
        fill="#06101A" />
      {/* Retro amber/gold reflective coating */}
      <ellipse cx="176" cy="130" rx="49" ry="52"
        fill="oklch(0.68 0.070 70 / 10%)" />
      {/* Inner frame shadow */}
      <ellipse cx="176" cy="130" rx="51" ry="53"
        fill="none" stroke="#030303" strokeWidth="3.5" opacity="0.50" />
      {/* Glare — main sweep */}
      <ellipse cx="152" cy="104" rx="15" ry="10"
        fill="white" opacity="0.22"
        transform="rotate(-30 152 104)" />
      {/* Glare — bright specular spot */}
      <ellipse cx="160" cy="98" rx="7" ry="4.5"
        fill="white" opacity="0.40"
        transform="rotate(-26 160 98)" />
      {/* Glare — tiny secondary reflection */}
      <circle cx="144" cy="116" r="2.8"
        fill="white" opacity="0.24" />

      {/* Helmet top connector / purge valve */}
      <rect x="154" y="62" width="36" height="15" rx="5"
        fill="#BEBEBE" stroke="#1C1C1C" strokeWidth="1.5" />
      <circle cx="172" cy="55" r="9"
        fill="#AEAEAE" stroke="#1C1C1C" strokeWidth="1.5" />

      {/* Antenna */}
      <line x1="138" y1="64" x2="120" y2="30"
        stroke="#2A2A2A" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="30" x2="110" y2="18"
        stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="106" cy="13" r="7"
        fill="#727272" stroke="#2A2A2A" strokeWidth="2" />
      {/* Sage-green ping — single accent tying illustration to the palette */}
      <circle cx="106" cy="13" r="3.5"
        fill="oklch(0.58 0.092 196)" opacity="0.92" />

      {/* ── Chest panel (life-support controls) ── */}
      <rect x="138" y="258" width="80" height="58" rx="6"
        fill="#ABABAB" stroke="#1C1C1C" strokeWidth="1.8" />
      <rect x="140" y="260" width="76" height="54" rx="5"
        fill="#B6B6B6" />
      {/* Control buttons */}
      <circle cx="156" cy="276" r="6" fill="#848484" stroke="#1C1C1C" strokeWidth="1.2" />
      <circle cx="176" cy="276" r="6" fill="#848484" stroke="#1C1C1C" strokeWidth="1.2" />
      <circle cx="196" cy="276" r="6" fill="#848484" stroke="#1C1C1C" strokeWidth="1.2" />
      {/* Readout bar */}
      <rect x="142" y="291" width="72" height="12" rx="3"
        fill="#909090" stroke="#1C1C1C" strokeWidth="0.8" />
      {/* Status lights — first one sage green (active), rest standby */}
      <circle cx="151" cy="297" r="3.5"
        fill="oklch(0.58 0.092 196)" opacity="0.92" />
      <circle cx="161" cy="297" r="3.5" fill="#585858" />
      <circle cx="171" cy="297" r="3.5" fill="#585858" />
      <circle cx="181" cy="297" r="3.5" fill="#585858" />
      {/* Dial */}
      <circle cx="203" cy="299" r="8"
        fill="#868686" stroke="#1C1C1C" strokeWidth="1" />
      <line x1="203" y1="293" x2="203" y2="297"
        stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── AstronautScene ───────────────────────────────────────────────────────────
// Orchestrates the two-stage animation:
//   1. Entrance — plays once: astronaut drifts in from y+50/x+22/rotate-4,
//      moon drifts in ~400 ms slower (creates parallax depth on load).
//   2. Idle — very gentle continuous float: astronaut y±12 + slow rotation;
//      moon at y±4 (1/3 amplitude → maintains depth through motion parallax).

interface SceneProps {
  reduced: boolean;
}

function AstronautScene({ reduced }: SceneProps) {
  const astroCtrl = useAnimation();
  const moonCtrl  = useAnimation();

  useEffect(() => {
    if (reduced) {
      // Immediately show with no motion
      astroCtrl.set({ opacity: 1, y: 0, x: 0, rotate: 0 });
      moonCtrl.set({ opacity: 1, y: 0 });
      return;
    }

    async function run() {
      // ── Stage 1: entrance (once) ──
      // Both start simultaneously; moon's longer duration makes it lag
      // naturally behind — this is the parallax moment.
      await Promise.all([
        astroCtrl.start({
          opacity: 1, y: 0, x: 0, rotate: 0,
          transition: {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }),
        moonCtrl.start({
          opacity: 1, y: 0,
          transition: {
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }),
      ]);

      // ── Stage 2: idle float (continuous, very subtle) ──
      astroCtrl.start({
        y:      [0, -12, 0],
        rotate: [-0.5, 0.8, -0.5],
        transition: {
          y:      { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9.0, repeat: Infinity, ease: "easeInOut" },
        },
      });
      // Moon at 1/3 amplitude → still feels physically deeper in the scene
      moonCtrl.start({
        y: [0, -4, 0],
        transition: {
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        },
      });
    }

    run();
  }, [reduced, astroCtrl, moonCtrl]);

  return (
    <div
      className="relative h-[540px] w-full max-w-[500px]"
      role="img"
      aria-label="Retro black-and-white astronaut floating in space in front of the moon"
    >
      {/* Static star field */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.x,
            top:  s.y,
            width:  s.r * 2,
            height: s.r * 2,
            background: "oklch(0.84 0.005 80 / 55%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Pulsing / twinkling stars */}
      {PULSE_STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.x,
            top:  s.y,
            width:  s.r * 2,
            height: s.r * 2,
            background: "oklch(0.92 0.005 80 / 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={
            reduced
              ? undefined
              : { opacity: [0.3, 0.9, 0.3], scale: [1, 1.5, 1] }
          }
          transition={{
            duration: s.dur,
            delay:    s.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}

      {/* Moon — sits behind the astronaut */}
      <motion.div
        className="absolute"
        style={{ right: "-55px", top: "10px", width: "400px", height: "400px", zIndex: 10 }}
        initial={{ opacity: 0, y: 28 }}
        animate={moonCtrl}
      >
        <Moon />
      </motion.div>

      {/* Astronaut — in front of the moon */}
      <motion.div
        className="absolute"
        style={{ left: "-8px", top: "16px", width: "340px", height: "510px", zIndex: 20 }}
        initial={{ opacity: 0, y: 50, x: 22, rotate: -4 }}
        animate={astroCtrl}
      >
        <Astronaut />
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      /**
       * `dark` forces all descendant elements to use dark-mode CSS variables
       * (see `@custom-variant dark (&:is(.dark *))` in globals.css).
       * The cosmic background is always dark regardless of user theme preference.
       */
      className="dark relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden px-6 py-20"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.09 0.030 264) 0%, oklch(0.17 0.065 258) 45%, oklch(0.09 0.022 270) 100%)",
      }}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6">

        {/* ── Left: text content ── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={FADE_UP}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={FADE_UP}
            className="mb-3 text-7xl font-bold leading-none tracking-tight text-foreground sm:text-8xl"
          >
            Ramon
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className="mb-5 text-xl font-light tracking-wide text-muted-foreground"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            variants={FADE_UP}
            className="mb-9 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Passionate full-stack developer focused on building clean,
            accessible, and performant web applications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced  ? undefined : { scale: 0.975 }}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5",
                "text-sm font-medium text-primary-foreground",
                "transition-colors hover:bg-royal-hover",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={reduced ? undefined : { scale: 1.025 }}
              whileTap={reduced  ? undefined : { scale: 0.975 }}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5",
                "text-sm font-medium text-foreground",
                "transition-colors hover:border-primary/50 hover:bg-accent hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <Mail className="size-4" aria-hidden="true" />
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: retro astronaut scene ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center lg:justify-end"
        >
          <AstronautScene reduced={reduced} />
        </motion.div>

      </div>
    </section>
  );
}
