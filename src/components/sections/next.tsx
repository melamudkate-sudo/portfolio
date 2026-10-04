import { ArrowUpRight, FileText, Route, Coffee } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'
import { CONTACTS, RESUME_URL } from '@/lib/profile'

export function Growth() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="growth" className="hr-section" aria-labelledby="growth-title"><Reveal className="hr-container growth-layout"><header><p className="hr-eyebrow">04 / {ru ? 'Следующий шаг' : 'Next step'}</p><h2 id="growth-title">{ru ? 'Куда хочу расти' : 'Where I want to grow'}</h2></header><div className="growth-copy"><p>{ru ? 'Открыта к новым ролям и интересным проектам.' : 'Open to new roles and interesting projects.'}</p><p>{ru ? 'Хочу управлять проектами, работать с командами и улучшать внутренние системы. Мне интересно применять автоматизацию там, где она действительно полезна, и постепенно расти в сторону операционного управления.' : 'I want to manage projects, work with teams and improve internal systems. I’m interested in applying automation where it is useful and gradually growing into broader operational leadership.'}</p></div><div className="growth-directions">{['Project Management', 'Operations', 'Business Operations', 'PMO'].map(role => <span key={role}><Route size={16} aria-hidden="true" />{role}</span>)}</div></Reveal></section>
}

export function Resume() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="resume" className="hr-section hr-resume" aria-labelledby="resume-title"><Reveal className="hr-container resume-layout"><div className="resume-copy"><p className="hr-eyebrow">05 / {ru ? 'Полная картина' : 'The full picture'}</p><h2 id="resume-title">{ru ? 'Резюме' : 'Résumé'}</h2><p className="resume-description">{ru ? 'На сайте — проекты и решения. В резюме — полный опыт, обязанности, образование и навыки.' : 'Here you’ve seen my projects and solutions. My résumé brings together my full experience, responsibilities, education and skills.'}</p><div className="resume-action">{RESUME_URL ? <><a className="hr-button" href={RESUME_URL} target="_blank" rel="noreferrer">{ru ? 'Открыть резюме' : 'Open résumé'}<ArrowUpRight size={19} aria-hidden="true" /></a><span>{ru ? 'PDF · октябрь 2026' : 'PDF · October 2026'}</span></> : <><a className="hr-button" href={CONTACTS.telegram} target="_blank" rel="noreferrer">{ru ? 'Запросить резюме' : 'Request my résumé'}<ArrowUpRight size={19} aria-hidden="true" /></a><span>{ru ? 'PDF скоро появится здесь' : 'The PDF will be available here soon'}</span></>}</div></div><div className="resume-art" aria-hidden="true"><div className="resume-orbit" /><div className="resume-sheet"><div className="resume-sheet-top"><FileText size={24} /><span>CV / 2026</span></div><strong>{ru ? <>Екатерина<br />Меламуд</> : <>Ekaterina<br />Melamud</>}</strong><small>Project & Operations</small><div className="resume-sheet-lines"><i /><i /><i /></div><div className="resume-sheet-row"><span>Experience</span><ArrowUpRight size={16} /></div><div className="resume-sheet-row"><span>Education</span><ArrowUpRight size={16} /></div><div className="resume-sheet-row"><span>Skills</span><ArrowUpRight size={16} /></div></div><span className="resume-art-label">{ru ? 'Продолжим знакомство?' : 'Let’s get to know each other.'}</span></div></Reveal></section>
}

export function Personal() {
  const { language } = useLanguage()
  return <section id="personal" className="hr-section hr-personal" aria-labelledby="personal-title"><Reveal className="hr-container hr-split"><h2 id="personal-title"><span className="section-icon"><Coffee size={22} aria-hidden="true" /></span>{language === 'ru' ? 'Кроме работы' : 'Outside work'}</h2><p>{language === 'ru' ? 'Тестирую новые AI-продукты и инструменты, делаю небольшие digital-проекты и учу итальянский. Люблю разбираться, как устроены продукты и сервисы.' : 'I try new AI products and tools, build small digital projects and learn Italian. I enjoy figuring out how products and services work.'}</p></Reveal></section>
}
