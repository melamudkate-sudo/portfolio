import { ArrowUpRight, FileText, Route, Sparkles, Braces, Languages, Compass } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'
import { RESUME_URL } from '@/lib/profile'
import { trackLinkGoal } from '@/lib/metrika'

export function Growth() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="growth" className="hr-section" aria-labelledby="growth-title"><Reveal className="hr-container growth-layout"><header><Compass className="growth-symbol" size={44} aria-hidden="true" /><h2 className="section-title" id="growth-title">{ru ? 'Куда хочу расти' : 'Where I want to grow'}</h2></header><div className="growth-copy"><p>{ru ? 'Открыта к новым ролям и интересным проектам.' : 'Open to new roles and interesting projects.'}</p><p>{ru ? 'Хочу управлять проектами, работать с командами и улучшать внутренние системы. Мне интересно применять автоматизацию там, где она действительно полезна, и постепенно расти в сторону операционного управления.' : 'I want to manage projects, work with teams and improve internal systems. I’m interested in applying automation where it is useful and gradually growing into broader operational leadership.'}</p></div><div className="growth-directions">{['Project Management', 'Operations', 'Business Operations', 'PMO'].map(role => <span key={role}><Route size={16} aria-hidden="true" />{role}</span>)}</div></Reveal></section>
}

export function Resume() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="resume" className="hr-section hr-resume" aria-labelledby="resume-title"><Reveal className="hr-container resume-layout"><div className="resume-copy"><h2 className="section-title" id="resume-title">{ru ? 'Резюме' : 'Résumé'}</h2><p className="resume-description">{ru ? 'На сайте — проекты и решения. В резюме — полный опыт, обязанности, образование и навыки.' : 'Here you’ve seen my projects and solutions. My résumé brings together my full experience, responsibilities, education and skills.'}</p><div className="resume-action">{RESUME_URL ? <><a className="hr-button" href={RESUME_URL} download="Ekaterina-Melamud-Resume.pdf" onClick={event => trackLinkGoal(event, 'resume_download')}>{ru ? 'Скачать резюме' : 'Download résumé'}<ArrowUpRight size={19} aria-hidden="true" /></a><span>{ru ? 'PDF · октябрь 2026' : 'PDF · October 2026'}</span></> : <><button className="hr-button" type="button" disabled>{ru ? 'Скачать резюме' : 'Download résumé'}<ArrowUpRight size={19} aria-hidden="true" /></button><span>{ru ? 'PDF скоро появится здесь' : 'The PDF will be available here soon'}</span></>}</div></div><div className="resume-art" aria-hidden="true"><div className="resume-orbit" /><div className="resume-sheet-back sheet-back-one" /><div className="resume-sheet-back sheet-back-two" /><div className="resume-sheet"><div className="resume-sheet-top"><FileText size={24} /><span>CV / 2026</span></div><strong>{ru ? <>Екатерина<br />Меламуд</> : <>Ekaterina<br />Melamud</>}</strong><small>Project & Operations</small><div className="resume-sheet-lines"><i /><i /><i /></div><div className="resume-sheet-row"><span>Experience</span><ArrowUpRight size={16} /></div><div className="resume-sheet-row"><span>Education</span><ArrowUpRight size={16} /></div><div className="resume-sheet-row"><span>Skills</span><ArrowUpRight size={16} /></div></div></div></Reveal></section>
}

export function Personal() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const notes = [
    { Icon: Sparkles, ru: 'Пробую новые AI-продукты', en: 'Trying new AI products', className: 'note-ai' },
    { Icon: Braces, ru: 'Делаю свои digital-проекты', en: 'Building personal digital projects', className: 'note-digital' },
    { Icon: Languages, ru: 'Учу три языка', en: 'Learning three languages', className: 'note-languages' },
  ]
  return <section id="personal" className="hr-section hr-personal" aria-labelledby="personal-title">
    <svg className="personal-doodle" viewBox="0 0 180 100" fill="none" aria-hidden="true"><path d="M8 66C42 5 112 2 113 39C114 76 49 88 46 57C43 23 142 22 166 62M153 49L168 63L148 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M143 7L147 18L159 21L148 26L145 39L140 27L127 24L139 19Z" fill="currentColor" stroke="none"/></svg>
    <Reveal className="hr-container personal-layout">
      <h2 className="section-title" id="personal-title">{ru ? 'В свободное время' : 'In my free time'}</h2>
      <div className="personal-notes">
        {notes.map(({ Icon, className, ...note }) => <div className={`personal-note ${className}`} key={className}>
          <Icon size={28} aria-hidden="true" />
          {className === 'note-languages' && <div className="language-greetings" aria-label={ru ? 'Иврит, итальянский, английский' : 'Hebrew, Italian, English'}>
            <span lang="he" dir="rtl">שלום</span><span lang="it">ciao</span><span lang="en">hello</span>
          </div>}
          <span>{note[language]}</span>
        </div>)}
      </div>
    </Reveal>
  </section>
}
