import { motion, useReducedMotion } from 'framer-motion'
import { CircuitBoard, GraduationCap, UsersRound } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { SECTION_CONTAINER_CLASS } from '@/lib/utils'
import './education.css'

export function Education() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const reduced = useReducedMotion()
  const reveal = {
    initial: reduced ? false as const : { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduced ? 0 : 0.35 },
  }

  return (
    <section id="education" className="education-section" aria-labelledby="education-title">
      <div className={SECTION_CONTAINER_CLASS}>
        <motion.header className="education-heading" {...reveal}>
          <p className="education-eyebrow">{ru ? 'ОБРАЗОВАНИЕ И ПРОФЕССИОНАЛЬНОЕ РАЗВИТИЕ' : 'EDUCATION AND PROFESSIONAL DEVELOPMENT'}</p>
          <h2 id="education-title">{ru ? 'Образование' : 'Education'}<span aria-hidden="true">.</span></h2>
        </motion.header>

        <motion.div className="education-study" {...reveal}>
          <article className="education-primary" aria-labelledby="education-primary-title">
            <div className="education-module-label">
              <span className="education-icon" aria-hidden="true"><GraduationCap size={25} strokeWidth={1.4} /></span>
              <p className="education-eyebrow">01 / {ru ? 'ОСНОВНОЕ ОБРАЗОВАНИЕ' : 'MAIN PROGRAMME'}</p>
            </div>
            <div className="education-institution">
              <p>{ru ? 'РАНХиГС' : 'RANEPA'}</p>
              <span>{ru ? 'Бакалавриат' : 'Bachelor’s programme'}</span>
            </div>
            <h3 id="education-primary-title">{ru ? 'Стратегическое управление компанией' : 'Strategic company management'}</h3>
            <p className="education-topics">{ru ? 'Стратегия · управление · бизнес-процессы · аналитика' : 'Strategy · management · business processes · analytics'}</p>
          </article>

          <article className="education-minor" aria-labelledby="education-minor-title">
            <div className="education-module-label">
              <CircuitBoard size={23} strokeWidth={1.4} aria-hidden="true" />
              <p className="education-eyebrow">02 / {ru ? 'МАЙНОР' : 'MINOR'}</p>
            </div>
            <h3 id="education-minor-title">{ru
              ? 'Цифровизация и инструменты искусственного интеллекта в управлении компанией'
              : 'Digitalisation and artificial intelligence tools in company management'}</h3>
            <p className="education-topics">{ru
              ? 'Цифровизация бизнес-процессов · применение ИИ в управлении · автоматизация'
              : 'Business process digitalisation · AI in management · automation'}</p>
          </article>
        </motion.div>

        <motion.article className="education-community" aria-labelledby="education-community-title" {...reveal}>
          <UsersRound size={23} strokeWidth={1.4} aria-hidden="true" />
          <div className="education-community-heading">
            <p className="education-eyebrow">03 / {ru ? 'ПРОФЕССИОНАЛЬНАЯ АКТИВНОСТЬ' : 'PROFESSIONAL ENGAGEMENT'}</p>
            <h3 id="education-community-title">{ru ? 'Профильные мероприятия и нетворкинг' : 'Industry events and networking'}</h3>
          </div>
          <p className="education-community-copy">{ru
            ? 'Посещаю профильные мероприятия, митапы и конференции по управлению проектами, продуктами и операционными процессами, развиваю профессиональные связи и слежу за практиками рынка.'
            : 'I attend industry events, meetups and conferences on project, product and operations management, build professional connections and keep up with industry practices.'}</p>
        </motion.article>
      </div>
    </section>
  )
}
