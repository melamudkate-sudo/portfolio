import { Compass, Globe, Sparkles, TrendingUp } from 'lucide-react'
import {
  motion,
  motionValue,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { GradFlow } from 'gradflow'
import { useLayoutEffect, useRef, useState } from 'react'
import type { ComponentType, ReactNode, RefObject } from 'react'

import { FadeIn } from '@/components/motion/fade-in'
import { LanguageTransition } from '@/components/motion/language-transition'
import { PulsingIcon } from '@/components/motion/pulsing-icon'
import { useLanguage } from '@/hooks/use-language'
import { GRAIN_BACKGROUND } from '@/lib/grain'
import { radialGlow } from '@/lib/glow'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const
const ICONS = [Compass, TrendingUp, Sparkles, Globe] as const
const NODE_COUNT = ICONS.length

// Geometry of the center "channel" the wave/icons live in, kept clear of
// text on both sides by the grid's own column gap — see the long comment
// on the grid below for why nothing here needs to be measured at runtime.
// Deliberately untouched by the wider paragraph blocks below: widening
// this instead would shift where the wave/icons actually sit, which was
// asked to stay put — only the text blocks' own width/height/alignment
// changed.
const CHANNEL_WIDTH = 180
const ICON_SIZE = 48
const WAVE_AMPLITUDE = CHANNEL_WIDTH / 2 - ICON_SIZE / 2 - 10
const SAMPLES_PER_SEGMENT = 24
const SPARK_COUNT = 3
const SPARK_DURATION = 2.5

// WickGlow: size of the following glow div (its own left/top are set to
// point.x/y minus half this, so the glow is centered on the tracked
// point without needing a CSS translate — see WickGlow's own comment for
// why a translate-based center would actually break here).
const WICK_GLOW_SIZE = 460
// Deliberately loose/low stiffness — "рыхло следует", not a snappy 1:1
// lock to the wick's tip.
const WICK_GLOW_SPRING = { stiffness: 30, damping: 18, mass: 1 }

// WickHaze: more, smaller, dimmer motes than WickSparks' 3 crisp embers —
// reads as loose haze around the lit stretch rather than particles on it.
const HAZE_COUNT = 8
const HAZE_DURATION = 3.4
// Fixed per-mote offset from the path, not re-rolled every frame — each
// mote drifts along the line at a consistent distance from it, which
// reads as scattered haze; re-randomizing every frame would look like
// flicker/static instead.
const HAZE_JITTER = Array.from({ length: HAZE_COUNT }, (_, i) => ({
  dx: Math.sin(i * 2.4) * 7,
  dy: Math.cos(i * 1.7) * 7,
}))

/** Wraps `phrase` (if found in `text`) in an accent highlight mark. */
function highlight(text: string, phrase: string): ReactNode {
  const idx = text.indexOf(phrase)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-primary px-1 py-0.5 font-medium text-primary-foreground">
        {phrase}
      </mark>
      {text.slice(idx + phrase.length)}
    </>
  )
}

const COPY = {
  ru: {
    label: '01',
    heading: 'Рада знакомству. Меня зовут ',
    name: 'Екатерина',
    paragraphs: [
      highlight(
        'Я всю жизнь совмещала много всего: учёбу, работу, хобби. В какой-то момент, чтобы не запутаться в собственной жизни, начала её структурировать. Постепенно это перешло и на рабочие процессы.',
        'начала её структурировать'
      ),
      highlight(
        'Так я работаю с четырнадцати лет: успела перепробовать больше десятка профессий, от репетиторства до клиентского сервиса, прежде чем прийти в операционное управление. В компании начинала с позиции бизнес-ассистента, сейчас веду несколько проектов и процессов одновременно. Задачи выросли, и я не стала от них отказываться.',
        'не стала от них отказываться'
      ),
      highlight(
        'Люблю искусственный интеллект и уверенно использую его как инструмент в повседневной жизни. Одно из моих странных хобби — делать небольшие приложения для повседневных задач. А поскольку дизайном увлекаюсь с детства, они получаются ещё и симпатичными, по крайней мере на мой вкус.',
        'делать небольшие приложения для повседневных задач'
      ),
      highlight(
        'Вне работы сейчас параллельно учу три языка. Английский — почти сам собой, с детства. Итальянский выбрала сама, тянет культура. И ещё один, которым увлеклась совсем недавно: пока пусть будет сюрприз.',
        'параллельно учу три языка'
      ),
    ],
  },
  en: {
    label: '01',
    heading: "Nice to meet you. I'm ",
    name: 'Ekaterina',
    paragraphs: [
      highlight(
        "I've always juggled a lot: study, work, hobbies. At some point, just to keep my own life from spinning out, I started structuring it. That habit gradually carried over into work.",
        'I started structuring it'
      ),
      highlight(
        "So I've been working since I was fourteen: I tried more than a dozen jobs, from tutoring to client service, before landing in operations. I joined the company as a business assistant, and today I run several projects and processes at once. The scope grew, and I didn't shy away from it.",
        "didn't shy away from it"
      ),
      highlight(
        "I love AI and use it confidently as a tool in everyday life. One of my odd hobbies is building small apps to solve everyday problems. Since I've been into design since childhood, they usually turn out fairly good-looking too — at least to my taste.",
        'building small apps to solve everyday problems'
      ),
      highlight(
        "Outside work, I'm learning three languages in parallel right now. English — almost by accident, since childhood. Italian I picked up on my own, the culture pulls me in. And one more I got into quite recently — that one's staying a surprise for now.",
        'learning three languages in parallel'
      ),
    ],
  },
} as const

function RevealParagraph({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn('text-pretty text-lg leading-relaxed text-muted-foreground', className)}
    >
      {children}
    </motion.p>
  )
}

function IconNode({
  Icon,
  lit,
  className,
}: {
  Icon: ComponentType<{ className?: string }>
  lit: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        // relative: keeps this circle at the same CSS stack level as the
        // absolutely-positioned wave line behind it (both z-index:auto,
        // positioned) so DOM order decides paint order — line first
        // (behind), circle after (in front) — letting bg-background mask
        // the line into a node rather than the line drawing over the icon.
        'relative flex size-12 shrink-0 items-center justify-center rounded-full border bg-background transition-colors duration-500',
        lit ? 'border-primary text-primary' : 'border-border text-muted-foreground',
        className
      )}
    >
      <Icon className="size-6" />
    </div>
  )
}

/**
 * A handful of small embers drifting along the already-lit stretch of the
 * path, looping — the "smoldering wick" detail. Cheap on purpose: fixed
 * count, positions driven by direct motion-value mutation inside
 * useAnimationFrame (no React re-renders per frame), reading the path's
 * own geometry via getPointAtLength rather than re-deriving the curve.
 */
function WickSparks({
  pathRef,
  progress,
  pathLength,
}: {
  pathRef: RefObject<SVGPathElement | null>
  progress: MotionValue<number>
  pathLength: number
}) {
  const cx0 = useMotionValue(0)
  const cy0 = useMotionValue(0)
  const cx1 = useMotionValue(0)
  const cy1 = useMotionValue(0)
  const cx2 = useMotionValue(0)
  const cy2 = useMotionValue(0)
  const sparks = [
    { cx: cx0, cy: cy0 },
    { cx: cx1, cy: cy1 },
    { cx: cx2, cy: cy2 },
  ]
  // Shared across all three: at progress 0 (e.g. right as the section
  // scrolls into view) there's nothing lit yet, so cx/cy never get their
  // first real position and would otherwise just sit at their (0,0)
  // default — visible as a stray dot at the wave container's origin.
  // Hiding via opacity instead of skipping the position update entirely
  // means they fade in cleanly the moment there's any lit length to
  // travel along, rather than popping in already mid-path.
  const opacity = useMotionValue(0)

  useAnimationFrame((time) => {
    const path = pathRef.current
    if (!path || pathLength <= 0) {
      opacity.set(0)
      return
    }
    const litLength = pathLength * progress.get()
    if (litLength <= 0) {
      opacity.set(0)
      return
    }
    opacity.set(0.9)
    sparks.forEach((spark, i) => {
      const t = (time / 1000 / SPARK_DURATION + i / SPARK_COUNT) % 1
      const point = path.getPointAtLength(t * litLength)
      spark.cx.set(point.x)
      spark.cy.set(point.y)
    })
  })

  return (
    <>
      <defs>
        <filter id="about-spark-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      {sparks.map((spark, i) => (
        <motion.circle
          key={i}
          r={3}
          className="fill-primary"
          style={{ cx: spark.cx, cy: spark.cy, opacity }}
          filter="url(#about-spark-glow)"
        />
      ))}
    </>
  )
}

/**
 * A single warm glow that loosely trails the wick's current lit tip —
 * replaces the two static corner glows below (kept, disabled via
 * `false &&`, not deleted — see that block's own comment for why).
 *
 * Position only reacts to scroll: the raw target (the point at the tip
 * of the lit length, same math WickSparks uses) is only recomputed on
 * `progress`'s own 'change' event, not a standalone per-frame loop —
 * this component holds no independent clock. `useSpring` provides the
 * "рыхло следует" lag/smoothing on top of that target, and a spring
 * settles to rest once its target stops moving (i.e. once scrolling
 * stops) rather than running forever, so this stays a one-time reaction
 * to scroll position, not another perpetual background loop on the one
 * screen that's supposed to have none besides the wick itself.
 *
 * Positioned via `left`/`top` (pre-offset by half WICK_GLOW_SIZE) rather
 * than the usual `-translate-x-1/2 -translate-y-1/2` centering trick:
 * this is a motion.div that also animates `scale`, and Framer Motion
 * composes x/y/scale/rotate into one `transform` value it fully owns —
 * a separate Tailwind `translate(-50%,-50%)` on the same element would
 * just get overwritten by that composed transform, not merged with it.
 * Baking the half-size offset into left/top sidesteps the conflict
 * entirely.
 */
function WickGlow({
  pathRef,
  progress,
  pathLength,
}: {
  pathRef: RefObject<SVGPathElement | null>
  progress: MotionValue<number>
  pathLength: number
}) {
  const rawX = useMotionValue(-WICK_GLOW_SIZE / 2)
  const rawY = useMotionValue(-WICK_GLOW_SIZE / 2)

  useMotionValueEvent(progress, 'change', (p) => {
    const path = pathRef.current
    if (!path || pathLength <= 0) return
    const point = path.getPointAtLength(pathLength * p)
    rawX.set(point.x - WICK_GLOW_SIZE / 2)
    rawY.set(point.y - WICK_GLOW_SIZE / 2)
  })

  const left = useSpring(rawX, WICK_GLOW_SPRING)
  const top = useSpring(rawY, WICK_GLOW_SPRING)
  // Almost invisible at the very start of the section, noticeably
  // warmer/brighter than the two old corner glows combined by the end —
  // radialGlow(10) alone already exceeds either old radialGlow(3) spot,
  // and opacity keeps climbing on top of that as the reader scrolls.
  const opacity = useTransform(progress, [0, 1], [0.12, 0.85])
  const scale = useTransform(progress, [0, 1], [0.75, 1.15])

  return (
    <motion.div
      aria-hidden="true"
      style={{ left, top, opacity, scale, background: radialGlow(10) }}
      className="pointer-events-none absolute size-[460px] rounded-full blur-[9px]"
    />
  )
}

/**
 * A handful of much smaller, dimmer motes drifting the same lit stretch
 * WickSparks already travels, each offset slightly off the line — reads
 * as a soft haze/aura around the wick rather than the 3 crisp embers
 * WickSparks draws. A separate component rather than folded into
 * WickSparks: different count/size/opacity/duration, and this way
 * WickSparks' own working logic stays untouched.
 *
 * `motionValue()` (the plain constructor, not the `useMotionValue` hook)
 * is what makes a fixed-but-larger-than-3 set of motion values possible
 * here without calling a hook inside a loop — created once via useRef,
 * same reasoning as WickSparks' cx0/cy0..cx2/cy2 but for a count that
 * would be unwieldy to declare one-by-one.
 */
function WickHaze({
  pathRef,
  progress,
  pathLength,
}: {
  pathRef: RefObject<SVGPathElement | null>
  progress: MotionValue<number>
  pathLength: number
}) {
  const motes = useRef(HAZE_JITTER.map(() => ({ cx: motionValue(0), cy: motionValue(0) }))).current
  const opacity = useMotionValue(0)

  useAnimationFrame((time) => {
    const path = pathRef.current
    if (!path || pathLength <= 0) {
      opacity.set(0)
      return
    }
    const litLength = pathLength * progress.get()
    if (litLength <= 0) {
      opacity.set(0)
      return
    }
    opacity.set(0.18)
    motes.forEach((mote, i) => {
      const t = (time / 1000 / HAZE_DURATION + i / HAZE_COUNT) % 1
      const point = path.getPointAtLength(t * litLength)
      mote.cx.set(point.x + HAZE_JITTER[i].dx)
      mote.cy.set(point.y + HAZE_JITTER[i].dy)
    })
  })

  return (
    <>
      {motes.map((mote, i) => (
        <motion.circle key={i} r={1} className="fill-primary" style={{ cx: mote.cx, cy: mote.cy, opacity }} />
      ))}
    </>
  )
}

interface Point {
  x: number
  y: number
}

/**
 * A single continuous sine wave through all node points, not per-segment
 * Béziers. Y advances linearly with the sample parameter while X follows
 * a true cosine — cos'(nπ) = 0 for every integer n, so the curve's
 * tangent is exactly vertical at every node regardless of how tall or
 * short the segment on either side of it is (different paragraph
 * lengths used to make some segments read as a lazy curve and others as
 * a sharp diagonal — this makes every node's bend look identical no
 * matter the row-height mismatch).
 */
function buildWavePath(points: Point[], centerX: number, amplitude: number) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let seg = 0; seg < points.length - 1; seg++) {
    const yStart = points[seg].y
    const yEnd = points[seg + 1].y
    for (let s = 1; s <= SAMPLES_PER_SEGMENT; s++) {
      const tLocal = s / SAMPLES_PER_SEGMENT
      const globalT = seg + tLocal
      const y = yStart + (yEnd - yStart) * tLocal
      const x = centerX - amplitude * Math.cos(Math.PI * globalT)
      d += ` L ${x} ${y}`
    }
  }
  return d
}

export function About() {
  const { language, switchId } = useLanguage()
  const copy = COPY[language]
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // --- desktop wave ---
  const zigzagContainerRef = useRef<HTMLDivElement>(null)
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([])
  const [nodePoints, setNodePoints] = useState<Point[]>([])
  const [zigzagPath, setZigzagPath] = useState('')
  const [zigzagLength, setZigzagLength] = useState(0)
  const zigzagPathRef = useRef<SVGPathElement>(null)

  // --- mobile straight line ---
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const [mobileLineHeight, setMobileLineHeight] = useState(0)

  useLayoutEffect(() => {
    function measure() {
      const container = zigzagContainerRef.current
      if (container && container.offsetWidth > 0) {
        const containerRect = container.getBoundingClientRect()
        const centerX = containerRect.width / 2
        const ys = paragraphRefs.current.map((el) => {
          if (!el) return null
          const r = el.getBoundingClientRect()
          return r.top + r.height / 2 - containerRect.top
        })
        if (ys.every((y): y is number => y !== null)) {
          const points = ys.map((y, i) => ({
            x: centerX + (i % 2 === 0 ? -WAVE_AMPLITUDE : WAVE_AMPLITUDE),
            y,
          }))
          setNodePoints(points)
          setZigzagPath(buildWavePath(points, centerX, WAVE_AMPLITUDE))
        }
      }

      const mobileContainer = mobileContainerRef.current
      if (mobileContainer && mobileContainer.offsetWidth > 0) {
        setMobileLineHeight(mobileContainer.getBoundingClientRect().height)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    const resizeObserver = new ResizeObserver(measure)
    if (zigzagContainerRef.current) resizeObserver.observe(zigzagContainerRef.current)
    if (mobileContainerRef.current) resizeObserver.observe(mobileContainerRef.current)
    return () => {
      window.removeEventListener('resize', measure)
      resizeObserver.disconnect()
    }
  }, [language, switchId])

  useLayoutEffect(() => {
    if (zigzagPathRef.current) setZigzagLength(zigzagPathRef.current.getTotalLength())
  }, [zigzagPath])

  const zigzagDashoffset = useTransform(scrollYProgress, (p) => zigzagLength * (1 - p))
  const mobileLineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [litCount, setLitCount] = useState(0)
  const [pulseKeys, setPulseKeys] = useState<number[]>(() => Array(NODE_COUNT).fill(0))
  const prevLitCountRef = useRef(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let count = 0
    for (let i = 0; i < NODE_COUNT; i++) {
      if (p >= i / (NODE_COUNT - 1) - 0.03) count = i + 1
    }
    setLitCount(count)
    if (count > prevLitCountRef.current) {
      // A node just crossed from unlit to lit — give it (and any others
      // skipped over on a fast scroll) a fresh pulse key so PulsingIcon's
      // key-remount trick replays for exactly the newly-lit ones.
      const from = prevLitCountRef.current
      setPulseKeys((prev) => {
        const next = [...prev]
        for (let i = from; i < count; i++) next[i] += 1
        return next
      })
    }
    prevLitCountRef.current = count
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      // scroll-mt: the header is fixed and covers the top ~64px of the
      // viewport regardless of scroll position, so a plain anchor jump
      // (clicking "Обо мне" in the nav) lands this section's top flush
      // with the viewport top — with no offset, the header would sit
      // directly over the opening line instead of leaving air above it.
      className="relative scroll-mt-20 overflow-hidden bg-background pb-20 pt-16 sm:pb-24 sm:pt-20"
    >
      {/*
        EXPERIMENT (revertible) — the two static corner glows below are
        disabled via `false &&` rather than deleted, same pattern as
        hero.tsx's own DotPattern block: replaced by WickGlow, a single
        glow that loosely trails the wick's lit tip instead of two fixed
        points. `false &&` keeps this live, type-checked code rather than
        a comment, so it can't silently rot out of sync while disabled —
        to revert, delete the WickGlow usage below and flip this to
        `true` (or drop the wrapper).

        These two corner flashes were originally static and much dimmer
        than Hero's own (radialGlow(10) there vs radialGlow(3) here)
        precisely to stay secondary to the wick — WickGlow keeps that
        same restraint at the start of the section, then grows warmer
        than either of these ever was by the end (see its own comment).
      */}
      {/* eslint-disable-next-line no-constant-binary-expression -- intentional kill-switch, see comment above */}
      {false && (
        <>
          <div
            aria-hidden="true"
            style={{ background: radialGlow(3) }}
            className="pointer-events-none absolute -left-20 top-0 size-[420px] rounded-full blur-[8px]"
          />
          <div
            aria-hidden="true"
            style={{ background: radialGlow(3) }}
            className="pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full blur-[8px]"
          />
        </>
      )}
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
        Faint echo of Hero's own gradient at the seam between the two
        sections — same GradFlow config as hero.tsx verbatim (this is
        meant to read as a continuation of that gradient, not a new
        accent), cropped to the top ~360px and masked to fully dissolve
        before the first paragraph. Desktop-only along with the rest of
        this file's atmosphere layers below — kept out of the mobile
        layout entirely rather than risking it reading differently at a
        narrower width nobody asked to change here.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[360px] opacity-[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)] md:block"
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
      </div>

      {/*
        Static vertical vignette, warm at the top fading to nothing by
        ~40% down the section — no logic, no motion, just a fixed
        linear-gradient like Hero's own vignette. color-mix at a very
        low percent (not a separate CSS variable) matches how
        lib/glow.ts's radialGlow already blends the accent color, so
        this stays visually consistent with every other glow on this
        screen despite being a one-off gradient rather than that helper.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--color-primary) 5%, transparent) 0%, transparent 40%)',
        }}
      />

      {/*
        Oversized, near-invisible "01" echoing copy.label — a quiet
        texture behind the opening line, not a second heading. Outside
        <LanguageTransition> on purpose: it's identical in both languages
        (COPY.ru.label === COPY.en.label === '01') and purely decorative,
        so replaying an entrance on every language switch would be
        motion with no informational reason behind it.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-8 -z-10 hidden select-none font-heading text-[320px] leading-none text-foreground/[0.03] sm:text-[420px] md:block"
      >
        {copy.label}
      </span>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <LanguageTransition id={`${language}-${switchId}`}>
          <FadeIn className="-ml-2 sm:-ml-4">
            <span className="text-xs font-medium tabular-nums text-muted-foreground/50">
              {copy.label}
            </span>
          </FadeIn>

          <FadeIn delay={0.1} className="-ml-2 sm:-ml-4">
            <h2 className="mt-3 text-balance text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
              {copy.heading}
              <span className="font-heading text-7xl text-primary sm:text-8xl">
                {copy.name}
              </span>
              .
            </h2>
          </FadeIn>

          {/* Desktop / tablet: sine-wave path, alternating sides */}
          <div ref={zigzagContainerRef} className="relative mt-14 hidden md:block">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              {/*
                Base track a touch more visible than the theme's default
                --color-border (which is only 10% white on dark) so the
                "unlit" state still reads as a real line, not nothing —
                the lit stroke over it is what should carry the contrast.
              */}
              <path d={zigzagPath} stroke="oklch(1 0 0 / 18%)" strokeWidth="2" fill="none" />
              <motion.path
                ref={zigzagPathRef}
                d={zigzagPath}
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={zigzagLength}
                style={{ strokeDashoffset: zigzagDashoffset }}
              />
              <WickSparks pathRef={zigzagPathRef} progress={scrollYProgress} pathLength={zigzagLength} />
              <WickHaze pathRef={zigzagPathRef} progress={scrollYProgress} pathLength={zigzagLength} />
            </svg>

            <WickGlow pathRef={zigzagPathRef} progress={scrollYProgress} pathLength={zigzagLength} />

            {nodePoints.map((p, i) => (
              <div
                key={i}
                style={{ left: p.x, top: p.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <PulsingIcon pulseKey={pulseKeys[i]}>
                  <IconNode Icon={ICONS[i]} lit={i < litCount} />
                </PulsingIcon>
              </div>
            ))}

            {/*
              1fr / 180px / 1fr: the channel is a fixed track, not derived
              from content, so its horizontal center is always exactly
              containerWidth / 2 — the wave and icons above are positioned
              from that same fixed math, no DOM measurement of the channel
              itself needed. The column gap is what actually keeps text
              out of the channel: each paragraph is capped at 380px and
              pushed to the inner edge of its own column via
              justify-self, but the gap between columns 1↔2 and 2↔3 is
              empty space no text can ever reach into, regardless of how
              wide the column itself renders. 380px is wider than the old
              320px but still narrower than the widest this grid's own
              1fr columns ever get (container caps at max-w-5xl, so the
              real ceiling is ~366px there) — genuinely wider at the
              viewport widths in between, not just a bigger number that
              never binds.
            */}
            <div className="grid grid-cols-[1fr_180px_1fr] gap-x-8 gap-y-8">
              {copy.paragraphs.map((text, i) => {
                const onLeft = i % 2 === 0
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      paragraphRefs.current[i] = el
                    }}
                    style={{ gridRow: i + 1, gridColumn: onLeft ? 1 : 3 }}
                    className={cn(
                      'max-w-[480px] text-center',
                      onLeft ? 'justify-self-end' : 'justify-self-start'
                    )}
                  >
                    <RevealParagraph>{text}</RevealParagraph>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: single column, straight line on the left */}
          <div ref={mobileContainerRef} className="relative mt-10 md:hidden">
            <div
              aria-hidden="true"
              style={{ height: mobileLineHeight }}
              className="absolute left-6 top-6 w-px bg-[oklch(1_0_0_/_18%)]"
            />
            <motion.div
              aria-hidden="true"
              style={{ height: mobileLineHeight, scaleY: mobileLineScale }}
              className="absolute left-6 top-6 w-px origin-top bg-primary"
            />

            <div className="space-y-8">
              {copy.paragraphs.map((text, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <PulsingIcon pulseKey={pulseKeys[i]}>
                    <IconNode Icon={ICONS[i]} lit={i < litCount} />
                  </PulsingIcon>
                  <RevealParagraph>{text}</RevealParagraph>
                </div>
              ))}
            </div>
          </div>
        </LanguageTransition>
      </div>
    </section>
  )
}
