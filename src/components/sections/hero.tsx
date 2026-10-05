import { ArrowDown, ArrowUpRight, FileText, Workflow, Code2, UsersRound } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { RESUME_URL } from '@/lib/profile'

export function Hero() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="top" className="hr-hero" aria-labelledby="hero-title">
    <div className="hero-grid-background" aria-hidden="true" />
    <div className="hr-container hero-layout">
      <div className="hero-identity"><p className="hero-position"><span aria-hidden="true" />Project & Operations</p><h1 id="hero-title">{ru ? 'Екатерина' : 'Ekaterina'}<br /><span>{ru ? 'Меламуд' : 'Melamud'}</span></h1></div>
      <div className="hero-portrait"><div className="portrait-field" aria-hidden="true" /><svg className="portrait-system" viewBox="0 0 480 560" aria-hidden="true"><path className="system-route" d="M50 140H145Q175 140 175 170V260Q175 290 205 290H350Q380 290 380 320V410H440"/><path className="system-route route-secondary" d="M420 110H355Q325 110 325 140V420Q325 450 295 450H75"/><circle cx="50" cy="140" r="5"/><circle cx="440" cy="410" r="5"/><circle cx="420" cy="110" r="5"/><circle cx="75" cy="450" r="5"/></svg><img src={`${import.meta.env.BASE_URL}images/ekaterina-hero-shoulders.png`} alt={ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} fetchPriority="high" /><span className="system-icon system-icon-one" aria-hidden="true"><Workflow size={24} /></span><span className="system-icon system-icon-two" aria-hidden="true"><Code2 size={24} /></span><span className="system-icon system-icon-three" aria-hidden="true"><UsersRound size={24} /></span></div>
      <div className="hero-copy"><p className="hero-lead">{ru ? 'Выстраиваю процессы и проектную работу команд. Собираю внутренние инструменты и автоматизирую операционку.' : 'I build processes and organise project delivery. Create internal tools and automate operations.'}</p><p className="hero-description">{ru ? 'Работаю с Agile/Scrum, BPMN, данными и AI. Учусь управлению и каждый день применяю его в реальных проектах.' : 'I work with Agile/Scrum, BPMN, data and AI. I study management and put it into practice every day.'}</p><div className="hr-actions"><a className="hr-button hr-button-primary" href="#work">{ru ? 'Смотреть проекты' : 'View projects'}<ArrowUpRight size={19} aria-hidden="true" /></a><a className="hr-button hr-button-ghost" href={RESUME_URL || '#resume'} target={RESUME_URL ? '_blank' : undefined} rel={RESUME_URL ? 'noreferrer' : undefined}>{ru ? 'Открыть резюме' : 'Open résumé'}<FileText size={18} aria-hidden="true" /></a></div><p className="hero-education">{ru ? 'РАНХиГС · Стратегическое управление компанией' : 'RANEPA · Strategic company management'}<span>Digital & AI minor</span></p></div>
    </div>
    <div className="hr-container hero-bottom"><p><span className="status-dot" />{ru ? 'Открыта к новым ролям и проектам' : 'Open to new roles and projects'}</p><a href="#about">{ru ? 'Знакомство' : 'Meet me'}<ArrowDown size={16} aria-hidden="true" /></a></div>
  </section>
}
