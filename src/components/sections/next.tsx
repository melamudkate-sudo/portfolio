import { ArrowUpRight, FileText } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { CONTACTS, RESUME_URL } from '@/lib/profile'

export function Growth() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="growth" className="hr-section" aria-labelledby="growth-title"><div className="hr-container hr-split"><header><p className="hr-eyebrow">04 / {ru ? 'Следующий шаг' : 'Next step'}</p><h2 id="growth-title">{ru ? 'Куда хочу расти' : 'Where I want to grow'}</h2></header><div className="hr-prose"><p>{ru ? 'Сейчас я хочу дальше развиваться в project и operations management.' : 'I want to continue growing in project and operations management.'}</p><p>{ru ? 'Мне интересны роли, где нужно управлять несколькими проектами и участниками, строить процессы, работать с командами, улучшать внутренние системы и использовать автоматизацию там, где она реально помогает бизнесу.' : 'I am interested in roles that involve managing several projects and contributors, building processes, working with teams, improving internal systems and using automation where it makes a practical difference to the business.'}</p><ul className="hr-tags"><li>Project Management</li><li>Operations</li><li>Business Operations</li><li>PMO</li></ul><p className="hr-small-copy">{ru ? 'В перспективе мне интересен рост в сторону операционного управления.' : 'Over time, I would like to grow into broader operational leadership.'}</p></div></div></section>
}

export function Resume() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="resume" className="hr-section hr-resume" aria-labelledby="resume-title"><div className="hr-container"><div className="hr-resume-panel"><div><p className="hr-eyebrow">05 / {ru ? 'Полный опыт' : 'Full experience'}</p><h2 id="resume-title">{ru ? 'Резюме' : 'Résumé'}</h2><p>{ru ? 'На сайте — самые показательные проекты и примеры моей работы. В резюме — полный опыт, обязанности, образование и навыки.' : 'This site highlights my most representative projects and work samples. My résumé covers my full experience, responsibilities, education and skills.'}</p></div><div className="hr-resume-action">{RESUME_URL ? <><a className="hr-button hr-button-primary" href={RESUME_URL} target="_blank" rel="noreferrer">{ru ? 'Открыть резюме' : 'Open résumé'}<FileText size={17} aria-hidden="true" /></a><small>{ru ? 'PDF · актуально на октябрь 2026' : 'PDF · updated October 2026'}</small></> : <><p className="hr-resume-status">{ru ? 'PDF будет добавлен позже' : 'PDF will be added soon'}</p><a className="hr-button" href={CONTACTS.telegram} target="_blank" rel="noreferrer">{ru ? 'Написать мне' : 'Message me'}<ArrowUpRight size={17} aria-hidden="true" /></a></>}</div></div></div></section>
}

export function Personal() {
  const { language } = useLanguage()
  return <section id="personal" className="hr-section hr-personal" aria-labelledby="personal-title"><div className="hr-container hr-split"><h2 id="personal-title">{language === 'ru' ? 'Кроме работы' : 'Outside work'}</h2><p>{language === 'ru' ? 'Тестирую новые AI-продукты и инструменты, делаю небольшие digital-проекты и учу итальянский. Люблю разбираться, как устроены продукты и сервисы.' : 'I try new AI products and tools, build small digital projects and learn Italian. I enjoy figuring out how products and services work.'}</p></div></section>
}
