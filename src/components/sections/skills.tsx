import { Bot, ChartNoAxesCombined, Compass, MessagesSquare, Settings2, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { FadeIn } from '@/components/motion/fade-in'
import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

type SkillGroup = {
  title: { ru: string; en: string }
  note: { ru: string; en: string }
  tags: { ru: string[]; en: string[] }
  Icon: LucideIcon
  featured?: boolean
}

const GROUPS: SkillGroup[] = [
  {
    title: { ru: 'Проектирование', en: 'Designing systems' },
    note: { ru: 'От процесса к понятной модели работы.', en: 'From a process to a clear operating model.' },
    tags: {
      ru: ['Бизнес-процессы', 'Ролевые модели', 'Информационная архитектура'],
      en: ['Business processes', 'Role models', 'Information architecture'],
    },
    Icon: Compass,
  },
  {
    title: { ru: 'Коммуникация', en: 'Communication' },
    note: { ru: 'Соединяю людей, контекст и следующее действие.', en: 'Connecting people, context, and the next action.' },
    tags: {
      ru: ['Фасилитация', 'Интервью', 'Переговоры'],
      en: ['Facilitation', 'Interviews', 'Negotiation'],
    },
    Icon: MessagesSquare,
  },
  {
    title: { ru: 'Аналитика', en: 'Analysis' },
    note: { ru: 'Решения на основе нагрузки, сценариев и рисков.', en: 'Decisions based on capacity, scenarios, and risks.' },
    tags: {
      ru: ['Трудоёмкость', 'Финансовые модели', 'Управленческая отчётность'],
      en: ['Effort modelling', 'Financial models', 'Management reporting'],
    },
    Icon: ChartNoAxesCombined,
  },
  {
    title: { ru: 'Управление', en: 'Management' },
    note: { ru: 'Довожу изменения до работающего результата.', en: 'Taking change through to a working result.' },
    tags: {
      ru: ['Кросс-функциональные проекты', 'Подрядчики', 'Изменения'],
      en: ['Cross-functional projects', 'Contractors', 'Change management'],
    },
    Icon: Workflow,
  },
  {
    title: { ru: 'AI', en: 'AI' },
    note: { ru: 'Использую ИИ как рабочий инструмент, а не витрину.', en: 'Using AI as a work tool, not a display case.' },
    tags: {
      ru: ['AI-assisted development', 'Промпт-библиотеки', 'Google Apps Script'],
      en: ['AI-assisted development', 'Prompt libraries', 'Google Apps Script'],
    },
    Icon: Bot,
    featured: true,
  },
  {
    title: { ru: 'Автоматизация', en: 'Automation' },
    note: { ru: 'Убираю ручные действия там, где они не создают ценности.', en: 'Removing manual work where it creates no value.' },
    tags: {
      ru: ['Bitrix24', 'Трекеры', 'Дашборды'],
      en: ['Bitrix24', 'Trackers', 'Dashboards'],
    },
    Icon: Settings2,
  },
]

export function Skills() {
  const { language } = useLanguage()

  return (
    <section id="skills" className="relative z-50 -mt-8 isolate overflow-hidden rounded-t-[3rem] bg-[color-mix(in_oklab,var(--color-muted)_20%,var(--color-background))] py-24 sm:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -left-3 top-12 select-none font-heading text-[10rem] leading-none text-foreground/[0.035] sm:-left-5 sm:top-14 sm:text-[clamp(12rem,25vw,27rem)]">04</span>
      <div className={cn('relative', SECTION_CONTAINER_CLASS)}>
        <FadeIn className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            <span>{language === 'ru' ? 'Навыки, которые ' : 'Skills that '}</span>
            <span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'работают вместе' : 'work together'}</span>
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {language === 'ru'
              ? 'Не список инструментов, а набор способов доводить сложные задачи до понятного результата.'
              : 'Not a tool list, but a set of ways to take complex work to a clear outcome.'}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map(({ title, note, tags, Icon, featured }, index) => (
            <FadeIn key={title.ru} delay={index * 0.06}>
              <article
                className={cn(
                  'group flex min-h-64 flex-col rounded-3xl border p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl',
                  featured
                    ? 'border-primary/50 bg-primary/[0.08] shadow-lg shadow-primary/5 hover:shadow-primary/10'
                    : 'border-border bg-card/70 hover:border-primary/40 hover:shadow-black/10'
                )}
              >
                <div className={cn('flex size-11 items-center justify-center rounded-2xl border', featured ? 'border-primary/30 bg-primary text-primary-foreground' : 'border-primary/30 bg-background text-primary')}>
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-tight text-foreground">{title[language]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note[language]}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {tags[language].map((tag) => (
                    <li key={tag} className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
