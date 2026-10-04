import { ArrowDown, ArrowRight, FileText } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { RESUME_URL } from '@/lib/profile'

export function Hero() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="top" className="hr-hero" aria-labelledby="hero-title">
    <div className="hr-container hr-hero-grid">
      <div className="hr-hero-copy">
        <p className="hr-eyebrow">Project & Operations <span>· Processes · Automation</span></p>
        <h1 id="hero-title">{ru ? 'Екатерина' : 'Ekaterina'}<br /><span>{ru ? 'Меламуд' : 'Melamud'}</span></h1>
        <p className="hr-hero-description">{ru
          ? 'Выстраиваю процессы, организую проектную работу команд и автоматизирую операционку. Работаю с Agile/Scrum, BPMN, данными, внутренними системами и AI-инструментами.'
          : 'I build processes, organise project delivery across teams and automate day-to-day operations. I work with Agile/Scrum, BPMN, data, internal systems and AI tools.'}</p>
        <p className="hr-hero-context">{ru ? 'РАНХиГС · Стратегическое управление компанией' : 'RANEPA · Strategic company management'}<br />Digital & AI minor</p>
        <div className="hr-actions">
          <a className="hr-button hr-button-primary" href="#work">{ru ? 'Смотреть проекты' : 'View projects'}<ArrowRight size={17} aria-hidden="true" /></a>
          <a className="hr-button" href={RESUME_URL || '#resume'} target={RESUME_URL ? '_blank' : undefined} rel={RESUME_URL ? 'noreferrer' : undefined}>{ru ? 'Открыть резюме' : 'Open résumé'}<FileText size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hr-portrait"><img src={`${import.meta.env.BASE_URL}images/ekaterina-hero-shoulders.png`} alt={ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} fetchPriority="high" /></div>
    </div>
    <a className="hr-scroll hr-container" href="#about"><span>{ru ? 'Обо мне и моей работе' : 'About me and my work'}</span><ArrowDown size={16} aria-hidden="true" /></a>
  </section>
}
