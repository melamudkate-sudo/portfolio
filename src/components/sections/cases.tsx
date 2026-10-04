import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, FolderTree, Globe2, Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'
import { CASES, CASE_PRESENTATION, DELIVERABLE_LABELS } from './cases/data'
import { AutomationEvidence, LaunchEvidence, ProductionEvidence, ScrumEvidence } from './cases/evidence'

const EVIDENCE = [ScrumEvidence, ProductionEvidence, AutomationEvidence, LaunchEvidence]

function WorkVisual({ children, index, ru }: { children: ReactNode; index: number; ru: boolean }) {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 560px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return <div className={`case-visual ${open ? 'visual-open' : ''}`}>
    <button type="button" className="visual-toggle" aria-expanded={!mobile || open} aria-controls={`work-visual-${index}`} onClick={() => setOpen(!open)}><span>{ru ? 'Схема и интерфейс' : 'Workflow & interface'}</span><Plus size={18} aria-hidden="true" /></button>
    <div id={`work-visual-${index}`} className="visual-content"><div className="visual-label"><span>{ru ? 'Как устроена работа' : 'How the work is organised'}</span><span>0{index + 1} / 04</span></div>{children}</div>
  </div>
}

function Outcome({ text }: { text: string }) {
  const parts = text.split(/(около 150 задач|around 150 tasks|20\+ товарных позиций|20\+ product items|около 10 моделей|around 10 models|аналитиками и IT|analysts and IT)/gi)
  return <p>{parts.map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part)}</p>
}

export function Cases() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="work" className="hr-section hr-work" aria-labelledby="cases-title"><div className="hr-container">
    <Reveal className="work-header"><div><p className="hr-eyebrow">02 / {ru ? 'Опыт в действии' : 'Experience in action'}</p><h2 id="cases-title">{ru ? 'Избранные проекты' : 'Selected projects'}</h2></div><div className="work-intro"><p>{ru ? 'Избранные проекты в DEMIAND: что я организовала, спроектировала и довела до работающего решения.' : 'Selected projects at DEMIAND: what I organised, designed and turned into working solutions.'}</p><span>{ru ? 'До 6 крупных проектов параллельно' : 'Up to 6 major projects in parallel'}<ArrowDown size={17} aria-hidden="true" /></span></div></Reveal>
    <nav className="case-index" aria-label={ru ? 'Избранные проекты' : 'Selected projects'}>{CASES.map((item, i) => <a href={`#case-${item.id}`} key={item.id}><small>0{i + 1}</small>{item.category.split(' / ')[0]}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav>
    <div className="case-list">{CASES.map((item, i) => {
      const Evidence = EVIDENCE[i]
      const presentation = CASE_PRESENTATION[i]
      return <Reveal key={item.id}><article id={`case-${item.id}`} className="project-case" aria-labelledby={`case-title-${item.id}`}>
        <div className="case-meta"><span className="case-number">0{i + 1}</span><p>{item.category}</p><span className="case-company">DEMIAND</span></div>
        <div className="case-overview"><div className="case-editorial"><h3 id={`case-title-${item.id}`}>{item.title[language]}</h3><p className="case-lead">{presentation.intro[language]}</p><div className="case-outcome"><span className="copy-label">{ru ? 'Результат и масштаб' : 'Outcome & scope'}</span><Outcome text={presentation.outcome[language]} /></div><div className="case-metrics">{presentation.metrics.map(metric => <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label[language]}</span></div>)}</div></div>
        <WorkVisual index={i} ru={ru}><figure className="hr-evidence"><Evidence language={language} /><figcaption className="sr-only">{ru ? 'Реконструкция для портфолио · обезличенные тестовые данные' : 'Portfolio reconstruction · anonymised test data'}</figcaption></figure></WorkVisual></div>
        <details className="case-details"><summary><span>{ru ? 'Подробнее о моей роли' : 'More about my role'}</span><Plus size={20} aria-hidden="true" /></summary><div className="case-details-body"><div className="case-context"><span className="copy-label">{ru ? 'Задача' : 'Challenge'}</span><p>{item.context[language]}</p><span className="copy-label">{ru ? 'Моя роль' : 'My role'}</span><p>{item.role[language]}</p></div><ol className="case-deliverables">{item.changes.map((change, index) => <li key={change.en}><span>0{index + 1}</span><div><h4>{DELIVERABLE_LABELS[i][index][language]}</h4><p>{change[language]}</p></div></li>)}</ol><div className="case-full-result"><span className="copy-label">{ru ? 'Результат и масштаб' : 'Outcome & scope'}</span><p>{item.result[language]}</p></div></div></details>
        {i === 1 && <details className="case-details production-decision"><summary><span><BriefcaseBusiness size={18} aria-hidden="true" />{ru ? 'Отдельное решение: экономика видеопроизводства' : 'A related decision: video production economics'}</span><Plus size={20} aria-hidden="true" /></summary><div className="decision-content"><p>{ru ? 'При росте объёма видео сравнила подрядную и внутреннюю модели: затраты, мощность, ресурсы, качество, правки и зависимость от подрядчиков. Подготовила ресурсную модель, требования к инфраструктуре и варианты запуска. Руководство перешло к проработке модели и подготовке инфраструктуры.' : 'As video volume grew, I compared outsourced and in-house models: costs, capacity, resources, quality, revisions and contractor dependency. Prepared a resource model, infrastructure requirements and launch options. Management moved on to developing the model and preparing infrastructure.'}</p><dl><div><dt>5,4 {ru ? 'млн ₽' : 'M RUB'}</dt><dd>{ru ? 'внешний пул затрат' : 'external cost pool'}</dd></div><div><dt>1,7 {ru ? 'млн ₽' : 'M RUB'}</dt><dd>{ru ? 'разработанная модель' : 'proposed model'}</dd></div><div><dt>{ru ? 'до −69%' : 'up to −69%'}</dt><dd>{ru ? 'потенциальное снижение затрат' : 'potential cost reduction'}</dd></div></dl><p className="decision-note">{ru ? 'Расчётный эффект модели. Сравнила 7 вариантов площадок.' : 'Projected model impact. Compared 7 potential locations.'}</p></div></details>}
        <ul className="hr-tags" aria-label={ru ? 'Инструменты и подходы проекта' : 'Project tools and approaches'}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </article></Reveal>
    })}</div>
    <div id="additional" className="additional-work"><header><p className="hr-eyebrow">{ru ? 'Ещё часть моего опыта' : 'More of my experience'}</p><h3>{ru ? 'За пределами одной команды' : 'Beyond a single team'}</h3></header><div className="additional-grid">
      <article><div className="additional-icon"><BriefcaseBusiness size={24} aria-hidden="true" /><span>01</span></div><h4>{ru ? 'Тендер на 20+ компаний' : 'A tender with 20+ companies'}</h4><p>{ru ? 'Сформировала пул, подготовила требования, собирала КП и участвовала в переговорах. Организовала тестовые работы и сравнение для принятия решения.' : 'Built the company pool and requirements, collected proposals and participated in negotiations. Organised test projects and comparisons to support the decision.'}</p><span className="additional-note">{ru ? 'Требования → переговоры → оценка' : 'Requirements → negotiation → evaluation'}</span></article>
      <article><div className="additional-icon"><FolderTree size={24} aria-hidden="true" /><span>02</span></div><h4>{ru ? 'Внутреннее хранилище' : 'Internal storage architecture'}</h4><p>{ru ? 'Спроектировала структуру, именование, ответственность и доступы с сохранением рабочих ссылок. Подготовила правила загрузки, передачи и архивации материалов.' : 'Designed the structure, naming conventions, ownership and access, preserving working links. Wrote rules for uploading, handing off and archiving assets.'}</p><span className="additional-note">{ru ? 'Меньше дублей. Понятные правила.' : 'Fewer duplicates. Clear working rules.'}</span></article>
      <article><div className="additional-icon"><Globe2 size={24} aria-hidden="true" /><span>03</span></div><h4>{ru ? 'Сайт для иностранных дилеров' : 'A website for international dealers'}</h4><p>{ru ? 'Собрала информацию для будущих партнёров, написала и согласовала содержание. Сама разработала страницу и участвовала в публикации на зарубежных серверах.' : 'Collected information for prospective partners, wrote and approved the content. Built the page myself and helped publish it on international servers.'}</p><span className="additional-note">{ru ? 'От содержания до публикации' : 'From content to publication'}</span></article>
    </div><p className="contractor-note">{ru ? 'В работе с внешними командами — до 8 подрядчиков одновременно: от требований и ТЗ до правок, сроков и передачи результата.' : 'Working with up to 8 contractors at once: from requirements and briefs to revisions, deadlines and handoff.'}</p></div>
  </div></section>
}
