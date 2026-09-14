import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Database, ListChecks, Scale } from 'lucide-react'
import { useScrollReveal } from '@/components/motion/fade-in'
import { useLanguage } from '@/hooks/use-language'

/** A single reading sequence, played once when the diagram enters view. */
export function DecisionModel() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const [ref, revealed] = useScrollReveal<HTMLDivElement>()
  const ru = language === 'ru'
  const stages = [
    { Icon: Database, title: ru ? 'Данные' : 'Data', note: ru ? 'Исследование и вводные' : 'Research and inputs' },
    { Icon: Scale, title: ru ? 'Модель' : 'Model', note: ru ? 'Факторы · логика · сценарии' : 'Factors · logic · scenarios' },
    { Icon: ListChecks, title: ru ? 'Решение' : 'Decision', note: ru ? 'Требования и реализация' : 'Requirements and implementation' },
  ]
  const visible = reduced || revealed

  return (
    <div ref={ref} className="expertise-model" aria-label={ru ? 'От данных через модель к решению' : 'From data through a model to a decision'}>
      {stages.flatMap(({ Icon, title, note }, index) => [
        ...(index ? [
          <motion.span
            key={`link-${index}`}
            className="expertise-model-arrow"
            aria-hidden="true"
            initial={false}
            animate={{ opacity: visible ? 0.65 : 0 }}
            transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : index * 0.16 }}
          >
            <ArrowDown size={20} />
          </motion.span>,
        ] : []),
        <motion.div
          key={index}
          className={index === 1 ? 'expertise-model-core' : undefined}
          initial={false}
          animate={{ opacity: visible ? 1 : 0.25, y: visible ? 0 : 5 }}
          transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.16 }}
        >
          <Icon size={index === 1 ? 27 : 22} aria-hidden="true" />
          <span>{title}</span>
          <small>{note}</small>
        </motion.div>,
      ])}
    </div>
  )
}
