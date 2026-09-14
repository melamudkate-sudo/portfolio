import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { SECTION_CONTAINER_CLASS } from '@/lib/utils'
import './about.css'

export function About() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const reduced = useReducedMotion()
  const reveal = {
    initial: reduced ? false as const : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.45 },
  }

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className={SECTION_CONTAINER_CLASS}>
        <motion.div className="about-introduction" {...reveal}>
          <div className="about-personal">
            <p className="about-eyebrow">01 / {ru ? 'ОБО МНЕ' : 'ABOUT ME'}</p>
            <h2 id="about-title">
              {ru ? 'Рада знакомству,' : 'Nice to meet you,'}<br />
              {ru ? 'меня зовут ' : 'I’m '}
              <span className="about-name">{ru ? 'Екатерина' : 'Ekaterina'}.</span>
            </h2>
          </div>
          <div className="about-story">
            <p className="about-main-copy">{ru
              ? 'Я работаю на пересечении проектного управления, операционных процессов и продукта. Больше всего люблю задачи, где сначала много разрозненных вводных, участников и ограничений, а на выходе должна появиться '
              : 'I work at the intersection of project management, operations and product. I especially enjoy challenges that start with scattered inputs, people and constraints, and call for '}
              <span>{ru ? 'понятная работающая система.' : 'a clear, working system.'}</span>
            </p>
            <p className="about-personal-note">{ru
              ? 'Вне рабочих задач люблю делать небольшие приложения для повседневной жизни — и продумывать, как они выглядят.'
              : 'Outside work, I enjoy making small apps for everyday life — and thinking through how they look.'}</p>
          </div>
        </motion.div>
        <motion.div className="about-footer" {...reveal}>
          <ul className="about-markers" aria-label={ru ? 'Область интересов' : 'Areas of interest'}>
            {(ru ? ['Проекты', 'Процессы', 'Аналитика', 'Автоматизация'] : ['Projects', 'Processes', 'Analytics', 'Automation']).map(marker => <li key={marker}>{marker}</li>)}
          </ul>
          <a
            className="about-cases-cue"
            href="#work"
            aria-label={ru ? 'Перейти к моим кейсам' : 'Go to my cases'}
          >
            <span>{ru ? 'Мои кейсы' : 'My cases'}</span>
            <svg viewBox="0 0 34 42" aria-hidden="true">
              <path d="M8 3c0 9.8 2.5 14.8 8.7 15.1 5.9.3 8.7-4 8.8-9.6" />
              <path d="M17 18.1v18.2M10.5 29.8 17 36.5l6.5-6.7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
