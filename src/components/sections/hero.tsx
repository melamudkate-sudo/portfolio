import { ArrowRight, ChevronDown, Download, Layers, ListChecks, Package, UserRoundCheck, Users } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import { Button } from '@/components/ui/button'
import { LanguageTransition } from '@/components/motion/language-transition'
import { useLanguage } from '@/hooks/use-language'
import { GRAIN_BACKGROUND } from '@/lib/grain'
import { SECTION_CONTAINER_CLASS, cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const STAT_ICONS = [Layers, ListChecks, Package, Users, UserRoundCheck] as const
const MOBILE_STAT_CONTENT_VARIANTS = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 70, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (direction: number) => ({ opacity: 0, x: direction * -58, filter: 'blur(5px)' }),
}

interface Stat {
  value: string
  unit: string
  label: string
}

const COPY = {
  ru: {
    pill: 'Операционное управление',
    hook: 'Перевожу размытые задачи в понятную структуру — с этапами, ответственностью и результатом.',
    cta1: 'Смотреть кейсы',
    cta2: 'Скачать резюме',
    stats: [
      { value: '5', unit: 'крупных проектов', label: 'веду параллельно от старта до результата' },
      { value: '150+', unit: 'задач', label: 'держу под контролем в спринте' },
      { value: '20+', unit: 'товарных моделей', label: 'курирую запуск' },
      { value: '8', unit: 'подрядчиков', label: 'координирую одновременно в работе' },
      { value: '12', unit: 'сотрудников', label: 'управляю командой и распределяю задачи' },
    ] satisfies Stat[],
  },
  en: {
    pill: 'Operations management',
    hook: 'I turn vague tasks into clear structure — with stages, ownership, and results.',
    cta1: 'View case studies',
    cta2: 'Download résumé',
    stats: [
      { value: '5', unit: 'major projects', label: 'leading from kickoff to delivery' },
      { value: '150+', unit: 'tasks', label: 'kept on track every sprint' },
      { value: '20+', unit: 'product lines', label: 'coordinating launches' },
      { value: '8', unit: 'contractors', label: 'coordinating simultaneously' },
      { value: '12', unit: 'team members', label: 'leading and assigning responsibilities' },
    ] satisfies Stat[],
  },
} as const

function StatCarousel({ stats }: { stats: readonly Stat[] }) {
  const [active, setActive] = useState(1)
  const [hovered, setHovered] = useState(false)
  const pauseUntil = useRef(0)

  const pauseAndSet = (next: number) => {
    pauseUntil.current = Date.now() + 5500
    setActive((next + stats.length) % stats.length)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!hovered && Date.now() >= pauseUntil.current) {
        setActive((current) => (current + 1) % stats.length)
      }
    }, 4000)
    return () => window.clearInterval(interval)
  }, [hovered, stats.length])

  const visibleCards = ([-1, 0, 1] as const).map((position) => ({
    position,
    index: (active + position + stats.length) % stats.length,
  }))
  const activeStatIsCompact = stats[active].value === '5' || stats[active].value === '8' || stats[active].value === '12'

  return (
    <div
      className="hero-stat-carousel relative z-40 mt-10 hidden h-[320px] origin-bottom scale-[0.8] overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-12 lg:mt-0 lg:block"
      aria-label="Статистика"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="hero-stat-track absolute inset-x-0 top-0 flex items-start justify-center gap-[1.5%]">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleCards.map(({ index, position }) => {
            const stat = stats[index]
            const Icon = STAT_ICONS[index]
            const isActive = position === 0

            return (
              <motion.button
                layout
                key={stat.value}
                type="button"
                aria-label={`${stat.value} ${stat.unit}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => pauseAndSet(index)}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) < 42) return
                  pauseAndSet(active + (info.offset.x < 0 ? 1 : -1))
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.06}
                initial={{ opacity: 0, x: position * 46, scale: 0.92 }}
                animate={{ opacity: isActive ? 1 : 0.53, x: 0, scale: isActive ? 1 : 0.94 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.72, ease: EASE, layout: { duration: 0.72, ease: EASE } }}
                className={cn(
                  'cursor-grab touch-pan-y select-none overflow-hidden rounded-[28px] border bg-[#130d0b]/95 p-5 text-left outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/60',
                  isActive
                    ? cn('h-[205px] border-primary/80 shadow-[inset_0_0_34px_rgba(244,100,56,0.08),0_18px_42px_rgba(0,0,0,0.32)]', activeStatIsCompact ? 'w-[37%]' : 'w-[40%]')
                    : cn('mt-7 h-[172px] border-white/12 shadow-[0_14px_36px_rgba(0,0,0,0.24)]', activeStatIsCompact ? 'w-[28.5%]' : 'w-[27%]')
                )}
              >
                <div className={cn('flex h-full items-center', !isActive && 'justify-center')}>
                  <div className={cn('flex shrink-0 items-center', isActive ? 'gap-3' : 'gap-2')}>
                    <div className={cn('flex shrink-0 items-center justify-center rounded-full transition-all duration-500', isActive ? 'size-14 bg-primary/15 text-primary' : 'size-11 translate-y-2 bg-white/5 text-stone-400')}>
                      <Icon className={cn('stroke-[1.6]', isActive ? 'size-7' : 'size-5')} />
                    </div>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.62, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.35, delay: isActive ? 0.08 : 0, ease: EASE }}
                      className={cn('block font-semibold leading-none tracking-[-0.045em]', isActive ? 'text-[4.25rem] text-primary' : 'text-[2.65rem] text-stone-400')}
                    >
                      {stat.value}
                    </motion.span>
                  </div>

                  <div className={cn('shrink-0 bg-white/10', isActive ? 'mx-5 h-16 w-px' : 'mx-3 h-12 w-px')} />

                  <div className="min-w-0">
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.58, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.35, delay: isActive ? 0.14 : 0, ease: EASE }}
                      className={cn('block font-semibold leading-tight text-stone-100', isActive ? 'text-xl' : 'text-base')}
                    >
                      {stat.unit}
                    </motion.span>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 0.76 : 0.42, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.35, delay: isActive ? 0.2 : 0, ease: EASE }}
                      className={cn('mt-2 block leading-snug text-stone-300', isActive ? 'max-w-[180px] text-sm' : 'text-xs')}
                    >
                      {stat.label}
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="hero-stat-pagination absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {stats.map((stat, index) => (
          <button
            key={stat.value}
            type="button"
            onClick={() => pauseAndSet(index)}
            aria-label={`Показать: ${stat.value} ${stat.unit}`}
            aria-current={active === index ? 'true' : undefined}
            className={cn(
              'h-2 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active === index ? 'w-6 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function MobileStats({ stats }: { stats: readonly Stat[] }) {
  const { language } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const pauseUntil = useRef(0)

  const pauseAndSet = (next: number) => {
    const normalizedNext = (next + stats.length) % stats.length
    if (normalizedNext === active) return

    const forwardDistance = (normalizedNext - active + stats.length) % stats.length
    const backwardDistance = (active - normalizedNext + stats.length) % stats.length

    pauseUntil.current = Date.now() + 5500
    setDirection(forwardDistance <= backwardDistance ? 1 : -1)
    setActive(normalizedNext)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() >= pauseUntil.current) {
        setDirection(1)
        setActive((current) => (current + 1) % stats.length)
      }
    }, 4000)
    return () => window.clearInterval(interval)
  }, [stats.length])

  const activeStat = stats[active]
  const ActiveIcon = STAT_ICONS[active]
  const previousIndex = (active - 1 + stats.length) % stats.length
  const nextIndex = (active + 1) % stats.length

  return (
    <div className="hero-mobile-stats relative -mx-6 mt-3 h-[280px] overflow-hidden lg:hidden" aria-label="Статистика">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-0 h-[230px] rounded-full bg-[radial-gradient(ellipse,rgba(225,75,27,0.2),transparent_70%)] blur-3xl" />
      {!reduceMotion && (
        <motion.div
          key={`mobile-stat-transfer-${active}`}
          aria-hidden="true"
          initial={{ left: direction > 0 ? '83%' : '0%', top: 12, width: '17%', opacity: 0 }}
          animate={{ left: '20%', top: 0, width: '60%', opacity: [0, 0.42, 0] }}
          transition={{ duration: 0.76, ease: EASE, opacity: { duration: 0.76, times: [0, 0.38, 1], ease: EASE } }}
          className="pointer-events-none absolute z-30 h-[210px] rounded-[24px] border border-primary/55 bg-[linear-gradient(110deg,transparent_25%,rgba(244,100,56,0.08)_54%,transparent_78%)] shadow-[0_0_24px_rgba(236,91,43,0.18)]"
        />
      )}
      <motion.button
        key={`mobile-stat-left-${active}`}
        type="button"
        onClick={() => pauseAndSet(previousIndex)}
        aria-label={`Показать: ${stats[previousIndex].value} ${stats[previousIndex].unit}`}
        initial={reduceMotion ? false : { opacity: 0.58 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.68, ease: EASE }}
        className="hero-mobile-stat-placeholder absolute left-0 top-3 h-[210px] w-[17%] cursor-pointer overflow-hidden rounded-l-none rounded-r-[24px] border border-l-0 border-white/[0.055] bg-[#070504] shadow-[inset_0_1px_0_rgba(255,255,255,0.015),0_14px_34px_rgba(0,0,0,0.36)] outline-none transition-colors duration-500 hover:border-white/10 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? { opacity: 0.24, scale: 1 } : { opacity: [0.18, 0.38, 0.18], scale: [0.96, 1.05, 0.96] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-[-14%] top-[14%] h-[72%] w-[54%] rounded-full bg-[radial-gradient(ellipse,rgba(231,76,29,0.3),rgba(111,32,14,0.11)_42%,transparent_72%)] blur-2xl"
        />
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: [0.16, 0.52, 0.16], scaleY: [0.72, 1, 0.72] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="pointer-events-none absolute right-4 top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        />
        {!reduceMotion && direction < 0 && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, x: '-80%' }}
            animate={{ opacity: [0, 0.55, 0], x: '130%' }}
            transition={{ duration: 0.78, ease: EASE }}
            className="pointer-events-none absolute inset-y-[-10%] right-[-2%] w-12 rotate-[8deg] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-xl"
          />
        )}
      </motion.button>

      <motion.button
        type="button"
        aria-label={`${activeStat.value} ${activeStat.unit}`}
        aria-current="true"
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) < 36) return
          pauseAndSet(active + (info.offset.x < 0 ? 1 : -1))
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.045}
        className="hero-mobile-stat-card absolute left-[20%] top-0 z-10 h-[210px] w-[60%] cursor-grab touch-pan-y select-none overflow-hidden rounded-[24px] border border-primary/80 bg-[#130d0b]/98 p-5 text-left shadow-[0_0_30px_rgba(236,91,43,0.18),inset_0_0_30px_rgba(244,100,56,0.07),0_18px_44px_rgba(0,0,0,0.36)] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? { opacity: 0.26, scale: 1 } : { opacity: [0.2, 0.4, 0.2], scale: [0.98, 1.04, 0.98] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -inset-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(234,76,29,0.18),rgba(107,30,13,0.07)_42%,transparent_70%)] blur-2xl"
        />
        {!reduceMotion && (
          <motion.span
            key={`mobile-stat-sweep-${active}`}
            aria-hidden="true"
            initial={{ opacity: 0, x: direction > 0 ? '150%' : '-150%' }}
            animate={{ opacity: [0, 0.48, 0], x: direction > 0 ? '-150%' : '150%' }}
            transition={{ duration: 0.82, ease: EASE }}
            className="pointer-events-none absolute inset-y-[-20%] left-1/2 z-[5] w-14 -translate-x-1/2 rotate-[10deg] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-xl"
          />
        )}
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.div
            key={activeStat.value}
            custom={direction}
            variants={MOBILE_STAT_CONTENT_VARIANTS}
            initial={reduceMotion ? false : 'enter'}
            animate="center"
            exit={reduceMotion ? undefined : 'exit'}
            transition={{ duration: 0.64, ease: EASE }}
            className="absolute inset-5 z-10 flex flex-col justify-center"
          >
            <div className="hero-mobile-stat-heading flex shrink-0 items-center gap-3">
              <div className="hero-mobile-stat-icon flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <ActiveIcon className="size-6 stroke-[1.6]" />
              </div>
              <span className="hero-mobile-stat-value block shrink-0 text-5xl font-semibold leading-none tracking-tight text-primary">
                {activeStat.value}
              </span>
            </div>
            <span className="hero-mobile-stat-unit mt-4 block shrink-0 text-base font-semibold leading-tight text-stone-100">
              {activeStat.unit}
            </span>
            <span className="hero-mobile-stat-label mt-2 block shrink-0 text-sm leading-snug text-stone-300 opacity-75">
              {activeStat.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <motion.button
        key={`mobile-stat-right-${active}`}
        type="button"
        onClick={() => pauseAndSet(nextIndex)}
        aria-label={`Показать: ${stats[nextIndex].value} ${stats[nextIndex].unit}`}
        initial={reduceMotion ? false : { opacity: 0.58 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.68, ease: EASE }}
        className="hero-mobile-stat-placeholder absolute right-0 top-3 h-[210px] w-[17%] cursor-pointer overflow-hidden rounded-l-[24px] rounded-r-none border border-r-0 border-white/[0.055] bg-[#070504] shadow-[inset_0_1px_0_rgba(255,255,255,0.015),0_14px_34px_rgba(0,0,0,0.36)] outline-none transition-colors duration-500 hover:border-white/10 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? { opacity: 0.24, scale: 1 } : { opacity: [0.18, 0.4, 0.18], scale: [0.97, 1.055, 0.97] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="pointer-events-none absolute left-[-14%] top-[14%] h-[72%] w-[54%] rounded-full bg-[radial-gradient(ellipse,rgba(231,76,29,0.3),rgba(111,32,14,0.11)_42%,transparent_72%)] blur-2xl"
        />
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { opacity: [0.18, 0.54, 0.18], scaleY: [0.72, 1, 0.72] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          className="pointer-events-none absolute left-4 top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        />
        {!reduceMotion && direction > 0 && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, x: '80%' }}
            animate={{ opacity: [0, 0.55, 0], x: '-130%' }}
            transition={{ duration: 0.78, ease: EASE }}
            className="pointer-events-none absolute inset-y-[-10%] left-[-2%] w-12 -rotate-[8deg] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-xl"
          />
        )}
      </motion.button>

      <div className="hero-mobile-stat-pagination absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ x: active * 38 }}
          transition={{ duration: 0.56, ease: EASE }}
          className="pointer-events-none absolute left-0 top-1/2 h-2 w-7 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(244,100,56,0.35)]"
        />
        {stats.map((stat, index) => (
          <button
            key={stat.value}
            type="button"
            onClick={() => pauseAndSet(index)}
            aria-label={`Показать: ${stat.value} ${stat.unit}`}
            aria-current={active === index ? 'true' : undefined}
            className="relative z-10 flex h-3 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className={cn('size-2 rounded-full bg-white/20 transition-opacity duration-300', active === index && 'opacity-0')} />
          </button>
        ))}
      </div>

      <motion.a
        href="#about"
        aria-label={language === 'ru' ? 'Прокрутить к разделу «Обо мне»' : 'Scroll to About'}
        animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1 left-1/2 z-10 flex size-5 -translate-x-1/2 items-center justify-center rounded-full text-stone-400/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      >
        <ChevronDown aria-hidden="true" className="size-4 stroke-[1.6]" />
      </motion.a>
    </div>
  )
}

const lineVariant = {
  hidden: { y: 42, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.68, delay: 0.3 + index * 0.1, ease: EASE },
  }),
}

export function Hero() {
  const { language, switchId } = useLanguage()
  const copy = COPY[language]
  const reduceMotion = useReducedMotion()
  const [portraitOffset, setPortraitOffset] = useState({ x: 0, y: 0 })

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || window.innerWidth < 1024) return
    const rect = event.currentTarget.getBoundingClientRect()
    setPortraitOffset({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 4,
    })
  }

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPortraitOffset({ x: 0, y: 0 })}
      className="hero-desktop-compact relative isolate min-h-[840px] overflow-hidden bg-[#100b09] pb-14 pt-32 lg:h-svh lg:min-h-0 lg:pb-0 lg:pt-36"
    >
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.65, 0.85, 0.65], scale: [1, 1.04, 1] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-[5%] top-[3%] size-[820px] rounded-full bg-[radial-gradient(circle,rgba(246,88,30,0.62)_0%,rgba(190,54,17,0.38)_29%,rgba(91,25,11,0.15)_56%,transparent_74%)] blur-2xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-[42%] top-[13%] h-[620px] w-[820px] rounded-full bg-[radial-gradient(ellipse,rgba(238,79,24,0.25)_0%,rgba(166,50,16,0.17)_34%,rgba(84,24,10,0.08)_56%,transparent_76%)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-[16%] h-[560px] w-[670px] rounded-full bg-[radial-gradient(ellipse,rgba(255,111,44,0.43),rgba(141,42,15,0.20)_42%,transparent_72%)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[1%] top-[8%] h-[720px] w-[980px] rounded-[50%] border border-primary/30 [mask-image:linear-gradient(to_right,black_0%,black_72%,transparent_96%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-13%] top-[34%] h-[560px] w-[880px] rounded-[50%] border border-primary/25 [mask-image:linear-gradient(to_right,black_0%,black_68%,transparent_94%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN_BACKGROUND, backgroundRepeat: 'repeat', backgroundSize: '180px 180px' }} />

      <div className={cn('hero-mobile-container relative z-10 h-full lg:px-0', SECTION_CONTAINER_CLASS)}>
        <LanguageTransition id={`${language}-${switchId}`}>
          <div className="hero-desktop-stage relative lg:h-[calc(100svh-9rem)]">
          <div className="hero-mobile-frame relative h-[460px] min-h-0 overflow-hidden rounded-[30px] border border-primary/25 bg-[#100b09]/55 px-5 pt-5 lg:h-full lg:min-h-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:pt-0">
            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? { opacity: 0.64, scale: 1 } : { opacity: [0.58, 0.76, 0.58], scale: [1, 1.025, 1] }}
              transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -bottom-[4%] -right-[58%] z-0 h-[70%] w-[155%] rounded-full bg-[radial-gradient(ellipse,rgba(246,88,30,0.5)_0%,rgba(178,50,16,0.24)_34%,rgba(82,24,10,0.08)_58%,transparent_76%)] blur-2xl lg:hidden"
            />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-[2%] -right-[48%] z-0 h-[68%] w-[145%] rounded-[50%] border border-primary/20 lg:hidden" />
            <div className="hero-copy-group hero-mobile-copy-group relative z-30 lg:ml-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="hero-mobile-pill relative z-30 inline-flex rounded-full border border-white/10 bg-white/[0.035] px-5 py-2 text-sm font-medium text-primary"
            >
              {copy.pill}
            </motion.div>

            <div className="hero-desktop-title-wrap relative z-30 mt-4 max-w-[640px] lg:mt-5">
              {['PROJECT &', 'OPERATIONS', 'MANAGER'].map((line, index) => (
                <div key={line} className="overflow-hidden">
                  <motion.h1
                    custom={index}
                    variants={lineVariant}
                    initial={reduceMotion ? false : 'hidden'}
                    animate="visible"
                    className="hero-desktop-title hero-mobile-title font-heading text-[clamp(2.2rem,10.2vw,3.2rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-stone-100 lg:text-[clamp(4.03rem,5.98vw,4.78rem)]"
                  >
                    {line === 'PROJECT &' ? <>PROJECT <span className="text-primary">&amp;</span></> : line}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72, ease: EASE }}
              className="hero-desktop-copy hero-mobile-copy relative z-30 mt-[18px] max-w-[270px] text-pretty text-[0.92rem] leading-[1.42] text-stone-300 lg:mt-5 lg:max-w-[510px] lg:text-lg lg:leading-[1.35]"
            >
              {copy.hook}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.9, ease: EASE }}
              className="hero-desktop-actions hero-mobile-actions relative z-30 mt-5 flex flex-col items-start gap-3 lg:mt-5 lg:flex-row lg:flex-wrap lg:items-center"
            >
              <Button asChild size="lg" className="gap-2 rounded-full !px-6 bg-[linear-gradient(135deg,#f47a51_0%,#ef7048_55%,#e9653f_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-200 hover:scale-[1.02] hover:brightness-105">
                <a href="#work"><span>{copy.cta1}</span><ArrowRight aria-hidden="true" data-icon="inline-end" className="size-4" /></a>
              </Button>
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.02, ease: EASE }}>
                <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-white/20 bg-black/10 !px-6 hover:bg-white/5">
                  <a href="/resume.pdf" download><span>{copy.cta2}</span><Download aria-hidden="true" data-icon="inline-end" className="size-4" /></a>
                </Button>
              </motion.div>
            </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.38, ease: EASE }}
              className="hero-mobile-portrait pointer-events-none absolute -bottom-3 right-[-28vw] z-10 w-[clamp(18rem,94vw,25rem)] lg:hidden"
            >
              <img src="/images/ekaterina-hero-shoulders.png" alt="" className="h-auto w-full object-contain" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_65%_38%,rgba(255,111,54,0.1),transparent_44%)] mix-blend-screen" />
            </motion.div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%] bg-[linear-gradient(180deg,transparent_0%,rgba(16,11,9,0.18)_34%,rgba(16,11,9,0.72)_78%,#100b09_100%)] lg:hidden"
            />

            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? { opacity: 0.6, scale: 1 } : { opacity: [0.5, 0.7, 0.5], scale: [1, 1.028, 1] }}
              transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -right-[4%] -top-[10%] z-[5] hidden h-[88%] w-[62%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,78,25,0.34)_0%,rgba(171,48,16,0.2)_34%,rgba(83,24,10,0.08)_58%,transparent_76%)] blur-3xl lg:block"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: portraitOffset.x }}
              transition={{ duration: 1, delay: 0.38, ease: EASE, x: { type: 'spring', stiffness: 55, damping: 18 }, y: { type: 'spring', stiffness: 55, damping: 18 } }}
              className="hero-desktop-portrait pointer-events-none absolute -top-20 right-0 z-10 hidden w-[min(49vw,700px)] lg:block"
            >
              <img src="/images/ekaterina-hero-shoulders.png" alt="" className="h-auto w-full object-contain" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(255,111,54,0.08),transparent_42%)] mix-blend-screen"
              />
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-18vw] bottom-0 z-[19] hidden h-[58%] backdrop-blur-[7px] lg:block"
            style={{
              maskImage: 'linear-gradient(164deg, transparent 10%, transparent 38%, black 73%, black 100%)',
              WebkitMaskImage: 'linear-gradient(164deg, transparent 10%, transparent 38%, black 73%, black 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="hero-bottom-fade pointer-events-none absolute inset-x-[-18vw] inset-y-0 z-20 hidden lg:block"
            style={{
              background:
                'linear-gradient(162deg, transparent 0%, transparent 40%, rgba(16,11,9,0.34) 51%, rgba(16,11,9,0.82) 64%, rgba(16,11,9,0.96) 78%, #100b09 100%), linear-gradient(180deg, transparent 0%, transparent 43%, rgba(16,11,9,0.24) 51%, rgba(16,11,9,0.78) 64%, rgba(16,11,9,0.94) 77%, #100b09 100%)',
            }}
          />
          <StatCarousel stats={copy.stats} />
          </div>
          <MobileStats stats={copy.stats} />
        </LanguageTransition>
      </div>

    </section>
  )
}
