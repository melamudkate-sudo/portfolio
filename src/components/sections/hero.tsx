import { ArrowRight, ChevronDown, Download, Layers, ListChecks, Package, Users } from 'lucide-react'
import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import { GradFlow } from 'gradflow'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { FadeIn } from '@/components/motion/fade-in'
import { LanguageTransition } from '@/components/motion/language-transition'
import { PulsingIcon } from '@/components/motion/pulsing-icon'
import { TiltCard } from '@/components/motion/tilt-card'
import { useLanguage } from '@/hooks/use-language'
import { GRAIN_BACKGROUND } from '@/lib/grain'
import { radialGlow } from '@/lib/glow'
import { CONTAINER_CLASS, cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

// The one perpetually-looping motif on this screen that's exempt from "no
// permanent effects" by function, not oversight: a scroll-down affordance
// only works as a hint if it keeps moving. Wrapped in a static, non-motion
// div for the left-1/2/-translate-x-1/2 centering — motion owns the full
// `transform` on the icon itself for its own y/opacity loop, so mixing a
// Tailwind transform utility onto the same element would fight it.
const MotionChevronDown = motion.create(ChevronDown)

const DOT_SPRING = { stiffness: 120, damping: 20, mass: 0.5 }

// How far the aurora gradient's hotspot drifts per px of cursor distance
// from the section's center. Bumped from an initial 0.05 (~30px max drift
// at a typical ~600px half-width, read as barely-there) up to 0.14 after
// feedback that the link between cursor and gradient wasn't reading
// clearly enough — still runs through the same DOT_SPRING as before, so
// the larger distance arrives smoothly eased, not as a snap.
const GRADIENT_PARALLAX_FACTOR = 0.14

// Hard ceiling on the raw offset fed into the spring, independent of
// section width. The section itself is full-bleed (no max-width), so
// half-width scales with the whole viewport, not just the content
// column — at 0.14 that's already ~85px drift at a 600px half-width, but
// a common 1920px-wide screen has a ~960px half-width, which would drift
// ~134px, past the gradient wrapper's -inset-24 (96px) buffer and
// revealing a bare edge. Clamping here (not by shrinking the buffer
// further) keeps the drift itself perceptible up close while capping it
// safely on wide screens — the -inset-32 buffer below has headroom to
// spare either way.
const MAX_GRADIENT_OFFSET = 90

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value))
}

interface Stat {
  prefix: string
  value: number
  suffix: string
  unit: string
  label: string | null
}

// Same order as COPY[lang].stats in both languages — projects, tasks,
// product lines, contractors — so `STAT_ICONS[i]` always matches
// `stats[i]` without needing to carry an icon reference through COPY
// itself (icons aren't translated content, no reason to duplicate them
// per language).
const STAT_ICONS = [Layers, ListChecks, Package, Users] as const

const COPY = {
  ru: {
    pill: 'Операционное управление',
    hook: 'Перевожу размытые задачи в понятную структуру — с этапами, ответственностью и результатом.',
    cta1: 'Смотреть кейсы',
    cta2: 'Скачать резюме',
    stats: [
      { prefix: '', value: 5, suffix: '', unit: 'крупных проектов', label: 'веду параллельно' },
      { prefix: '', value: 150, suffix: '+', unit: 'задач', label: 'держу под контролем в спринте' },
      { prefix: '', value: 20, suffix: '+', unit: 'товарных моделей', label: 'курирую запуск' },
      { prefix: '', value: 8, suffix: '', unit: 'подрядчиков', label: 'курирую одновременно' },
    ] satisfies Stat[],
  },
  en: {
    pill: 'Operations Management',
    hook: 'I turn vague tasks into clear structure — with stages, ownership, and results.',
    cta1: 'View case studies',
    cta2: 'Download résumé',
    stats: [
      { prefix: '', value: 5, suffix: '', unit: 'major projects', label: 'running in parallel' },
      { prefix: '', value: 150, suffix: '+', unit: 'tasks', label: 'kept on track every sprint' },
      { prefix: '', value: 20, suffix: '+', unit: 'product lines', label: 'coordinated end-to-end' },
      { prefix: '', value: 8, suffix: '', unit: 'contractors', label: 'managed at once' },
    ] satisfies Stat[],
  },
} as const

interface CardRevealProps {
  children: ReactNode
  delay?: number
  fromX?: number
  rotate?: number
  className?: string
}

/**
 * Entrance for the Hero bento cards: each starts slightly rotated and
 * offset to the side, then settles into place — the "assembly" motif
 * from docs/07_UX_Design.md. Separate from TiltCard's hover tilt. Runs on
 * every mount, so wrapping this tree in <LanguageTransition> replays it
 * on every language switch, not just first load.
 *
 * Deliberately x/rotate only, no opacity: this wrapper has no
 * backdrop-filter of its own, so animating a transform on it doesn't cost
 * anything. The card inside (TiltCard, which does carry backdrop-blur-*)
 * handles its own opacity fade via its `fadeInDelay` prop instead — see
 * the long comment on TiltCard for why that split matters.
 */
function CardReveal({ children, delay = 0, fromX = -24, rotate = -3, className }: CardRevealProps) {
  return (
    <motion.div
      initial={{ x: fromX, rotate }}
      whileInView={{ x: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Counts up from 0 to `value` on mount, then holds — never loops. Writes
 * straight to the DOM via a ref instead of React state so a fast count
 * (e.g. 0→150) doesn't re-render every frame.
 *
 * Runs unconditionally on mount, no useInView gate: Hero is the first
 * screen, already on screen by the time anyone sees it, and a language
 * switch only happens while the user is already looking at it — viewport
 * tracking had no real scenario to serve here, and re-triggering itself
 * (a fresh instance on every LanguageTransition remount, via `value`'s
 * unique key upstream) was where instability kept creeping back in across
 * several rounds. Simpler is more robust: every mount just counts.
 *
 * `cancelled` still guards onUpdate against React StrictMode's dev-only
 * double effect invocation (mount → cleanup → mount again, synchronously)
 * — a real, separate race unrelated to the viewport logic just removed:
 * controls.stop() alone doesn't guarantee the first (stopped) instance's
 * onUpdate can't land one more write after its own cleanup ran, racing
 * the second instance's fresh count from 0.
 *
 * Easing depends on the target's range: EASE (the site's shared ease-out
 * curve) front-loads almost all of its motion into the first fraction of
 * the duration — fine for a wide range like 0→150, where there's still
 * plenty of visible distance left to cover even after that fast start,
 * but for a small range like 0→5 or 0→8 it compresses essentially the
 * whole count into a couple of frames, reading as a jump straight to the
 * final number rather than a count. `easeInOut` spreads a small range's
 * motion across the full duration instead.
 */
function CountUp({ value, duration = 2.2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    let cancelled = false
    const controls = animate(0, value, {
      duration,
      ease: value < 20 ? 'easeInOut' : EASE,
      onUpdate: (latest) => {
        if (cancelled) return
        node.textContent = Math.round(latest).toString()
      },
    })
    return () => {
      cancelled = true
      controls.stop()
    }
  }, [value, duration])

  return <span ref={ref}>0</span>
}

/**
 * Staggered one-shot pulse for the 4 stat badges, run once per mount.
 * About's version bumps a node's pulseKey when the scroll-driven "wick"
 * reaches it; Hero has no such progressive reveal (the whole row is
 * already on screen on load, per CountUp's own comment on why it doesn't
 * bother with a useInView gate either), so this fires the same one-shot
 * pulse on a plain stagger timer instead — same PulsingIcon mechanism,
 * a different (simpler) trigger for a screen with no scroll narrative.
 * Runs once per StatsRow mount, which already happens on every language
 * switch (LanguageTransition remounts this whole subtree via its own
 * key), so the stagger naturally replays then too — no separate reset
 * logic needed.
 */
function useStaggeredPulse(count: number) {
  const [pulseKeys, setPulseKeys] = useState<number[]>(() => Array(count).fill(0))

  useEffect(() => {
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => {
        setPulseKeys((prev) => {
          const next = [...prev]
          next[i] = 1
          return next
        })
      }, 700 + i * 150)
    )
    return () => timers.forEach(clearTimeout)
  }, [count])

  return pulseKeys
}

function StatsRow({ stats }: { stats: readonly Stat[] }) {
  const pulseKeys = useStaggeredPulse(stats.length)

  return (
    <FadeIn delay={0.5}>
      {/*
        grid-cols-1 up through sm, not grid-cols-2 like before the plates
        were added: a bordered/padded card needs more room per word than
        bare text did — "подрядчиков"/"contractors" was breaking mid-word
        in a narrow 2-up mobile column once p-4 padding ate into it.
        Single column comfortably fits every stat on mobile; 2-up only
        kicks in once sm(640px)+ has the width for it, 4-up from lg.
      */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = STAT_ICONS[i]
          return (
            // Plate under each number — part of the gradient-background
            // experiment (see the note above it): the raw text read fine
            // against the old dot pattern, but felt weightless floating
            // over the new low-opacity gradient wash, so each stat gets
            // its own quiet surface. bg-background/70 + backdrop-blur-md
            // is the navbar's exact glass reference, matched here (and on
            // Card A/B below) verbatim rather than each surface picking
            // its own close-enough opacity — that's what was producing
            // the visible mismatch between them. TiltCard itself, not
            // just matching its look, for the same hover tilt too —
            // maxTilt bumped well past Card A/B's 3° here specifically:
            // these plates are small enough that a matching 3° tilt was
            // nearly imperceptible against the rest of the screen.
            <div key={`${stat.unit}-${stat.value}`} className="relative h-full">
              {/*
                Same soft-glow treatment as Card B below (the
                -inset-2/blur-2xl glow behind it), scaled down for a much
                smaller plate: -inset-1/blur-lg instead of -inset-2/
                blur-2xl, same bg-primary/10 and -z-10. Needs this own
                `relative` wrapper (rather than living inside TiltCard's
                own className) because TiltCard's className is also where
                the hover-tilt transform gets applied — a glow that's
                meant to sit fixed behind the card, not tilt/scale with
                it, has to be a sibling outside that transformed element.
              */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-primary/10 blur-lg"
              />
              <TiltCard
                maxTilt={10}
                className="relative flex h-full min-w-0 flex-col items-center rounded-2xl border border-primary/15 bg-background/70 p-4 pt-6 text-center shadow-lg shadow-black/5 backdrop-blur-md"
              >
                {/*
                  Corner badge, not part of the centered text stack below
                  it: a badge overlapping the card's own edge is the
                  standard treatment for this pattern (notification-badge
                  style), distinct from centering the paragraph content
                  itself — so this stays absolutely positioned at the
                  corner while the number/unit/label stack centers as its
                  own block underneath.
                */}
                {/*
                  PulsingIcon (outer) still does its one-shot pop on
                  mount, staggered by pulseKey — unchanged. The permanent
                  idle motion is a single expanding ring behind the badge
                  (scale 1 → 1.7, opacity 0.5 → 0, repeat infinite,
                  staggered by i*0.3s) instead of animating the circle
                  itself — the circle stays a static size-8 anchor and
                  only the ring "breathes" outward from it, reading as a
                  location-marker pulse rather than the badge itself
                  growing/shrinking. One ring layer only (not the
                  3-particle treatment WickSparks uses in About — that's
                  for tracing a path, this is a single fixed point).

                  Plain CSS (animate-stat-ring-pulse, defined in
                  index.css), not a Framer Motion `animate` prop — this
                  whole subtree sits inside <FadeIn>, which drives its
                  reveal through Framer's `variants` (initial="hidden"
                  whileInView="visible"). Empirically confirmed (by
                  isolating the exact same animate/transition object
                  outside FadeIn's subtree, where it looped correctly)
                  that a descendant's own repeat:Infinity animation
                  collapses to its final frame instead of looping when
                  nested under a variants-driven ancestor, even with an
                  explicit local `animate` object — a real Framer Motion
                  propagation quirk, not a typo in the props. Plain CSS
                  sidesteps that system entirely, animating on the
                  compositor thread regardless of any ancestor's
                  animation state — see index.css's own comment for the
                  full isolation trail.

                  The ring is `absolute inset-0` (position:auto,
                  z-index:auto) inside a `relative` circle, so on its own
                  it would paint *above* the Icon regardless of DOM
                  order — positioned descendants paint after
                  non-positioned ones in the same stacking context. Icon
                  gets `relative` too so both are positioned and DOM
                  order (ring markup first, Icon after) decides the
                  stack instead, keeping the icon glyph visible on top of
                  the ring as it expands.
                */}
                <PulsingIcon pulseKey={pulseKeys[i]} className="absolute -left-3 -top-3">
                  <div className="relative flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <span
                      aria-hidden="true"
                      style={{ animationDelay: `${i * 0.3}s` }}
                      className="absolute inset-0 animate-stat-ring-pulse rounded-full bg-primary"
                    />
                    <Icon className="relative size-4" />
                  </div>
                </PulsingIcon>

                {/*
                  Number and unit as two separate lines, not one wrapped
                  span: the parent TiltCard is already flex flex-col
                  items-center, so two sibling spans stack as their own
                  lines automatically — no extra layout needed beyond
                  splitting the markup. Number carries the accent color
                  on its whole span now (prefix included, though prefix
                  is '' for every stat currently — kept in the markup for
                  whichever stat needs one later) rather than only the
                  CountUp+suffix portion.
                */}
                <span className="break-words text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                  {stat.prefix}
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="mt-1 break-words text-lg font-medium text-foreground sm:text-xl">
                  {stat.unit}
                </span>
                {stat.label && (
                  <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
                )}
              </TiltCard>
            </div>
          )
        })}
      </div>
    </FadeIn>
  )
}

export function Hero() {
  const { language, switchId } = useLanguage()
  const copy = COPY[language]

  const sectionRef = useRef<HTMLElement>(null)

  // No scroll-linked transform anywhere in this section (there used to be
  // one on Card A, `style={{ y: parallaxA }}`, plus one on the top-left
  // glow before that was removed too) — both turned out to read as
  // nearby content shifting/sagging on scroll even though the title
  // itself never had any transform applied to it directly. Card A and the
  // glows now move exactly 1:1 with the page, same as everything else, so
  // there's nothing left that could visually compete with the title.

  // Tracked on the whole section, not the dot background itself — the
  // background sits behind the cards, so listening only on it would stop
  // receiving events wherever a card covers it.
  // dotMouseX/Y currently only feed gradientOffsetX/Y below (the original
  // DotPattern consumer is commented out as part of the gradient-
  // background experiment) — kept as-is rather than removed, since
  // uncommenting DotPattern's JSX to revert should need no other changes.
  const dotMouseX = useSpring(useMotionValue(-1000), DOT_SPRING)
  const dotMouseY = useSpring(useMotionValue(-1000), DOT_SPRING)

  // Drives the aurora gradient's hotspot toward the cursor. Deliberately
  // NOT reusing dotMouseX/Y's own values directly for this, despite the
  // shared spring config and event-handling shape: those go to a
  // (-1000, -1000) sentinel on pointer-leave so DotPattern's glow fades
  // out (its falloff is distance-based, so "far away" reads as "off").
  // A translate offset has no such falloff — feeding it -1000 directly
  // would just clamp the gradient to a corner and leave it stuck there
  // instead of easing back to center. These track px offset from the
  // section's own center instead, zeroed (not sentinel) on leave.
  const gradientOffsetX = useSpring(useMotionValue(0), DOT_SPRING)
  const gradientOffsetY = useSpring(useMotionValue(0), DOT_SPRING)

  function handleSectionPointerMove(event: PointerEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    dotMouseX.set(event.clientX - rect.left)
    dotMouseY.set(event.clientY - rect.top)
    gradientOffsetX.set(clamp((event.clientX - rect.left - rect.width / 2) * GRADIENT_PARALLAX_FACTOR, MAX_GRADIENT_OFFSET))
    gradientOffsetY.set(clamp((event.clientY - rect.top - rect.height / 2) * GRADIENT_PARALLAX_FACTOR, MAX_GRADIENT_OFFSET))
  }

  function handleSectionPointerLeave() {
    dotMouseX.set(-1000)
    dotMouseY.set(-1000)
    gradientOffsetX.set(0)
    gradientOffsetY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden rounded-b-[3rem] pb-12 pt-20"
    >
      {/*
        EXPERIMENT (revertible, see the prompt that introduced this) — the
        dot pattern + 4 drifting glows below are disabled via `false &&`
        rather than deleted, in favor of the aurora gradient background
        just after this block. `false &&` (not a JSX comment) on purpose:
        this content already contains its own {/* ... *\/} comments, which
        can't nest inside an outer JSX comment without breaking it, and
        this way the block stays live, type-checked code — no risk of it
        silently rotting out of sync with the rest of the file while
        disabled. To revert: delete the gradient block below and change
        `false` to `true` here (or just remove the `false &&` wrapper).
      */}
      {/* eslint-disable-next-line no-constant-binary-expression -- intentional kill-switch, see comment above */}
      {false && (
        <>
          {/*
            Conscious, logged exception to "no perpetual effects" (see
            docs/07_UX_Design.md) — Ekaterina explicitly asked for continuous
            but very slow ambient drift, "like ripples on water", later asked
            to push the amplitude further and give it more visual "mass", then
            to dial the color back down (amplitude/speed untouched — opacity
            only, ~35% lighter than before) so it reads as airy rather than
            dense. Each corner is 2 overlapping layers of the same accent
            color (not brighter — each layer stays low-opacity — the stacking
            is what reads as depth, like paint pooling in layers) with
            different sizes, offsets, durations and phase so they drift
            independently and never look synchronized.

            No scroll-linked `y` on the top-left group anymore — it used to
            share card A's parallax offset, which turned out to read as the
            card itself sagging on scroll (the card never actually moves;
            the glow drifting right next to it was the illusion). Each layer's
            own infinite drift loop is untouched, just no added scroll offset.

            radial-gradient, not a solid circle + blur(): blur only softens up
            to its own radius past the element's box, and inside an
            overflow-hidden section that residual gets clipped — visible as a
            hard edge, especially once the shape is moving/scaling. A
            radial-gradient reaches transparent alpha before its own edge, so
            there's no edge left to clip.
          */}
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 90, -60, 0], scale: [1, 1.28, 0.82, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: radialGlow(6) }}
            className="pointer-events-none absolute -left-32 -top-32 size-[560px] rounded-full blur-[6px]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -50, 34, 0], y: [0, 26, -18, 0], scale: [1, 0.86, 1.2, 1] }}
            transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ background: radialGlow(5) }}
            className="pointer-events-none absolute -left-16 -top-48 size-[380px] rounded-full blur-[6px]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -72, 48, 0], y: [0, 65, -41, 0], scale: [1, 0.8, 1.24, 1] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            style={{ background: radialGlow(6) }}
            className="pointer-events-none absolute -bottom-24 -right-24 size-[420px] rounded-full blur-[6px]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 44, -30, 0], y: [0, -32, 22, 0], scale: [1, 1.18, 0.88, 1] }}
            transition={{ duration: 29, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
            style={{ background: radialGlow(4) }}
            className="pointer-events-none absolute -bottom-10 -right-44 size-[300px] rounded-full blur-[6px]"
          />

          {/*
            mouseX/mouseY passed explicitly: without them DotPattern falls back
            to tracking pointer events on its own <svg>, which sits behind the
            cards and text in paint order — the opaque content wrapper above it
            captures pointer events across its whole box (even the "empty"
            space inside flex/grid cells), so the SVG only ever sees events in
            genuine gaps/margins. The result was proximity glow stuck wherever
            the cursor last had a clear path to the SVG, unrelated to its
            current position. Confirmed via a temporary on-screen marker at
            (dotMouseX, dotMouseY): it tracked the real cursor within ~5px
            (spring settle lag only) everywhere, including over the stats row —
            so the section-level values here are correct; they just weren't
            wired in.
          */}
          <DotPattern
            mouseX={dotMouseX}
            mouseY={dotMouseY}
            className={cn(
              '[mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]'
            )}
          />
        </>
      )}

      {/*
        Aurora/mesh gradient experiment, standing in for the block above.
        gradflow (npm) chosen over a hand-rolled canvas/shader: it's a
        purpose-built React+WebGL component (ogl under the hood) whose
        config shape (color1/2/3, speed, scale, type, noise) is exactly
        what was asked for, ~14KB gzip plus a tree-shaken sliver of ogl —
        lighter than hand-writing an equivalent WebGL noise shader well.

        type: 'mesh', not 'animated' — read gradflow's actual fragment
        shader (node_modules/gradflow/dist/index.mjs) to pick this
        deliberately rather than guessing from names. 'animated' composes
        two smoothstep bands that span nearly the full UV range, so it's
        some color blend everywhere — reads as evenly diffuse by
        construction, which was exactly the complaint. 'mesh' instead
        blends 3 colors as radial falloff blobs
        (`exp(-falloff * distance²)`) that drift slowly. `noise` (0.5,
        kept as the config gave it) is a separate, unrelated effect in
        this shader — a flat-everywhere high-frequency multiplicative
        grain dither, not a zone-contrast control — so it wasn't the
        right knob to touch, confirmed by reading the shader rather than
        assumed from the name.

        mix-blend-screen, not flat opacity, is what makes brightness
        actually read against the page: opacity alone composited every
        pixel at the same flat alpha, landing dim and bright pixels alike
        close to the page's own near-black background; screen
        (`result = 1 - (1-backdrop)(1-source)`) composites multiplicatively
        against how dark the backdrop already is instead, so dark shader
        pixels stay essentially invisible while bright ones read through
        strongly. Opacity is 0.55 (raised from an initial 0.35 once the
        color1/2/3 reassignment below moved the bright color out of the
        always-on `base` gradient — confining brightness to just the
        blob cores also cut overall brightness more than intended, so
        this compensates) — picked by rendering and comparing side by
        side, high enough that the drops read as genuinely warm, still
        capped short of the reference (gradflow.meera.dev)'s
        fully-saturated full-screen look, which is exactly the "designer
        landing page" register `03_Design_Direction.md` rules out.

        Compact "drops" (not a screen-wide wash) took two fixes, not one
        — scale alone, even pushed as far as 10 (falloff ~26.5), never
        actually got there; rendering that confirmed the second problem
        below, which is why this isn't just "bumped scale until it
        looked right":

        1. scale 1.6 → 3.5 (falloff 1.5 + scale*2.5, ~5.5 → ~10.25):
           mesh's blob size and edge sharpness share this one knob, and
           1.6 was soft/wide enough that each blob's tail spread across
           most of the section before fading. This part matches the
           original ask directly.

        2. color1/2/3 reassigned, same three RGB values, different
           slots — this is the fix that actually mattered, found by
           reading meshGradient()'s body, not guessed: for area *outside*
           every blob, the shader falls back to
           `base = mix(u_color1, u_color3, uv.y)`, a full-height vertical
           gradient between whatever sits in color1 and color3 — at ANY
           scale, since falloff only shrinks the blobs, it does nothing
           to this separate always-on term. The original color3
           (255,140,0, the bright one) sat inside that base, so a
           bright-to-dark wash covered the entire canvas regardless of
           blob tightness — confirmed by rendering scale:10 and seeing
           the same wash essentially unchanged. u_color2 is the one slot
           never referenced by `base` — moving the bright color there
           exempts it from the always-on gradient entirely, so it now
           only appears at its own blob's core. color1/color3 (both dark)
           still form the base, but a dark-to-dark blend reads as
           essentially uniform dark, not a visible gradient.

        Sized to -inset-32 rather than inset-0: the wrapping div also
        carries the cursor-follow translate (gradientOffsetX/Y below), and
        `overflow-hidden` on the section clips it regardless — oversizing
        means that translate never reveals an empty edge under the
        gradient. MAX_GRADIENT_OFFSET (90px) caps the translate below this
        128px buffer regardless of section width, so this holds on any
        screen, not just "typical" ones — see that constant's own comment.

        pointer-events-none: this sits under the same section that already
        listens for pointer move/leave to drive the offset itself — a
        WebGL canvas capturing hover would just shadow that listener for
        no benefit, same reasoning as DotPattern's own SVG above.
      */}
      <motion.div
        aria-hidden="true"
        style={{ x: gradientOffsetX, y: gradientOffsetY }}
        className="pointer-events-none absolute -inset-32 mix-blend-screen opacity-[0.55]"
      >
        <GradFlow
          config={{
            color1: { r: 120, g: 0, b: 0 },
            color2: { r: 255, g: 140, b: 0 },
            color3: { r: 20, g: 0, b: 0 },
            speed: 1.2,
            scale: 3.5,
            type: 'mesh',
            noise: 0.5,
          }}
          className="size-full"
        />
      </motion.div>

      <div className={cn('relative', CONTAINER_CLASS)}>
        <LanguageTransition id={`${language}-${switchId}`}>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-stretch">
            <CardReveal fromX={-24} rotate={-3} delay={0} className="md:h-full">
              <TiltCard
                maxTilt={3}
                fadeInDelay={0}
                className="aspect-[4/5] min-h-[260px] w-full overflow-hidden rounded-3xl border border-primary/30 bg-background/70 shadow-xl shadow-black/5 backdrop-blur-md md:aspect-auto md:h-full"
              >
                <img
                  src="/images/ekaterina-hero.jpg"
                  alt="Екатерина Меламуд"
                  className="h-full w-full object-cover object-[50%_25%]"
                />
              </TiltCard>
            </CardReveal>

            <div className="h-full">
              <CardReveal fromX={24} rotate={3} delay={0.15} className="relative h-full">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-primary/10 blur-2xl"
                />
                <TiltCard
                  maxTilt={3}
                  fadeInDelay={0.15}
                  className="relative h-full overflow-hidden rounded-3xl border border-primary/20 bg-background/70 px-6 py-5 shadow-xl shadow-black/5 backdrop-blur-md sm:px-8 sm:py-6 md:px-10 md:py-5"
                >
                  <div className="flex h-full flex-col items-start justify-center text-left">
                    <FadeIn>
                      <span className="mt-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {copy.pill}
                      </span>
                    </FadeIn>

                    <motion.h1
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                      className="mt-2 text-balance font-heading text-5xl font-medium tracking-tight text-foreground sm:text-6xl lg:text-6xl"
                    >
                      Project{' '}
                      <span className="text-6xl text-primary sm:text-7xl lg:text-7xl">&amp;</span>{' '}
                      Operations Manager
                    </motion.h1>

                    <FadeIn delay={0.5}>
                      <p className="mt-3 max-w-xl text-pretty text-lg font-normal text-muted-foreground">
                        {copy.hook}
                      </p>
                    </FadeIn>

                    <FadeIn delay={0.6} className="w-full">
                      {/* Neutral, not accent — a quiet pause before the
                          call to action, not another highlight. */}
                      <div aria-hidden="true" className="mt-4 h-px w-full bg-border" />
                    </FadeIn>

                    <FadeIn delay={0.65}>
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="rounded-full duration-200 hover:scale-[1.02] focus-visible:border-primary focus-visible:ring-primary/50"
                        >
                          <a href="#work">
                            {copy.cta1}
                            <ArrowRight aria-hidden="true" data-icon="inline-end" className="size-4" />
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="rounded-full focus-visible:border-primary focus-visible:ring-primary/50"
                        >
                          <a href="/resume.pdf" download>
                            {copy.cta2}
                            <Download aria-hidden="true" data-icon="inline-end" className="size-4" />
                          </a>
                        </Button>
                      </div>
                    </FadeIn>
                  </div>
                </TiltCard>
              </CardReveal>
            </div>
          </div>

          <StatsRow stats={copy.stats} />
        </LanguageTransition>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.065] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_BACKGROUND,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/*
        Vignette — Ekaterina's own addition, not in the original brief:
        pulls the eye back toward the center/content instead of the
        gradient reading as flatly poured across the whole rectangle.
        Plain radial-gradient (not a blend mode) straight to black: the
        section's own dark-theme background is already near-black
        (oklch(0.145 0 0)), so a soft black falloff blends into it rather
        than reading as a separate grey ring the way a mid-tone vignette
        would. Kept soft (transparent past the halfway point) — this is
        meant to be felt at the edges, not seen as a hard frame.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <MotionChevronDown
          aria-hidden="true"
          animate={{ y: [0, 6, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="size-5 text-muted-foreground"
        />
      </div>
    </section>
  )
}
