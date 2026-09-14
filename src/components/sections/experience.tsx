import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FolderTree, Route, Scale, Users } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { SECTION_CONTAINER_CLASS } from '@/lib/utils'
import './experience.css'

const PREPARATION = [
  {
    Icon: Scale,
    title: { ru: 'Бизнес-модель запуска', en: 'Launch business model' },
    text: {
      ru: 'Модель с минимальными постоянными затратами и подключением необходимых специалистов под фактический объём работ.',
      en: 'A model with minimal fixed costs, bringing in the specialists needed for the actual workload.',
    },
  },
  {
    Icon: Route,
    title: { ru: 'Операционная структура', en: 'Operating structure' },
    text: {
      ru: 'Roadmap, процессы, регламенты и внутренняя документация.',
      en: 'Roadmap, processes, procedures and internal documentation.',
    },
  },
  {
    Icon: Users,
    title: { ru: 'Формирование команды', en: 'Team formation' },
    text: {
      ru: 'Поиск кандидатов, первичные собеседования и участие в подборе команды.',
      en: 'Candidate sourcing, initial interviews and participation in team selection.',
    },
  },
  {
    Icon: FolderTree,
    title: { ru: 'Инфраструктура запуска', en: 'Launch infrastructure' },
    text: {
      ru: 'Реестр специалистов и партнёров и структура дальнейшего взаимодействия.',
      en: 'A directory of specialists and partners, and a structure for ongoing collaboration.',
    },
  },
] as const

export function Experience() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const reduced = useReducedMotion()
  const reveal = {
    initial: reduced ? false as const : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduced ? 0 : 0.45 },
  }

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className={SECTION_CONTAINER_CLASS}>
        <motion.header className="experience-heading" {...reveal}>
          <div>
            <p className="experience-eyebrow">04 / {ru ? 'ПРОФЕССИОНАЛЬНАЯ ТРАЕКТОРИЯ' : 'PROFESSIONAL PATH'}</p>
            <h2 id="experience-title">{ru ? 'Опыт' : 'Experience'}<span aria-hidden="true">.</span></h2>
          </div>
          <p className="experience-path" aria-label={ru ? 'RAVENSOFT: подготовка запуска. DEMIAND: развитие работающей системы.' : 'RAVENSOFT: launch preparation. DEMIAND: developing established operations.'}>
            <span><small>RAVENSOFT</small>BUILD</span>
            <ArrowRight size={24} strokeWidth={1.3} aria-hidden="true" />
            <span className="experience-path-current"><small>DEMIAND</small>SCALE</span>
          </p>
        </motion.header>

        <motion.article className="experience-demiand" aria-labelledby="demiand-title" {...reveal}>
          <div className="experience-demiand-identity">
            <p className="experience-eyebrow">{ru ? 'РАЗВИТИЕ РАБОТАЮЩЕЙ СИСТЕМЫ' : 'DEVELOPING ESTABLISHED OPERATIONS'}</p>
            <h3 id="demiand-title">DEMIAND</h3>
            <p className="experience-role">{ru ? 'Бизнес-ассистент отдела креаторов' : 'Business Assistant, Creators Department'}</p>
            <p className="experience-focus">{ru ? 'Фокус: управление проектами и операционными процессами' : 'Focus: project and operations management'}</p>
          </div>
          <div className="experience-demiand-context">
            <p>{ru
              ? 'Координирую проекты на стыке продукта, контента, дизайна и производства. Управляю сроками, зависимостями и загрузкой, проектирую процессы и автоматизации, участвую в продуктовых и коммерческих инициативах.'
              : 'I coordinate projects across product, content, design and production. I manage timelines, dependencies and workload, design processes and automations, and contribute to product and commercial initiatives.'}</p>
          </div>
        </motion.article>

        <motion.article className="experience-ravensoft" aria-labelledby="ravensoft-title" {...reveal}>
          <div className="experience-ravensoft-context">
            <p className="experience-eyebrow">{ru ? 'ПОДГОТОВКА ЗАПУСКА' : 'PREPARING FOR LAUNCH'}</p>
            <div className="experience-ravensoft-name"><h3 id="ravensoft-title">RAVENSOFT</h3><span>{ru ? '6 месяцев' : '6 months'}</span></div>
            <p className="experience-role">{ru
              ? 'Проектная работа — развитие и операционная подготовка early-stage стартапа'
              : 'Project engagement — development and operational preparation of an early-stage startup'}</p>
            <p className="experience-ravensoft-summary">{ru
              ? 'Подключилась к проекту на ранней стадии и взяла на себя значительную часть операционной подготовки запуска: участвовала в разработке бизнес-модели, проектировала базовую структуру работы и процессы, участвовала в формировании команды и подготовке инфраструктуры проекта.'
              : 'I joined the project at an early stage and took on a substantial part of its operational launch preparation: contributing to the business model, designing the basic operating structure and processes, and helping build the team and prepare the project infrastructure.'}</p>
          </div>
          <ul className="experience-preparation" aria-label={ru ? 'Направления работы в RAVENSOFT' : 'Areas of work at RAVENSOFT'}>
            {PREPARATION.map(({ Icon, title, text }) => (
              <li key={title.en}>
                <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
                <h4>{title[language]}</h4>
                <p>{text[language]}</p>
              </li>
            ))}
          </ul>
          <p className="experience-project-outcome">{ru
            ? 'Проект был подготовлен к следующей стадии запуска, однако дальнейшая реализация была остановлена после отмены запланированного финансирования.'
            : 'The project was prepared for the next launch stage, but further implementation stopped after the planned funding was cancelled.'}</p>
        </motion.article>
      </div>
    </section>
  )
}
