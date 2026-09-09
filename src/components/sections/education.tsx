import { GraduationCap, LineChart } from 'lucide-react'

import { FadeIn } from '@/components/motion/fade-in'
import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

const EDUCATION = [
  {
    title: { ru: 'Стратегическое управление компанией', en: 'Strategic company management' },
    institution: { ru: 'РАНХиГС при Президенте РФ', en: 'RANEPA' },
    status: { ru: 'Обучение продолжается', en: 'In progress' },
    Icon: GraduationCap,
  },
  {
    title: { ru: 'Продуктовый аналитик', en: 'Product analytics' },
    institution: { ru: 'Яндекс Практикум', en: 'Yandex Practicum' },
    status: { ru: 'Обучение продолжается', en: 'In progress' },
    Icon: LineChart,
  },
] as const

export function Education() {
  const { language } = useLanguage()

  return (
    <section className="relative z-[70] -mt-8 isolate overflow-hidden rounded-t-[3rem] bg-[color-mix(in_oklab,var(--color-muted)_20%,var(--color-background))] py-24 sm:py-32">
      <div className={cn('relative', SECTION_CONTAINER_CLASS)}>
        <FadeIn className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/50">{language === 'ru' ? 'Обучение' : 'Learning'}</p>
          <h2 className="mt-4 text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            <span>{language === 'ru' ? 'Продолжаю ' : 'Always '}</span>
            <span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'учиться' : 'learning'}</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'ru' ? 'Углубляю стратегическое и продуктово-аналитическое мышление параллельно с операционной практикой.' : 'Building strategic and product-analytics thinking alongside operational practice.'}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {EDUCATION.map(({ title, institution, status, Icon }, index) => (
            <FadeIn key={title.ru} delay={index * 0.1}>
              <article className="flex min-h-64 flex-col rounded-3xl border border-border bg-card p-7 shadow-sm shadow-black/10">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-tight text-foreground">{title[language]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{institution[language]}</p>
                <p className="mt-auto pt-8 text-xs font-medium uppercase tracking-[0.14em] text-primary">{status[language]}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
