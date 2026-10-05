import { ArrowUpRight, BriefcaseBusiness, FolderTree, Globe2, Plus, Workflow, CalendarDays, ChartNoAxesCombined, WandSparkles, Gauge, Languages } from 'lucide-react'
import { SwipeRail } from '@/components/ui/swipe-rail'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'
import { useGoalView } from '@/hooks/use-goal-view'
import { trackGoal, type Goal } from '@/lib/metrika'
import { CASES, MORE_PROJECTS } from './cases/data'
import { ProjectSystemVisual, VideoEconomicsVisual, TenderVisual, ERPCalendarVisual } from './cases/evidence'
import './cases/cases.css'

const CASE_ICONS = [Workflow, ChartNoAxesCombined, BriefcaseBusiness, CalendarDays]
const VISUALS = [ProjectSystemVisual, VideoEconomicsVisual, TenderVisual, ERPCalendarVisual]
const CASE_GOALS: Record<(typeof CASES)[number]['id'], Goal> = {
  scrum: 'project_video_system',
  video: 'project_production',
  tender: 'project_tender',
  erp: 'project_erp_calendar',
}

function trackProjectOpen(id: (typeof CASES)[number]['id']) {
  trackGoal(CASE_GOALS[id])
}

const MORE_ICONS = [WandSparkles, Gauge, Languages, Globe2, FolderTree]

export function Cases() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const heading = useGoalView('projects_view')
  return <section id="work" className="hr-section hr-work" aria-labelledby="cases-title"><div className="hr-container">
    <Reveal className="work-header"><div><h2 ref={heading} className="section-title" id="cases-title">{ru ? 'Избранные проекты' : 'Selected projects'}</h2></div><div className="work-intro"><p>{ru ? 'Управление командой, экономика производства, работа с подрядчиками и корпоративный IT — четыре проекта с разными задачами и моей ролью в каждом.' : 'Team operations, production economics, vendor selection and enterprise IT: four different projects and my role in each.'}</p><p className="work-visual-note">{ru ? 'Схемы и интерфейсы восстановлены для портфолио на обезличенных данных.' : 'Diagrams and interfaces are reconstructed for this portfolio using anonymised data.'}</p></div></Reveal>
    <nav aria-label={ru ? 'Перейти к проекту' : 'Go to a project'}><SwipeRail className="case-index" label={ru ? 'Проекты' : 'Projects'}>{CASES.map((item, i) => { const Icon = CASE_ICONS[i]; return <a href={`#case-${item.id}`} key={item.id} onClick={() => trackProjectOpen(item.id)}><span className="case-nav-icon"><Icon size={21} aria-hidden="true" /></span><span>{item.nav[language]}</span><ArrowUpRight size={18} aria-hidden="true" /></a> })}</SwipeRail></nav>
    <div className="flagship-list">{CASES.map((item, i) => {
      const Visual = VISUALS[i]
      return <Reveal depth key={item.id}><article id={`case-${item.id}`} className={`flagship flagship-${item.id}`} aria-labelledby={`case-title-${item.id}`}>
        <header className="flagship-heading"><p className="flagship-category"><span>0{i + 1}</span>{item.category[language]}</p><h3 id={`case-title-${item.id}`}>{item.title[language]}</h3><p className="flagship-lead">{item.intro[language]}</p></header>
        <div className="flagship-overview"><div className="flagship-results"><div className="flagship-outcome"><h4>{ru ? 'Результат и масштаб' : 'Outcome and scope'}</h4><p>{item.outcome[language]}</p></div>
          <dl className={`flagship-metrics metrics-${item.metrics.length}`}>{item.metrics.map(metric => <div key={metric.value.en}><dt className={metric.value[language].length > 12 ? 'metric-fact' : ''}>{metric.value[language]}</dt><dd>{metric.label[language]}</dd></div>)}</dl>
          {'note' in item && <p className="flagship-note">{item.note[language]}</p>}
        </div><figure className="flagship-visual"><Visual language={language} /></figure></div>
        <details className="flagship-details"><summary><span>{ru ? 'Подробнее о моей роли' : 'More about my role'}</span><Plus size={20} aria-hidden="true" /></summary><div className="flagship-detail-body"><div className="flagship-brief"><div><h4>{ru ? 'Задача' : 'Challenge'}</h4><p>{item.context[language]}</p></div><div><h4>{ru ? 'Моя роль' : 'My role'}</h4><p>{item.role[language]}</p></div></div><ol className="flagship-deliverables">{item.changes.map((change, index) => <li key={change.title.en}><span aria-hidden="true">0{index + 1}</span><div><h4>{change.title[language]}</h4><p>{change.text[language]}</p></div></li>)}</ol><div className="flagship-detail-result"><h4>{ru ? 'Результат' : 'Result'}</h4><p>{item.result[language]}</p></div></div></details>
        <div className="flagship-tools"><h4>{ru ? 'Инструменты и подходы' : 'Tools and approaches'}</h4><ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
      </article></Reveal>
    })}</div>
    <div id="additional" className="more-projects"><header><h3>{ru ? 'Ещё проекты' : 'More projects'}</h3><p>{ru ? 'Автоматизация, показатели и рабочая инфраструктура' : 'Automation, performance metrics and working infrastructure'}</p></header><div className="more-projects-grid">{MORE_PROJECTS.map((item, i) => { const Icon = MORE_ICONS[i]; return <Reveal key={item.id}><article id={`project-${item.id}`}><div className="more-project-icon"><Icon size={25} aria-hidden="true" /></div><h4>{item.title[language]}</h4><p>{item.text[language]}</p><ul className="more-project-facts">{item.facts.map(fact => <li key={fact.en}>{fact[language]}</li>)}</ul></article></Reveal> })}</div></div>
  </div></section>
}
