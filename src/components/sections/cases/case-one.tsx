import { BookOpenCheck, ScanSearch, Scale, Sparkles, TrendingDown, TrendingUp, TriangleAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { useScrollReveal } from '@/components/motion/fade-in'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'

import type { Case, Copy } from './data'
const EASE = [0.16, 1, 0.3, 1] as const
const CASE_ONE_ACTION_ICONS = [ScanSearch, Scale, BookOpenCheck] as const

function CaseAction({
  action,
  index,
  Icon,
  language,
  isVisible,
}: {
  action: Copy
  index: number
  Icon: LucideIcon
  language: 'ru' | 'en'
  isVisible: boolean
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.55, delay: 0.55 + index * 0.12, ease: EASE }}
      className="group flex min-h-0 flex-col rounded-2xl border border-primary/20 bg-card/80 p-3.5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-primary/45 hover:shadow-[0_18px_32px_-25px_rgba(235,116,67,0.35)] lg:min-h-44"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="relative flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-shadow duration-300 group-hover:shadow-[0_0_22px_hsl(var(--primary)/0.35)]">
          <span aria-hidden="true" style={{ animationDelay: `${index * 0.3}s` }} className="absolute inset-0 animate-stat-ring-pulse rounded-full bg-primary" />
          <Icon aria-hidden="true" className="relative size-4" strokeWidth={1.65} />
        </span>
        <p className="text-[11px] font-medium tabular-nums tracking-[0.16em] text-primary">0{index + 1}</p>
      </div>
      <p className="mt-3 text-[12px] leading-[1.38] text-foreground">{action[language]}</p>
    </motion.li>
  )
}

function EffectChart({ language }: { language: 'ru' | 'en' }) {
  const [ref, isRevealed] = useScrollReveal<HTMLDivElement>()
  const reduceMotion = useReducedMotion()
  const isVisible = isRevealed || Boolean(reduceMotion)
  const milestones = language === 'ru'
    ? [
        { pointIndex: 1, title: 'Этап 1 · Видимость нагрузки', description: 'Собрала фактический функционал и рассчитала трудоёмкость — стало видно, где возникают перегрузки.' },
        { pointIndex: 3, title: 'Этап 2 · Выбор модели', description: 'Сравнила найм, подряд и баланс загрузки: решения стали опираться на стоимость, скорость и управляемость.' },
        { pointIndex: 6, title: 'Этап 3 · Система закреплена', description: 'Обновила роли, базу знаний и адаптацию — знания и правила работы стали передаваться системно.' },
      ]
    : [
        { pointIndex: 1, title: 'Step 1 · Workload visibility', description: 'Mapped actual responsibilities and calculated effort, making overload areas visible.' },
        { pointIndex: 3, title: 'Step 2 · Model selection', description: 'Compared hiring, contractors, and workload balance by cost, speed, and controllability.' },
        { pointIndex: 6, title: 'Step 3 · System embedded', description: 'Updated roles, knowledge base, and onboarding so operating knowledge transfers systematically.' },
      ]
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)
  const selected = selectedMilestone === null ? null : milestones[selectedMilestone]

  useEffect(() => {
    if (selectedMilestone === null) return
    const timeout = window.setTimeout(() => setSelectedMilestone(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [selectedMilestone])
  const labels = language === 'ru'
    ? ['До', '', 'Анализ', '', 'Модель', '', 'Система']
    : ['Before', '', 'Analysis', '', 'Model', '', 'System']
  const points = [[30, 226], [103, 196], [176, 184], [249, 152], [322, 158], [395, 108], [468, 64]] as const
  const linePath = 'M 30 226 C 58 212, 78 197, 103 196 S 149 186, 176 184 S 224 150, 249 152 S 296 155, 322 158 S 370 122, 395 108 S 444 78, 468 64'
  const areaPath = `${linePath} L 468 250 L 30 250 Z`

  return (
    <div ref={ref} onClick={() => setSelectedMilestone(null)} className="relative flex aspect-square min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/25 bg-card/70 p-3.5 shadow-[0_22px_60px_-38px_rgba(235,116,67,0.45)] sm:p-4 lg:self-end">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-6 size-48 rounded-full bg-primary/[0.11] blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{language === 'ru' ? 'Эффект от изменений' : 'Effect of the changes'}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">{language === 'ru' ? 'Иллюстрация подхода · не измеренная динамика' : 'Illustrative approach · not measured data'}</p>
        </div>
        <span className="mt-1 h-px w-8 bg-primary/60" />
      </div>
      <div className="relative mt-3 min-h-[13rem] w-full flex-1">
      <svg viewBox="0 0 500 278" preserveAspectRatio="none" role="img" aria-label={language === 'ru' ? 'Условная схема повышения управляемости' : 'Illustrative chart of improved manageability'} className="h-full w-full overflow-visible text-muted-foreground">
        <defs>
          <linearGradient id="case-one-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.36" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <filter id="case-one-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <clipPath id="case-one-area-clip">
            <motion.rect
              x="0"
              y="0"
              height="250"
              initial={{ width: 0 }}
              animate={isVisible ? { width: 500 } : { width: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 1.45, delay: reduceMotion ? 0 : 0.22, ease: 'easeInOut' }}
            />
          </clipPath>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.3 }}>
          {[[50, '100'], [90, '80'], [130, '60'], [170, '40'], [210, '20'], [250, '0']].map(([y, value]) => <g key={value}><line x1="28" x2="482" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.11" strokeDasharray="2 6" /><text x="20" y={Number(y) + 3} textAnchor="end" fill="currentColor" opacity="0.58" fontSize="8">{value}</text></g>)}
          <line x1="28" x2="482" y1="250" y2="250" stroke="currentColor" strokeOpacity="0.4" />
          <line x1="28" x2="28" y1="8" y2="250" stroke="currentColor" strokeOpacity="0.44" />
        </motion.g>
        <path d={areaPath} fill="url(#case-one-area)" clipPath="url(#case-one-area-clip)" />
        <motion.path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="3.1" strokeLinecap="round" initial={{ strokeDasharray: 600, strokeDashoffset: 600 }} animate={isVisible ? { strokeDasharray: 600, strokeDashoffset: 0 } : { strokeDasharray: 600, strokeDashoffset: 600 }} transition={{ duration: reduceMotion ? 0.2 : 1.45, delay: reduceMotion ? 0 : 0.22, ease: 'easeInOut' }} />
        {points.map(([cx, cy], index) => (
          <motion.circle key={cx} cx={cx} cy={cy} r={index === points.length - 1 ? 4.8 : 3.2} fill="var(--primary)" stroke="var(--background)" strokeWidth="2" initial={{ opacity: 0, scale: 0 }} animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ duration: 0.26, delay: reduceMotion ? 0 : 0.55 + index * 0.14, ease: EASE }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
        ))}
        <motion.circle cx="468" cy="24" r="5" fill="var(--primary)" filter="url(#case-one-glow)" initial={{ opacity: 0, scale: 0.5 }} animate={isVisible ? { opacity: [0, 0.52, 0], scale: [0.5, 2.1, 2.7] } : { opacity: 0, scale: 0.5 }} transition={{ duration: 0.68, delay: reduceMotion ? 0 : 1.58, ease: 'easeOut' }} style={{ transformOrigin: '468px 24px' }} />
        {labels.map((label, index) => <text key={index} x={30 + index * 73} y="274" textAnchor="middle" fill="currentColor" opacity="0.58" fontSize="8">{label}</text>)}
      </svg>
      {milestones.map((milestone, index) => {
        const [cx, cy] = points[milestone.pointIndex]
        const isSelected = selected?.pointIndex === milestone.pointIndex
        return <button key={milestone.pointIndex} type="button" aria-label={milestone.title} onClick={(event) => { event.stopPropagation(); setSelectedMilestone(index) }} className="absolute z-[1] flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-card text-[8px] font-bold leading-none text-primary transition-[border-color,box-shadow] hover:border-primary/80 hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" style={{ left: `${cx / 5}%`, top: `${cy / 2.78}%`, borderWidth: isSelected ? '2px' : '1.5px' }}>i</button>
      })}
      </div>
      <div className="relative mt-1 flex items-center gap-2 text-[10px] text-muted-foreground"><span className="h-px w-8 bg-primary" />{language === 'ru' ? 'Индекс управляемости нагрузки' : 'Workload manageability index'}</div>
      {selected && <motion.div key={selected.pointIndex} onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.24, ease: EASE }} className="absolute bottom-8 left-1/2 z-10 w-[min(82%,19rem)] -translate-x-1/2 rounded-lg border border-primary/25 bg-card/95 px-3 py-2 shadow-xl shadow-black/30">
        <p className="text-[9px] font-medium uppercase tracking-[0.11em] text-primary">{selected.title}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-foreground">{selected.description}</p>
        <button type="button" onClick={() => setSelectedMilestone(null)} aria-label={language === 'ru' ? 'Закрыть пояснение' : 'Close explanation'} className="absolute right-0 top-0 flex size-8 items-center justify-center rounded text-[13px] leading-none text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">×</button>
      </motion.div>}
    </div>
  )
}

function CountUpMetric({ value, label, Icon, isVisible }: { value: string; label: string; Icon: LucideIcon; isVisible: boolean }) {
  const reduceMotion = useReducedMotion()
  const number = Number(value.replace(/[^0-9]/g, ''))
  const prefix = value.includes('−') ? '−' : '+'
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    if (reduceMotion) {
      setCount(number)
      return
    }
    const controls = animate(0, number, { duration: 1.05, ease: 'easeOut', onUpdate: (latest) => setCount(Math.round(latest)) })
    return () => controls.stop()
  }, [isVisible, number, reduceMotion])

  const iconMotion = prefix === '+' ? { x: [-2, 0], y: [2, 0] } : { x: [2, 0], y: [-2, 0] }
  return (
    <div className="relative isolate min-h-28 overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.045] p-3 sm:min-h-0 sm:p-2.5">
      <div aria-hidden="true" className="absolute -right-10 top-5 size-36 rounded-full bg-primary/[0.12] blur-3xl" />
      <div className="relative flex h-full">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-heading text-[3.8rem] leading-none tracking-tight text-primary sm:text-[3.75rem]"><span className="text-[0.78em]">{prefix}</span>{count}<span className="text-[0.78em]">%</span></p>
          <p className="mt-auto pt-1.5 text-[15px] font-medium text-foreground">{label}</p>
        </div>
        <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1, ...iconMotion } : { opacity: 0 }} transition={{ duration: 0.38, delay: reduceMotion ? 0 : 0.28, ease: EASE }} className="absolute right-1 top-1 flex size-11 items-center justify-center rounded-full border border-primary/35 bg-primary/[0.08] text-primary">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </motion.span>
      </div>
    </div>
  )
}

function ImpactPanel({ item, language }: { item: Case; language: 'ru' | 'en' }) {
  const [ref, isRevealed] = useScrollReveal<HTMLElement>()
  const reduceMotion = useReducedMotion()
  const isVisible = isRevealed || Boolean(reduceMotion)
  const outcomes = item.outcomes ?? []

  return (
    <motion.aside ref={ref} initial={{ opacity: 0, y: 18 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.46, ease: EASE }} className="relative flex overflow-hidden rounded-[1.6rem] border border-primary/25 bg-card/95 p-4 shadow-[0_22px_60px_-38px_rgba(235,116,67,0.45)] sm:p-4 lg:self-stretch">
      <div className="flex w-full flex-col">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-24 size-48 rounded-full bg-primary/[0.11] blur-3xl" />
      <p className="relative text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{language === 'ru' ? 'Влияние на работу команды' : 'Impact on team operations'}</p>
      <div className="relative mt-4 grid gap-3">
        {outcomes.map((outcome, index) => <CountUpMetric key={outcome.label.ru} value={outcome.value[language]} label={outcome.label[language]} Icon={index === 0 ? TrendingUp : TrendingDown} isVisible={isVisible} />)}
      </div>
      <div className="relative mt-3 rounded-xl border border-primary/20 bg-primary/[0.045] p-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-primary">{language === 'ru' ? 'Как читать индекс' : 'How to read the index'}</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{language === 'ru' ? 'Условная шкала: чем выше значение, тем понятнее нагрузка, ответственные и следующий шаг — меньше ручных согласований.' : 'An illustrative scale: a higher value means clearer workload, ownership, and next steps — with less manual coordination.'}</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : 1.1, ease: EASE }} className={cn('relative mb-2 mt-auto overflow-hidden rounded-xl border border-primary/80 bg-primary p-2.5 shadow-[0_16px_32px_-24px_hsl(var(--primary)/0.9)]', language === 'en' && 'min-h-[7.75rem]')}>
        <div aria-hidden="true" className="absolute -right-8 -top-8 size-28 rounded-full bg-primary-foreground/10 blur-2xl" />
        <span className="absolute right-2.5 top-2.5 flex size-10 items-center justify-center rounded-full border border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground"><Sparkles aria-hidden="true" className="size-4" strokeWidth={1.6} /></span>
        <div className="relative">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground/80">{language === 'ru' ? 'Результат' : 'Result'}</p>
          <p className="mt-1.5 text-[13px] leading-[1.45] text-primary-foreground">{language === 'ru' ? <><span className="block">Появился понятный план</span><span className="block">расширения команды,</span><span className="block">а также масштабируемая</span><span className="block">система передачи знаний.</span></> : <><span className="block">Created a clear plan</span><span className="block">for team expansion</span><span className="block">and&nbsp;a scalable system</span><span className="block">for knowledge transfer.</span></>}</p>
        </div>
      </motion.div>
      </div>
    </motion.aside>
  )
}

export function CaseOne({ item, language }: { item: Case; language: 'ru' | 'en' }) {
  const [ref, isRevealed] = useScrollReveal<HTMLElement>()
  const reduceMotion = useReducedMotion()
  const isVisible = isRevealed || Boolean(reduceMotion)
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: 16 }, animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.58, delay: reduceMotion ? 0 : delay, ease: EASE } })

  return (
    <article ref={ref} className="relative isolate overflow-hidden case-one p-5 sm:p-6 xl:p-7">
      <DotPattern aria-hidden="true" width={18} height={18} cr={0.55} className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_76%_43%,white,transparent_66%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[8%] size-72 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.48fr)_minmax(15rem,0.52fr)] lg:gap-7">
        <div className="min-w-0">
          <motion.div {...reveal(0)} className="flex items-center gap-3"><span className="text-xs font-medium tabular-nums tracking-[0.16em] text-primary">{item.number}</span><span className="h-px w-8 bg-primary/70" /><p className="text-xs font-medium text-muted-foreground">{item.category[language]}</p></motion.div>
          <motion.h3 {...reveal(0.12)} className="mt-3 max-w-[26ch] text-balance text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-4xl xl:text-[2.35rem] xl:leading-[1.08]">{item.title[language]}</motion.h3>
          <p className="mt-3 text-xs text-muted-foreground">{language === 'ru' ? 'Моя роль · анализ ресурсов, проектирование модели, адаптация' : 'My role · resource analysis, model design, onboarding'}</p>
          <motion.p {...reveal(0.24)} className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-primary">{item.lead[language]}</motion.p>

          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.36fr)_minmax(13rem,1.14fr)] lg:items-start">
            <div>
              <motion.div {...reveal(0.38)} className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-card/95 p-3 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_18px_36px_-28px_rgba(235,116,67,0.4)]">
                <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-1/2 size-28 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-2xl" />
                <div className="relative flex gap-3">
                  <motion.span initial={{ opacity: 0, scale: 0.86 }} animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }} transition={{ duration: 0.38, delay: reduceMotion ? 0 : 0.5, ease: EASE }} className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"><span aria-hidden="true" className="absolute inset-0 animate-stat-ring-pulse rounded-full bg-primary" /><TriangleAlert aria-hidden="true" className="relative size-4 -translate-y-px" strokeWidth={1.65} /></motion.span>
                  <div className="min-w-0"><p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{language === 'ru' ? 'Проблема' : 'Problem'}</p><p className="mt-2 text-sm leading-[1.5] text-foreground sm:text-[15px]">{item.context[language]}</p></div>
                </div>
              </motion.div>

              <div className="mt-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{language === 'ru' ? 'Что сделала' : 'What I did'}</p>
                <ol className="mt-3 grid gap-3 sm:grid-cols-3">
                  {item.actions.map((action, index) => <CaseAction key={action.ru} action={action} index={index} Icon={CASE_ONE_ACTION_ICONS[index]} language={language} isVisible={isVisible} />)}
                </ol>
              </div>
            </div>
            <EffectChart language={language} />
          </div>
        </div>
        <ImpactPanel item={item} language={language} />
      </div>
    </article>
  )
}

