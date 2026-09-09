import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { GradFlow } from 'gradflow'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import { LanguageTransition } from '@/components/motion/language-transition'
import { FadeIn } from '@/components/motion/fade-in'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

type Copy = { ru: string; en: string }

type Step = {
  number: string
  title: Copy
  reason: Copy
}

const STEPS: Step[] = [
  {
    number: '01',
    title: { ru: 'Проблема', en: 'Problem' },
    reason: {
      ru: 'Фиксирую точку, где процесс расходится с целью: без этого невозможно выбрать верное действие.',
      en: 'I locate the point where the process diverges from its goal. Without it, there is no way to choose the right action.',
    },
  },
  {
    number: '02',
    title: { ru: 'Исследование', en: 'Research' },
    reason: {
      ru: 'Ищу первопричину: факты, нагрузку, зависимости и людей за симптомами, а не удобные предположения.',
      en: 'I look for the root cause: facts, capacity, dependencies, and people behind the symptoms — not convenient assumptions.',
    },
  },
  {
    number: '03',
    title: { ru: 'Проектирование', en: 'Design' },
    reason: {
      ru: 'Собираю модель будущего процесса: роли, правила, точки контроля и метрики, с которыми можно работать.',
      en: 'I build the future-process model: roles, rules, checkpoints, and metrics the team can actually work with.',
    },
  },
  {
    number: '04',
    title: { ru: 'Внедрение', en: 'Implementation' },
    reason: {
      ru: 'Встраиваю решение в ритм команды — чтобы изменения стали привычной практикой, а не остались презентацией.',
      en: 'I embed the solution in the team’s rhythm, so change becomes everyday practice rather than a presentation.',
    },
  },
  {
    number: '05',
    title: { ru: 'Результат', en: 'Result' },
    reason: {
      ru: 'Считаю результатом процесс, который работает самостоятельно: понятно, предсказуемо и без ручного героизма.',
      en: 'The outcome is a process that works independently: clear, predictable, and without manual heroics.',
    },
  },
]

const EASE = [0.16, 1, 0.3, 1] as const
const GLOW_SPRING = { stiffness: 55, damping: 26, mass: 0.9 }
const ROUTE_SPRING = { stiffness: 42, damping: 24, mass: 0.9 }

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value))
}

export function HowIWork() {
  const { language, switchId } = useLanguage()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const auroraX = useSpring(useMotionValue(0), GLOW_SPRING)
  const auroraY = useSpring(useMotionValue(0), GLOW_SPRING)
  const routeX = useSpring(useMotionValue(0), ROUTE_SPRING)
  const routeY = useSpring(useMotionValue(0), ROUTE_SPRING)
  const swipeStartX = useRef<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)

  // The section itself stays mounted during a language change, so this
  // observer is stable while the translated content remounts underneath it.
  // Starting the route only once it is actually visible prevents the whole
  // entrance sequence from completing below the fold on a page refresh.
  // Wait until the frame itself is beginning to enter the screen. At 18% of
  // the whole section it was still below the fold, so its entrance was easy
  // to miss even though the observer had fired correctly.
  const routeIsVisible = useInView(sectionRef, { amount: 0.26, once: true })
  const routeHasStarted = reduceMotion || routeIsVisible

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || reduceMotion) return
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    auroraX.set(clamp(x * 0.055, 38))
    auroraY.set(clamp(y * 0.045, 26))
    routeX.set(clamp(x * 0.006, 4))
    routeY.set(clamp(y * 0.004, 2.5))
  }

  function handlePointerLeave() {
    auroraX.set(0)
    auroraY.set(0)
    routeX.set(0)
    routeY.set(0)
  }

  function goToStep(nextStep: number) {
    const next = Math.max(0, Math.min(STEPS.length - 1, nextStep))
    if (next === activeStep) return
    setSlideDirection(next > activeStep ? 1 : -1)
    setActiveStep(next)
  }

  function handleCarouselPointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStartX.current = event.clientX
  }

  function handleCarouselPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) return
    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(distance) < 42) return
    goToStep(activeStep + (distance < 0 ? 1 : -1))
  }

  return (
    <section ref={sectionRef} id="approach" className="relative z-30 -mt-4 isolate scroll-mt-20 overflow-hidden rounded-t-[3rem] bg-background pb-20 pt-24 sm:pb-28 sm:pt-28">
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-6 select-none font-heading text-[10rem] leading-none text-foreground/[0.035] sm:-right-6 sm:text-[clamp(12rem,25vw,27rem)]">02</span>
      <div className={cn('relative', SECTION_CONTAINER_CLASS)}>
        <LanguageTransition id={`${language}-${switchId}`}>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.5fr)] lg:items-end lg:gap-16">
            <div>
              <FadeIn delay={0.1}>
                <h2 className="max-w-[11ch] text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
                  <span>{language === 'ru' ? 'Как я ' : 'How I '}</span>
                  <span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'работаю' : 'work'}</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.18} className="max-w-sm lg:mb-1 lg:justify-self-end lg:text-right">
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {language === 'ru'
                  ? 'Не начинаю с готового решения. Сначала нахожу причину, а затем собираю систему, которая выдерживает реальную работу.'
                  : 'I do not begin with a ready solution. First I find the cause, then build a system that holds up in real work.'}
              </p>
            </FadeIn>
          </div>

          <motion.div
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          // Do not blur the frame itself: CSS filter is painted after the
          // element's rounded overflow clip and can spread the warm canvas
          // beyond the corner radius while the entrance is running.
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={
            routeHasStarted
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
          }
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.28, ease: EASE }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 px-5 py-7 shadow-[0_28px_80px_-48px_color-mix(in_oklab,var(--color-primary)_42%,transparent)] sm:mt-10 sm:px-8 sm:py-8 lg:px-10 lg:py-9"
          >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <motion.div
              style={{ x: auroraX, y: auroraY }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: routeHasStarted ? 0.2 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.28, ease: EASE }}
              className="absolute -inset-24 mix-blend-screen"
            >
              {!reduceMotion && routeIsVisible && (
                <GradFlow
                  config={{
                    color1: { r: 120, g: 0, b: 0 },
                    color2: { r: 255, g: 140, b: 0 },
                    color3: { r: 20, g: 0, b: 0 },
                    speed: 0.8,
                    scale: 3.8,
                    type: 'mesh',
                    noise: 0.5,
                  }}
                  className="size-full"
                />
              )}
            </motion.div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_45%,color-mix(in_oklab,var(--color-background)_56%,transparent))]" />
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, x: '-18%' }}
            animate={
              reduceMotion
                ? { opacity: 0, x: '-18%' }
                : routeIsVisible
                  ? { opacity: [0, 0.22, 0.06], x: ['-18%', '4%', '18%'] }
                  : { opacity: 0, x: '-18%' }
            }
            transition={{ duration: 2.05, delay: 0.48, ease: EASE }}
            className="pointer-events-none absolute -inset-y-1/2 left-[-40%] w-[52%] -skew-x-12 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--color-primary)_13%,transparent),transparent)] blur-2xl"
          />

          <div className="relative flex items-center justify-between border-b border-border/70 pb-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {language === 'ru' ? 'Маршрут решения' : 'The decision route'}
            </p>
            <p className="font-heading text-3xl text-primary">01—05</p>
          </div>

          <motion.div className="relative mt-7 pb-0 md:pb-16" style={{ x: routeX, y: routeY }}>
            <svg aria-hidden="true" viewBox="0 0 1000 90" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 hidden h-16 w-full overflow-visible md:block">
              <path d="M 20 45 H 980" fill="none" stroke="oklch(1 0 0 / 17%)" strokeWidth="2" />
              <motion.path
                d="M 20 45 H 980"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.65 : 0 }}
                animate={routeHasStarted ? { pathLength: 1, opacity: 0.65 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.85, delay: reduceMotion ? 0 : 0.68, ease: EASE }}
              />
              <circle cx="20" cy="45" r="5" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="1.5" />
              <circle cx="980" cy="45" r="5" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="1.5" />
              <motion.circle
                cy="45"
                r="3.5"
                fill="var(--color-primary)"
                initial={{ cx: 20, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { cx: 20, opacity: 0 }
                    : routeIsVisible
                      ? { cx: 980, opacity: [0, 1, 1, 0] }
                      : { cx: 20, opacity: 0 }
                }
                transition={{ duration: 1.65, delay: 0.82, ease: EASE }}
              />
            </svg>
            <div className="relative md:hidden">
              <div className="mb-4 flex items-center justify-between px-1">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {language === 'ru' ? 'Листайте маршрут' : 'Swipe through the route'}
                  <ArrowRight aria-hidden="true" className="size-3.5 text-primary" />
                </p>
                <div className="flex items-center gap-1.5" aria-label={language === 'ru' ? 'Шаги маршрута' : 'Route steps'}>
                  {STEPS.map((step, index) => (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => goToStep(index)}
                      aria-label={`${language === 'ru' ? 'Открыть шаг' : 'Open step'} ${index + 1}: ${step.title[language]}`}
                      aria-current={index === activeStep ? 'step' : undefined}
                      className="flex size-5 items-center justify-center rounded-full"
                    >
                      <motion.span
                        animate={{
                          opacity: index === activeStep ? 1 : 0.45,
                          scale: index === activeStep ? 1.35 : 1,
                        }}
                        transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
                        className={cn(
                          'size-1.5 rounded-full transition-[background-color,box-shadow] duration-200',
                          index === activeStep
                            ? 'bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_16%,transparent),0_0_12px_color-mix(in_oklab,var(--color-primary)_70%,transparent)]'
                            : 'bg-muted-foreground'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div
                className="relative min-h-[19rem] touch-pan-y overflow-hidden pb-5"
                onPointerDown={handleCarouselPointerDown}
                onPointerUp={handleCarouselPointerUp}
                onPointerCancel={() => {
                  swipeStartX.current = null
                }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    key={`${language}-${activeStep}`}
                    initial={reduceMotion ? false : { opacity: 0, x: slideDirection * 30, scale: 0.985, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: slideDirection * -20, scale: 0.99, filter: 'blur(2px)' }}
                    transition={{ duration: reduceMotion ? 0 : 0.34, ease: EASE }}
                    className="group relative min-h-[19rem] rounded-2xl border border-border/80 bg-background/70 p-6 backdrop-blur-md"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-heading text-5xl text-primary/85">{STEPS[activeStep].number}</span>
                      <span className="mt-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                        {activeStep + 1} / {STEPS.length}
                      </span>
                    </div>
                    <h3 className="mt-9 text-2xl font-medium tracking-[-0.04em] text-foreground">{STEPS[activeStep].title[language]}</h3>
                    <div className="mt-5 h-px w-10 bg-primary/60" />
                    <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">{STEPS[activeStep].reason[language]}</p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative hidden gap-4 md:grid md:grid-cols-5 md:auto-rows-fr md:items-stretch md:gap-3">
              {STEPS.map(({ number, title, reason }, index) => (
                <motion.article
                  key={number}
                  initial={reduceMotion ? false : { opacity: 0, y: 10, filter: 'blur(3px)' }}
                  animate={
                    routeHasStarted
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 10, filter: 'blur(3px)' }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.86 + index * 0.12, ease: EASE }}
                  className="group relative min-h-60 rounded-2xl border border-border/80 bg-background/70 p-5 backdrop-blur-md transition-[border-color,box-shadow] duration-700 hover:border-primary/45 hover:shadow-[0_18px_40px_-34px_color-mix(in_oklab,var(--color-primary)_80%,transparent)] md:h-full md:min-h-64"
                >
                  <span aria-hidden="true" className="absolute -left-2 top-6 size-4 rounded-full border border-primary bg-background shadow-[0_0_0_5px_color-mix(in_oklab,var(--color-primary)_14%,transparent)] md:-bottom-10 md:left-1/2 md:top-auto md:-translate-x-1/2" />
                  <span className="font-heading text-5xl text-primary/80 transition-colors duration-700 group-hover:text-primary">{number}</span>
                  <h3 className="mt-7 text-xl font-medium tracking-[-0.035em] text-foreground">{title[language]}</h3>
                  <div className="mt-5 h-px w-8 bg-primary/60 transition-all duration-700 group-hover:w-12" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{reason[language]}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-5 border-t border-border/70 pt-6 text-center">
            <p className="max-w-2xl text-balance text-xl font-medium tracking-[-0.035em] text-foreground sm:text-2xl">
              {language === 'ru' ? 'Каждый следующий шаг опирается на предыдущий — поэтому изменения не рассыпаются после запуска.' : 'Each next step rests on the one before it, so change does not fall apart after launch.'}
            </p>
            <Button asChild size="lg" className="h-12 shrink-0 justify-center rounded-full px-6 text-center shadow-lg shadow-primary/15 transition-transform duration-300 hover:scale-[1.02]">
              <a href="#work">
                {language === 'ru' ? 'Смотреть это в кейсах' : 'See this in case studies'}
                <ArrowRight aria-hidden="true" data-icon="inline-end" className="size-4" />
              </a>
            </Button>
          </div>
          </motion.div>
        </LanguageTransition>
      </div>
    </section>
  )
}
