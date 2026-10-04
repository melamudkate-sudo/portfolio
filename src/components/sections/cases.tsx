import { useLanguage } from '@/hooks/use-language'
import { CASES } from './cases/data'
import { AutomationEvidence, LaunchEvidence, ProductionEvidence, ScrumEvidence } from './cases/evidence'

const EVIDENCE = [ScrumEvidence, ProductionEvidence, AutomationEvidence, LaunchEvidence]

export function Cases() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="work" className="hr-section hr-work" aria-labelledby="cases-title"><div className="hr-container">
    <header className="hr-section-header"><p className="hr-eyebrow">02 / {ru ? 'Практика' : 'In practice'}</p><h2 id="cases-title">{ru ? 'Избранные проекты' : 'Selected projects'}</h2><p>{ru ? 'Четыре стороны моей работы: организация команды, производство, внутренние инструменты и процессы запуска.' : 'Four sides of my work: team operations, production, internal tools and launch processes.'}</p></header>
    <div className="hr-case-index">{CASES.map((item, i) => <a href={`#case-${item.id}`} key={item.id}><span>0{i + 1}</span>{item.category.split(' / ')[0]}</a>)}</div>
    {CASES.map((item, i) => {
      const Evidence = EVIDENCE[i]
      return <article id={`case-${item.id}`} className={`hr-case ${i === 0 ? 'hr-case-featured' : ''}`} key={item.id} aria-labelledby={`case-title-${item.id}`}>
        <div className="hr-case-heading"><span className="hr-case-number">0{i + 1}</span><div><p className="hr-eyebrow">{item.category}</p><h3 id={`case-title-${item.id}`}>{item.title[language]}</h3></div></div>
        <div className="hr-case-grid"><div className="hr-case-copy"><p>{item.context[language]}</p><div className="hr-case-role"><h4>{ru ? 'Моя роль' : 'My role'}</h4><p>{item.role[language]}</p></div><h4>{ru ? 'Что построила / изменила' : 'What I built / changed'}</h4><ul>{item.changes.map(change => <li key={change.en}>{change[language]}</li>)}</ul></div><figure className="hr-evidence"><Evidence language={language} /><figcaption>{ru ? 'Реконструкция для портфолио · обезличенные тестовые данные' : 'Portfolio reconstruction · anonymised test data'}</figcaption></figure></div>
        <div className="hr-case-result"><h4>{ru ? 'Результат / масштаб' : 'Outcome / scope'}</h4><p>{item.result[language]}</p></div><ul className="hr-tags" aria-label={ru ? 'Инструменты и подходы проекта' : 'Project tools and approaches'}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </article>
    })}
  </div></section>
}
