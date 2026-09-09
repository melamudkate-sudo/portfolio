import { ArrowDownRight, ArrowRight, BookOpenCheck, Check, CircleDotDashed, Gauge, GitCompareArrows, ScanSearch, Scale, Sparkles, TrendingDown, TrendingUp, TriangleAlert, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { FadeIn, useScrollReveal } from '@/components/motion/fade-in'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

type Copy = { ru: string; en: string }
type Visual = 'model' | 'scenario' | 'queue' | 'product' | 'kpi' | 'network'

type Case = {
  number: string
  type: Visual
  category: Copy
  title: Copy
  lead: Copy
  context: Copy
  actions: Copy[]
  result: Copy
  metric?: Copy
  outcomes?: Array<{
    value: Copy
    label: Copy
  }>
}

const EASE = [0.16, 1, 0.3, 1] as const
const CASE_ONE_ACTION_ICONS = [ScanSearch, Scale, BookOpenCheck] as const

const CASES: Case[] = [
  {
    number: '01',
    type: 'model',
    category: { ru: 'Операционная трансформация', en: 'Operational transformation' },
    title: { ru: 'Перестройка операционной модели и ресурсное планирование', en: 'Rebuilding an operating model and resource planning' },
    lead: { ru: 'Перевела решения о ресурсах с интуиции на расчётную модель.', en: 'Moved resource decisions from intuition to a calculation model.' },
    context: { ru: 'Функции пересекались, трудоёмкость не была рассчитана, а планирование ресурсов не опиралось на единую модель.', en: 'Responsibilities overlapped, effort had not been calculated, and resource planning had no shared model.' },
    actions: [
      { ru: 'Собрала фактический функционал и рассчитала трудоёмкость ключевых направлений.', en: 'Mapped actual responsibilities and calculated effort across key areas.' },
      { ru: 'Сравнила найм, подряд и баланс загрузки по стоимости, скорости и управляемости.', en: 'Compared hiring, contractors, and workload balance by cost, speed, and controllability.' },
      { ru: 'Переработала роли, базу знаний, регламенты и цикл адаптации.', en: 'Reworked roles, knowledge base, operating rules, and onboarding.' },
    ],
    outcomes: [
      { value: { ru: '+20%', en: '+20%' }, label: { ru: 'объём задач', en: 'work volume' } },
      { value: { ru: '−40%', en: '−40%' }, label: { ru: 'просроченных задач', en: 'overdue tasks' } },
    ],
    result: { ru: 'Появился понятный план расширения команды, а также масштабируемая система передачи знаний.', en: 'Created a clear plan for team expansion and a scalable system for knowledge transfer.' },
  },
  {
    number: '02',
    type: 'scenario',
    category: { ru: 'Операционная модель', en: 'Operating model' },
    title: { ru: 'Оптимизация модели видеопроизводства', en: 'Optimising a video-production model' },
    lead: { ru: 'Сравнила сценарии производства и обосновала более управляемую модель.', en: 'Compared production scenarios and justified a more controllable model.' },
    context: { ru: 'Плановый рост объёма материалов усиливал зависимость от внешних исполнителей, расходов и длительных циклов правок.', en: 'Planned volume growth increased dependence on external suppliers, costs, and long revision cycles.' },
    actions: [
      { ru: 'Разработала несколько сценариев: подряд, частичное перераспределение и внутреннее производство.', en: 'Built several scenarios: contractors, partial redistribution, and in-house production.' },
      { ru: 'Рассчитала затраты, производственную мощность, риски и качество каждого сценария.', en: 'Modelled cost, capacity, risk, and quality for each scenario.' },
      { ru: 'Подготовила экономическое обоснование и рекомендацию для руководства.', en: 'Prepared the business case and recommendation for leadership.' },
    ],
    metric: { ru: 'Экономия относительно базового сценария — около 45%.', en: 'Savings relative to the baseline scenario — around 45%.' },
    result: { ru: 'Новая модель перешла к подготовке внутренней инфраструктуры.', en: 'The new model moved into internal-infrastructure preparation.' },
  },
  {
    number: '03',
    type: 'queue',
    category: { ru: 'Автоматизация', en: 'Automation' },
    title: { ru: 'Self-service доступ к ограниченному ресурсу', en: 'Self-service access to a constrained resource' },
    lead: { ru: 'Превратила ручную координацию в понятный сценарий без постоянного посредника.', en: 'Turned manual coordination into a clear flow without a constant intermediary.' },
    context: { ru: 'Сотрудники вручную уточняли доступность общего сервиса, пересекались по времени и тратили часы на коммуникацию.', en: 'Employees manually checked a shared service’s availability, collided in time, and spent hours coordinating.' },
    actions: [
      { ru: 'Разобрала пользовательский сценарий и причины конфликтов доступа.', en: 'Analysed the user flow and the causes of access conflicts.' },
      { ru: 'Спроектировала очередь: статусы, уведомления, освобождение доступа и исключения.', en: 'Designed a queue: statuses, notifications, release rules, and exceptions.' },
      { ru: 'Настроила автоматизацию, права, инструкции и сопровождение после запуска.', en: 'Configured automation, permissions, guidance, and post-launch support.' },
    ],
    metric: { ru: 'Количество конфликтов и повторных уточнений сократилось вдвое.', en: 'Conflicts and repeat clarification requests were cut in half.' },
    result: { ru: 'Инструмент экономит команде несколько рабочих часов еженедельно.', en: 'The tool saves the team several work hours every week.' },
  },
  {
    number: '04',
    type: 'product',
    category: { ru: 'Продуктовое мышление', en: 'Product thinking' },
    title: { ru: 'Перепроектирование внутренней системы управления процессом', en: 'Redesigning an internal process-management system' },
    lead: { ru: 'Вернула внутренний продукт к исходной бизнес-задаче.', en: 'Brought an internal product back to its original business goal.' },
    context: { ru: 'Проработка MVP смещалась к набору отдельных функций и рисковала потерять ценность для реального сценария работы.', en: 'MVP work was shifting toward a feature set and risking loss of value for the real work scenario.' },
    actions: [
      { ru: 'Проанализировала MVP, роли и пользовательские сценарии.', en: 'Analysed the MVP, roles, and user scenarios.' },
      { ru: 'Сфокусировала концепцию на этапах, ответственности, рисках и передаче результата.', en: 'Refocused the concept on stages, ownership, risks, and handoffs.' },
      { ru: 'Создала интерактивный прототип и представила обновлённую логику команде.', en: 'Created an interactive prototype and presented the updated logic to the team.' },
    ],
    result: { ru: 'Часть логики вошла в дальнейший план реализации.', en: 'Part of the proposed logic entered the further implementation plan.' },
  },
  {
    number: '05',
    type: 'kpi',
    category: { ru: 'Аналитика и мотивация', en: 'Analytics and motivation' },
    title: { ru: 'KPI-системы для функциональных блоков', en: 'KPI systems for functional units' },
    lead: { ru: 'Сделала оценку работы измеримой и более справедливой.', en: 'Made performance assessment measurable and fairer.' },
    context: { ru: 'Исходные показатели были фрагментарными, плохо измеримыми и не отражали реальную работу сотрудников.', en: 'Initial metrics were fragmented, difficult to measure, and did not reflect employees’ actual work.' },
    actions: [
      { ru: 'Провела интервью с сотрудниками, руководителями и владельцами процессов.', en: 'Interviewed employees, leaders, and process owners.' },
      { ru: 'Отделила показатели под контролем сотрудника от внешних факторов.', en: 'Separated employee-controlled metrics from external factors.' },
      { ru: 'Создала расчётные модели, сводки и основу для автоматизации.', en: 'Created calculation models, summaries, and a basis for automation.' },
    ],
    result: { ru: 'Для двух блоков появились полноценные KPI-системы, связанные с бизнес-результатами.', en: 'Two units received full KPI systems connected to business results.' },
  },
  {
    number: '06',
    type: 'network',
    category: { ru: 'Управление подрядчиками', en: 'Contractor management' },
    title: { ru: 'Управление внешним производственным контуром', en: 'Managing an external production network' },
    lead: { ru: 'Собрала управляемый контур из нескольких внешних исполнителей.', en: 'Built a manageable network of external specialists.' },
    context: { ru: 'Параллельно требовалось координировать до восьми специалистов и подрядчиков — от выбора исполнителя до передачи результата.', en: 'Up to eight specialists and contractors needed coordination in parallel — from selection to handoff.' },
    actions: [
      { ru: 'Формировала требования, сравнивала условия и организовывала выбор исполнителей.', en: 'Formed requirements, compared terms, and organised supplier selection.' },
      { ru: 'Согласовывала ТЗ, сроки, стоимость и контрольные точки.', en: 'Aligned briefs, timelines, cost, and checkpoints.' },
      { ru: 'Разрешала разногласия между внутренними заказчиками и исполнителями.', en: 'Resolved friction between internal stakeholders and suppliers.' },
    ],
    result: { ru: 'Стали прозрачнее сроки, статусы, качество и нагрузка внешнего контура.', en: 'Timelines, status, quality, and capacity became more transparent.' },
  },
]

function Diagram({ type, language }: { type: Visual; language: 'ru' | 'en' }) {
  const label = (ru: string, en: string) => (language === 'ru' ? ru : en)

  if (type === 'model') {
    return <div className="grid h-full grid-cols-2 gap-3 text-center text-xs"><div className="rounded-2xl border border-border bg-background/70 p-4"><p className="text-muted-foreground">{label('До', 'Before')}</p><div className="mt-6 flex h-28 items-end justify-center gap-2"><i className="h-[36%] w-5 rounded-t bg-muted" /><i className="h-[78%] w-5 rounded-t bg-muted-foreground/50" /><i className="h-[54%] w-5 rounded-t bg-muted" /></div></div><div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-4"><p className="text-primary">{label('После', 'After')}</p><div className="mt-6 flex h-28 items-end justify-center gap-2"><i className="h-[58%] w-5 rounded-t bg-primary/50" /><i className="h-[72%] w-5 rounded-t bg-primary" /><i className="h-[72%] w-5 rounded-t bg-primary/70" /></div></div></div>
  }
  if (type === 'scenario') {
    return <div className="space-y-3 text-xs">{[['Подряд', 'Contractors', 'bg-muted-foreground/40'], ['Гибрид', 'Hybrid', 'bg-primary/50'], ['Внутренняя модель', 'In-house', 'bg-primary']].map(([ru, en, color], index) => <div key={ru} className="flex items-center gap-3"><span className="w-28 text-muted-foreground">{label(ru, en)}</span><span className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><i className={cn('block h-full rounded-full', color, index === 0 ? 'w-full' : index === 1 ? 'w-3/4' : 'w-[55%]')} /></span></div>)}<p className="pt-3 text-primary">≈ 45% {label('экономии', 'savings')}</p></div>
  }
  if (type === 'queue') {
    return <div className="flex h-full items-center justify-between gap-2 text-center text-[10px] text-muted-foreground"><div className="rounded-xl border border-border p-3">{label('Запрос', 'Request')}</div><ArrowRight className="size-4 shrink-0 text-primary" /><div className="rounded-xl border border-primary/40 bg-primary/10 p-3 text-primary">{label('Очередь', 'Queue')}</div><ArrowRight className="size-4 shrink-0 text-primary" /><div className="rounded-xl border border-border p-3">{label('Доступ', 'Access')}</div></div>
  }
  if (type === 'product') {
    return <div className="relative flex h-full flex-col justify-center gap-3 text-xs"><div className="rounded-xl border border-muted-foreground/30 p-3 text-muted-foreground"><span className="line-through">{label('Набор функций', 'Feature list')}</span></div><ArrowDownRight className="ml-5 size-5 text-primary" /><div className="rounded-xl border border-primary/40 bg-primary/10 p-3 text-primary">{label('Бизнес-цель → сценарии → роли', 'Business goal → scenarios → roles')}</div></div>
  }
  if (type === 'kpi') {
    return <div className="grid h-full grid-cols-2 gap-3 text-xs"><div className="rounded-xl border border-border p-4"><Gauge className="size-5 text-muted-foreground" /><p className="mt-5 text-muted-foreground">{label('Сроки', 'Timelines')}</p><div className="mt-2 h-1.5 w-4/5 rounded bg-muted-foreground/50" /></div><div className="rounded-xl border border-primary/40 bg-primary/10 p-4"><Check className="size-5 text-primary" /><p className="mt-5 text-primary">{label('Качество', 'Quality')}</p><div className="mt-2 h-1.5 w-3/5 rounded bg-primary" /></div><div className="rounded-xl border border-primary/40 bg-primary/10 p-4"><CircleDotDashed className="size-5 text-primary" /><p className="mt-5 text-primary">{label('Объём', 'Volume')}</p><div className="mt-2 h-1.5 w-4/5 rounded bg-primary" /></div><div className="rounded-xl border border-border p-4"><GitCompareArrows className="size-5 text-muted-foreground" /><p className="mt-5 text-muted-foreground">{label('Зависимости', 'Dependencies')}</p><div className="mt-2 h-1.5 w-1/2 rounded bg-muted-foreground/50" /></div></div>
  }
  return <div className="relative flex h-full items-center justify-center"><div className="absolute h-24 w-24 rounded-full border border-primary/40" /><div className="relative flex size-14 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary"><UsersRound className="size-6" /></div>{[[18, 8], [80, 16], [8, 78], [82, 78]].map(([left, top], index) => <span key={index} style={{ left: `${left}%`, top: `${top}%` }} className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-[10px] text-muted-foreground">{index + 1}</span>)}</div>
}

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
      className="group flex min-h-0 flex-col rounded-2xl border border-primary/20 bg-card/80 p-3.5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-primary/45 hover:shadow-[0_18px_32px_-25px_rgba(235,116,67,0.35)] lg:min-h-56"
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
        { pointIndex: 1, title: 'Месяц 1 · Видимость нагрузки', description: 'Собрала фактический функционал и рассчитала трудоёмкость — стало видно, где возникают перегрузки.' },
        { pointIndex: 3, title: 'Месяц 3 · Выбор модели', description: 'Сравнила найм, подряд и баланс загрузки: решения стали опираться на стоимость, скорость и управляемость.' },
        { pointIndex: 6, title: 'Месяц 6 · Система закреплена', description: 'Обновила роли, базу знаний и адаптацию — знания и правила работы стали передаваться системно.' },
      ]
    : [
        { pointIndex: 1, title: 'Month 1 · Workload visibility', description: 'Mapped actual responsibilities and calculated effort, making overload areas visible.' },
        { pointIndex: 3, title: 'Month 3 · Model selection', description: 'Compared hiring, contractors, and workload balance by cost, speed, and controllability.' },
        { pointIndex: 6, title: 'Month 6 · System embedded', description: 'Updated roles, knowledge base, and onboarding so operating knowledge transfers systematically.' },
      ]
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)
  const selected = selectedMilestone === null ? null : milestones[selectedMilestone]

  useEffect(() => {
    if (selectedMilestone === null) return
    const timeout = window.setTimeout(() => setSelectedMilestone(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [selectedMilestone])
  const labels = language === 'ru'
    ? ['До изменений', 'Мес. 1', 'Мес. 2', 'Мес. 3', 'Мес. 4', 'Мес. 5', 'Мес. 6']
    : ['Before', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']
  const points = [[30, 226], [103, 196], [176, 184], [249, 152], [322, 158], [395, 108], [468, 64]] as const
  const linePath = 'M 30 226 C 58 212, 78 197, 103 196 S 149 186, 176 184 S 224 150, 249 152 S 296 155, 322 158 S 370 122, 395 108 S 444 78, 468 64'
  const areaPath = `${linePath} L 468 250 L 30 250 Z`

  return (
    <div ref={ref} onClick={() => setSelectedMilestone(null)} className="relative flex aspect-square min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/25 bg-card/70 p-3.5 shadow-[0_22px_60px_-38px_rgba(235,116,67,0.45)] sm:p-4 lg:self-end">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-6 size-48 rounded-full bg-primary/[0.11] blur-3xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{language === 'ru' ? 'Эффект от изменений' : 'Effect of the changes'}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">{language === 'ru' ? 'Динамика после внедрения · индекс 0–100' : 'Post-implementation dynamics · index 0–100'}</p>
        </div>
        <span className="mt-1 h-px w-8 bg-primary/60" />
      </div>
      <div className="relative mt-3 min-h-[13rem] w-full flex-1">
      <svg viewBox="0 0 500 278" preserveAspectRatio="none" role="img" aria-label={language === 'ru' ? 'График динамики после внедрения модели' : 'Chart of the dynamics after implementing the model'} className="h-full w-full overflow-visible text-muted-foreground">
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
        {labels.map((label, index) => <text key={label} x={30 + index * 73} y="274" textAnchor="middle" fill="currentColor" opacity="0.58" fontSize="8">{label}</text>)}
      </svg>
      {milestones.map((milestone, index) => {
        const [cx, cy] = points[milestone.pointIndex]
        const isSelected = selected?.pointIndex === milestone.pointIndex
        return <button key={milestone.pointIndex} type="button" aria-label={milestone.title} onClick={(event) => { event.stopPropagation(); setSelectedMilestone(index) }} className="absolute z-[1] flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-card text-[8px] font-bold leading-none text-primary transition-[border-color,box-shadow] hover:border-primary/80 hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60" style={{ left: `${cx / 5}%`, top: `${cy / 2.78}%`, borderWidth: isSelected ? '2px' : '1.5px' }}>i</button>
      })}
      </div>
      <div className="relative mt-1 flex items-center gap-2 text-[10px] text-muted-foreground"><span className="h-px w-8 bg-primary" />{language === 'ru' ? 'Индекс управляемости нагрузки' : 'Workload manageability index'}</div>
      {selected && <motion.div key={selected.pointIndex} onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.24, ease: EASE }} className="absolute bottom-8 left-1/2 z-10 w-[min(82%,19rem)] -translate-x-1/2 rounded-lg border border-primary/25 bg-card/95 px-3 py-2 shadow-xl shadow-black/30">
        <p className="text-[9px] font-medium uppercase tracking-[0.11em] text-primary">{selected.title}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-foreground">{selected.description}</p>
        <button type="button" onClick={() => setSelectedMilestone(null)} aria-label={language === 'ru' ? 'Закрыть пояснение' : 'Close explanation'} className="absolute right-1.5 top-1 flex size-4 items-center justify-center rounded text-[13px] leading-none text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">×</button>
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

function CaseOne({ item, language }: { item: Case; language: 'ru' | 'en' }) {
  const [ref, isRevealed] = useScrollReveal<HTMLElement>()
  const reduceMotion = useReducedMotion()
  const isVisible = isRevealed || Boolean(reduceMotion)
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: 16 }, animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }, transition: { duration: 0.58, delay: reduceMotion ? 0 : delay, ease: EASE } })

  return (
    <article ref={ref} className="relative isolate overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-5 sm:p-6 xl:p-7 xl:pb-3">
      <DotPattern aria-hidden="true" width={18} height={18} cr={0.55} className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_76%_43%,white,transparent_66%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[8%] size-72 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.48fr)_minmax(15rem,0.52fr)] lg:gap-7">
        <div className="min-w-0">
          <motion.div {...reveal(0)} className="flex items-center gap-3"><span className="text-xs font-medium tabular-nums tracking-[0.16em] text-primary">{item.number}</span><span className="h-px w-8 bg-primary/70" /><p className="text-xs font-medium text-muted-foreground">{item.category[language]}</p></motion.div>
          <motion.h3 {...reveal(0.12)} className="mt-3 max-w-[26ch] text-balance text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-4xl xl:text-[2.35rem] xl:leading-[1.08]">{item.title[language]}</motion.h3>
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

export function Cases() {
  const { language } = useLanguage()
  const copy = (value: Copy) => value[language]

  return (
    <section id="work" className="relative z-40 -mt-8 isolate overflow-hidden rounded-t-[3rem] bg-background py-24 sm:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-6 select-none font-heading text-[10rem] leading-none text-foreground/[0.035] sm:-right-7 sm:top-4 sm:text-[clamp(12rem,25vw,27rem)]">03</span>
      <DotPattern
        glow
        width={30}
        height={30}
        cr={0.7}
        className="pointer-events-none opacity-[0.13] [mask-image:radial-gradient(ellipse_at_center,white,transparent_82%)]"
      />
      <div className={cn('relative', SECTION_CONTAINER_CLASS)}>
        <FadeIn className="max-w-3xl">
          <h2 className="max-w-[14ch] text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl"><span>{language === 'ru' ? 'Кейсы: от причины ' : 'Cases: from cause '}</span><span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'к результату' : 'to outcome'}</span></h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{language === 'ru' ? 'Здесь нет внутренних названий, скриншотов и точных бюджетов — таковы правила конфиденциальности. Схемы ниже созданы заново, на условных данных, чтобы показать подход к решению.' : 'There are no internal names, screenshots, or exact budgets here — confidentiality requires it. The diagrams are rebuilt with illustrative data to show the approach.'}</p>
        </FadeIn>
      </div>

      <div className="relative mx-auto mt-20 w-full max-w-[80rem] px-6">
        <div className="space-y-24 sm:space-y-32">
          <CaseOne item={CASES[0]} language={language} />
          {CASES.slice(1).map((item, index) => (
            <FadeIn key={item.number}>
              <article className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
                <div className={cn('lg:col-span-7', index % 2 === 1 && 'lg:order-2')}>
                  <div className="flex items-center gap-3"><span className="text-xs font-medium tabular-nums tracking-[0.15em] text-primary">{item.number}</span><span className="h-px w-8 bg-primary/60" /><p className="text-xs font-medium text-muted-foreground">{copy(item.category)}</p></div>
                  <h3 className="mt-4 max-w-2xl text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{copy(item.title)}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary">{copy(item.lead)}</p>
                  <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy(item.context)}</p>
                  <ol className="mt-8 space-y-3">{item.actions.map((action, actionIndex) => <li key={action.ru} className="flex gap-3 text-sm leading-relaxed text-foreground"><span className="mt-0.5 text-xs tabular-nums text-primary">0{actionIndex + 1}</span><span>{copy(action)}</span></li>)}</ol>
                  <div className="mt-8 border-l-2 border-primary pl-4"><p className="text-sm font-medium leading-relaxed text-foreground">{copy(item.result)}</p></div>
                </div>
                <div className={cn('min-h-72 rounded-3xl border border-border bg-card/70 p-6 shadow-lg shadow-black/10 sm:min-h-80 sm:p-8 lg:col-span-5', index % 2 === 1 && 'lg:order-1')}>
                  <Diagram type={item.type} language={language} />
                  {item.metric && <p className="mt-6 border-t border-border pt-5 text-sm font-medium leading-relaxed text-primary">{copy(item.metric)}</p>}
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/70">{language === 'ru' ? 'Реконструкция для демонстрации подхода; не отражает реальные данные или системы компании.' : 'Reconstruction for demonstrating the approach; it does not represent real company data or systems.'}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-24 rounded-3xl border border-border bg-muted/30 p-7 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">{language === 'ru' ? 'Ещё внедрила' : 'Also implemented'}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{[
            { ru: 'Единый реестр и контроль качества контента для 20+ товарных позиций.', en: 'A unified content registry and quality control system for 20+ product positions.' },
            { ru: 'Архитектуру внутреннего хранилища с понятными правилами доступа и передачи материалов.', en: 'An internal storage architecture with clear access and handoff rules.' },
            { ru: 'Сквозной операционный контур производства контента с контрольными точками.', en: 'An end-to-end content-production operating flow with checkpoints.' },
          ].map((item) => <p key={item.ru} className="border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground">{copy(item)}</p>)}</div>
        </FadeIn>
      </div>
    </section>
  )
}
