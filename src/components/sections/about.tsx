import { Compass, Globe, Sparkles, TrendingUp } from 'lucide-react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { GradFlow } from 'gradflow'
import { useLayoutEffect, useRef, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'

import { FadeIn, useScrollReveal } from '@/components/motion/fade-in'
import { LanguageTransition } from '@/components/motion/language-transition'
import { DotPattern } from '@/components/magicui/dot-pattern'
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
  const [ref, isRevealed] = useScrollReveal<HTMLParagraphElement>()

  return (
    <motion.p
      ref={ref}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: isRevealed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
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
  const isAboutInView = useInView(sectionRef, { amount: 0.08 })
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 74%', 'end 30%'],
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

    }

    measure()
    window.addEventListener('resize', measure)
    const resizeObserver = new ResizeObserver(measure)
    if (zigzagContainerRef.current) resizeObserver.observe(zigzagContainerRef.current)
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

  const [litCount, setLitCount] = useState(1)
  const prevLitCountRef = useRef(1)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let count = 0
    for (let i = 0; i < NODE_COUNT; i++) {
      if (p >= i / (NODE_COUNT - 1) - 0.03) count = i + 1
    }

    const previousCount = prevLitCountRef.current
    if (count === previousCount) return

    setLitCount(count)
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
      className="relative z-20 isolate scroll-mt-20 overflow-hidden bg-background pb-20 pt-16 sm:pb-24 sm:pt-20"
      style={{
        backgroundImage:
          'linear-gradient(180deg, color-mix(in oklab, var(--color-background) 92%, var(--color-primary)) 0%, var(--color-background) 17rem)',
      }}
    >
      <DotPattern
        glow
        width={28}
        height={28}
        cr={0.75}
        className="pointer-events-none opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,white,transparent_83%)]"
      />
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
        {!reduceMotion && isAboutInView && (
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
        )}
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
        className="pointer-events-none absolute -right-6 -top-8 -z-10 hidden select-none font-heading text-[320px] leading-none text-foreground/[0.03] sm:text-[420px] md:block"
      >
        {copy.label}
      </span>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <LanguageTransition id={`${language}-${switchId}`}>
          <FadeIn delay={0.1}>
            <h2 className="max-w-full text-balance text-[2.5rem] font-medium leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              {copy.heading}
              <span className="font-heading text-[3.8rem] leading-none text-primary sm:text-8xl">
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
            </svg>

            {nodePoints.map((p, i) => (
              <div
                key={i}
                style={{ left: p.x, top: p.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <IconNode Icon={ICONS[i]} lit={i < litCount} />
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

          {/* Mobile: a separate timeline rail keeps the line outside copy. */}
          <div ref={mobileContainerRef} className="relative mt-10 md:hidden">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 w-px bg-[oklch(1_0_0_/_18%)]"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: mobileLineScale }}
              className="absolute bottom-6 left-6 top-6 w-px origin-top bg-primary"
            />

            <div className="space-y-10">
              {copy.paragraphs.map((text, i) => (
                <div key={i} className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4">
                  <div className="relative z-10">
                    <IconNode Icon={ICONS[i]} lit={i < litCount} />
                  </div>
                  <RevealParagraph className="min-w-0 pt-2 text-[1.05rem] leading-relaxed">{text}</RevealParagraph>
                </div>
              ))}
            </div>
          </div>
        </LanguageTransition>
      </div>
    </section>
  )
}
