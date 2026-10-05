import { ArrowDown, ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { RESUME_URL } from '@/lib/profile'

export function Hero() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="top" className="hr-hero" aria-labelledby="hero-title">
    <div className="hero-grid-background" aria-hidden="true" />
    <div className="hr-container hero-layout">
      <div className="hero-identity"><p className="hero-position"><span aria-hidden="true" />Project & Operations</p><h1 id="hero-title">{ru ? 'Екатерина' : 'Ekaterina'}<br /><span>{ru ? 'Меламуд' : 'Melamud'}</span></h1></div>
      <div className="hero-portrait"><figure className="portrait-polaroid"><img src={`${import.meta.env.BASE_URL}images/ekaterina-portrait.webp`} alt={ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} width="1122" height="1402" fetchPriority="high" /><figcaption>{ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'}<span aria-hidden="true">↗</span></figcaption></figure><span className="portrait-spark" aria-hidden="true"><Sparkles size={22} /></span></div>
      <div className="hero-copy"><p className="hero-lead">{ru ? 'Выстраиваю процессы и проектную работу команд. Собираю внутренние инструменты и автоматизирую операционку.' : 'I build processes and organise project delivery. Create internal tools and automate operations.'}</p><p className="hero-description">{ru ? 'Работаю с Agile/Scrum, BPMN, данными и AI. Учусь управлению и каждый день применяю его в реальных проектах.' : 'I work with Agile/Scrum, BPMN, data and AI. I study management and put it into practice every day.'}</p><div className="hr-actions"><a className="hr-button hr-button-primary" href="#work">{ru ? 'Смотреть проекты' : 'View projects'}<ArrowUpRight size={19} aria-hidden="true" /></a><a className="hr-button hr-button-ghost" href={RESUME_URL || '#resume'} target={RESUME_URL ? '_blank' : undefined} rel={RESUME_URL ? 'noreferrer' : undefined}>{ru ? 'Открыть резюме' : 'Open résumé'}<FileText size={18} aria-hidden="true" /></a></div><div className="hero-education" aria-label={ru ? 'Образование' : 'Education'}><span>{ru ? 'РАНХиГС' : 'RANEPA'}</span><span>{ru ? 'Институт управления' : 'Institute of Management'}</span></div></div>
    </div>
    <div className="hr-container hero-bottom"><p><span className="status-dot" />{ru ? 'Открыта к новым ролям и проектам' : 'Open to new roles and projects'}</p><a href="#about">{ru ? 'Знакомство' : 'Meet me'}<ArrowDown size={16} aria-hidden="true" /></a></div>
  </section>
}
