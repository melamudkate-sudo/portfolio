import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Blocks, Bot, ChartNoAxesCombined, ClipboardList, Database, FileCheck2, GitBranch, Layers3, ListChecks, Network, Route, Scale, ScanLine, Settings2, SlidersHorizontal, Users, Wallet } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { SECTION_CONTAINER_CLASS } from '@/lib/utils'
import { analysis, levels, management, toolGroups, type Competency, type Level, type Tool } from './expertise/data'
import './expertise/expertise.css'

const managementIcons = [ClipboardList, Route, SlidersHorizontal, Network, Users, FileCheck2]
const analysisIcons = [ChartNoAxesCombined, ScanLine, Bot, Layers3, Blocks, Wallet]
const toolIcons = [GitBranch, Database, FileCheck2, Bot, Layers3, Settings2]

function LevelLabel({ level }: { level: Level }) {
  const { language } = useLanguage()
  return <span className={`expertise-level level-${level}`}><span aria-hidden="true" />{levels[level][language]}</span>
}

function CompetencyRow({ item, index, analytical = false }: { item: Competency; index: number; analytical?: boolean }) {
  const { language } = useLanguage()
  const Icon = (analytical ? analysisIcons : managementIcons)[index]
  return <li className="expertise-row">
    <span className="expertise-row-icon" aria-hidden="true"><Icon size={21} strokeWidth={1.5} /></span>
    <div className="expertise-row-copy"><div className="expertise-row-heading"><h4>{item.title[language]}</h4><LevelLabel level={item.level} /></div><p>{item.scope[language]}</p></div>
  </li>
}

function ToolMark({ tool }: { tool: Tool }) {
  return <span className="expertise-tool-mark" aria-hidden="true">{tool.logo
    ? <img src={`${import.meta.env.BASE_URL}expertise/${tool.logo}`} className={tool.mono ? 'is-monochrome' : undefined} width="32" height="32" alt="" loading="lazy" />
    : <Database size={28} strokeWidth={1.5} />}</span>
}

export function Skills() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState(0)
  const group = toolGroups[selected]
  const entrance = { initial: reduced ? false as const : { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.08 }, transition: { duration: 0.4 } }

  return <section id="skills" aria-labelledby="expertise-title" className="expertise-section">
    <div className={SECTION_CONTAINER_CLASS}>
      <motion.header className="expertise-header" {...entrance}>
        <div><p className="expertise-kicker">04 / {ru ? 'ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ' : 'PROFESSIONAL PROFILE'}</p><h2 id="expertise-title">{ru ? 'Экспертиза' : 'Expertise'}<span aria-hidden="true">.</span></h2></div>
        <p className="expertise-lead">{ru ? 'Проектирую процессы, управляю реализацией, выстраиваю аналитику и автоматизацию.' : 'Designing processes, managing delivery, and building analytics and automation.'}</p>
      </motion.header>
      <motion.div className="expertise-management" {...entrance}>
        <header className="expertise-band-heading"><span className="expertise-index" aria-hidden="true">01</span><div><p className="expertise-kicker">{ru ? 'ОСНОВА' : 'CORE PRACTICE'}</p><h3>{ru ? 'Управление проектами и операциями' : 'Project and operations management'}</h3></div><span className="expertise-band-icon" aria-hidden="true"><Route size={38} strokeWidth={1.2} /></span></header>
        <ol className="expertise-management-list">{management.map((item, index) => <CompetencyRow key={index} item={item} index={index} />)}</ol>
      </motion.div>
      <motion.div className="expertise-analysis" {...entrance}>
        <div className="expertise-analysis-intro"><div className="expertise-band-heading"><span className="expertise-index" aria-hidden="true">02</span><p className="expertise-kicker">{ru ? 'АНАЛИТИЧЕСКИЙ СЛОЙ' : 'ANALYTICAL PRACTICE'}</p></div><h3>{ru ? 'Аналитика, автоматизация и продуктовые задачи' : 'Analytics, automation and product work'}</h3>
          <div className="expertise-model" aria-label={ru ? 'От данных через модель к решению' : 'From data through a model to a decision'}>
            <div><Database size={22} aria-hidden="true" /><span>{ru ? 'Данные' : 'Data'}</span><small>{ru ? 'Исследование и вводные' : 'Research and inputs'}</small></div><ArrowDown className="expertise-model-arrow" size={20} aria-hidden="true" />
            <div className="expertise-model-core"><Scale size={27} aria-hidden="true" /><span>{ru ? 'Модель' : 'Model'}</span><small>{ru ? 'Факторы · логика · сценарии' : 'Factors · logic · scenarios'}</small></div><ArrowDown className="expertise-model-arrow" size={20} aria-hidden="true" />
            <div><ListChecks size={22} aria-hidden="true" /><span>{ru ? 'Решение' : 'Decision'}</span><small>{ru ? 'Требования и реализация' : 'Requirements and implementation'}</small></div>
          </div>
        </div>
        <ol className="expertise-analysis-list">{analysis.map((item, index) => <CompetencyRow key={index} item={item} index={index} analytical />)}</ol>
      </motion.div>
      <motion.div className="expertise-tools" {...entrance}>
        <header className="expertise-tools-heading"><div className="expertise-band-heading"><span className="expertise-index" aria-hidden="true">03</span><div><p className="expertise-kicker">{ru ? 'РАБОЧИЙ СТЕК' : 'WORKING TOOLKIT'}</p><h3>{ru ? 'Инструменты' : 'Tools'}</h3></div></div><p>{ru ? 'Выберите категорию, чтобы посмотреть инструменты и уровень владения.' : 'Choose a category to explore tools and proficiency levels.'}<ArrowDown size={16} aria-hidden="true" /></p></header>
        <div className="expertise-tool-browser">
          <div className="expertise-tool-categories" role="group" aria-label={ru ? 'Категории инструментов' : 'Tool categories'}>{toolGroups.map((category, index) => {
            const Icon = toolIcons[index]
            return <button key={category.id} type="button" aria-pressed={selected === index} aria-controls="expertise-tool-results" onClick={() => setSelected(index)}><Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span>{category.title[language]}</span><ArrowRight size={16} aria-hidden="true" /></button>
          })}</div>
          <div id="expertise-tool-results" className="expertise-tool-results" role="region" aria-labelledby="expertise-tool-category" aria-live="polite" aria-atomic="true">
            <div className="expertise-result-heading"><h4 id="expertise-tool-category">{group.title[language]}</h4><span>{String(group.tools.length).padStart(2, '0')} / {ru ? 'ИНСТРУМЕНТЫ' : 'TOOLS'}</span></div>
            <motion.ul key={group.id} className="expertise-tool-grid" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>{group.tools.map(tool => <li key={tool.name} className="expertise-tool"><ToolMark tool={tool} /><div><h5>{tool.name}</h5><LevelLabel level={tool.level} /></div></li>)}</motion.ul>
            <p className="expertise-tool-note">{ru ? 'Уровни отражают практическое владение инструментами.' : 'Levels reflect practical proficiency with each tool.'}</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
}
