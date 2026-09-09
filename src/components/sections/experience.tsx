import { ArrowUpRight } from 'lucide-react'

import { FadeIn } from '@/components/motion/fade-in'
import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

const MILESTONES = [
  {
    date: { ru: 'Старт', en: 'Start' },
    title: { ru: 'Бизнес-ассистент отдела дизайна и контента', en: 'Business assistant, design & content team' },
    detail: { ru: 'Погружение в процессы, людей и реальные рабочие сценарии.', en: 'Learning the processes, people, and real work scenarios.' },
  },
  {
    date: { ru: 'Рост роли', en: 'Role growth' },
    title: { ru: 'Проекты, процессы и внутренние инструменты', en: 'Projects, processes, and internal tools' },
    detail: { ru: 'Управление ресурсами, кросс-функциональными задачами и операционными изменениями.', en: 'Managing resources, cross-functional work, and operational change.' },
  },
  {
    date: { ru: 'Сейчас', en: 'Today' },
    title: { ru: 'Project & Operations Manager', en: 'Project & Operations Manager' },
    detail: { ru: 'Веду несколько инициатив параллельно и продолжаю развивать продуктовую аналитику и стратегическое управление.', en: 'Running several initiatives in parallel while developing product analytics and strategic management skills.' },
  },
] as const

export function Experience() {
  const { language } = useLanguage()

  return (
    <section id="experience" className="relative z-[60] -mt-8 isolate overflow-hidden rounded-t-[3rem] border-y border-border/60 bg-background py-24 sm:py-28">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none font-heading text-[10rem] leading-none text-foreground/[0.035] sm:text-[clamp(12rem,25vw,27rem)]">05</span>
      <div className={cn('relative', SECTION_CONTAINER_CLASS)}>
        <FadeIn className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              <span>{language === 'ru' ? 'Опыт и ' : 'Experience and '}</span>
              <span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'рост роли' : 'role growth'}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {language === 'ru' ? 'Не длинная хронология, а три точки, которые объясняют траекторию.' : 'Not a long timeline, but three points that explain the trajectory.'}
          </p>
        </FadeIn>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-3 hidden h-px bg-border md:block" />
          {MILESTONES.map((milestone, index) => (
            <FadeIn key={milestone.date.ru} delay={index * 0.1} className="relative">
              <span className="mb-6 flex size-7 items-center justify-center rounded-full border border-primary/50 bg-background text-[11px] font-semibold text-primary">
                0{index + 1}
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-primary">{milestone.date[language]}</p>
              <h3 className="mt-3 max-w-xs text-xl font-medium tracking-tight text-foreground">{milestone.title[language]}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{milestone.detail[language]}</p>
              {index === MILESTONES.length - 1 && <ArrowUpRight aria-hidden="true" className="mt-5 size-5 text-primary" />}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
