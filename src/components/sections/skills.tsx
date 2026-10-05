import { Layers, Workflow, Route, Gauge, WandSparkles, ChartNoAxesCombined, ShoppingBag, Settings2, Check, Database } from 'lucide-react'
import { SwipeRail } from '@/components/ui/swipe-rail'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'

const SKILL_ICONS = [Layers, Workflow, Route, Gauge, WandSparkles, ChartNoAxesCombined, ShoppingBag]
const SKILLS = [
  { title: 'Project Management', ru: 'Декомпозиция, планирование, сроки, зависимости и приоритизация. Управление несколькими потоками, координация участников, проектная документация и контроль исполнения.', en: 'Task breakdown, planning, timelines, dependencies and prioritisation. Managing parallel streams, coordinating contributors, project documentation and delivery tracking.' },
  { title: 'Agile / Scrum', ru: 'Sprint Planning, Daily, Retrospective, Backlog и Sprint Backlog. Декомпозиция и работа с командой. Опыт выполнения функций Scrum Master и фасилитации.', en: 'Sprint Planning, Daily, Retrospective, Backlog and Sprint Backlog. Task breakdown and teamwork. Experience performing Scrum Master duties and facilitating the team.' },
  { title: 'Business Processes', ru: 'Описание процессов, AS IS / TO BE, BPMN. Роли, зоны ответственности, входы и выходы, узкие места. Регламенты, процессные схемы и улучшение workflow.', en: 'Process documentation, AS IS / TO BE and BPMN. Roles, responsibilities, inputs, outputs and bottlenecks. Procedures, process maps and workflow improvement.' },
  { title: 'Operations', ru: 'Построение рабочих систем и контроль регулярных процессов. Загрузка, дедлайны, dashboards, реестры, метрики, документация и внутренние правила.', en: 'Building operating systems and managing recurring processes. Workload, deadlines, dashboards, registers, metrics, documentation and working rules.' },
  { title: 'Automation & AI', ru: 'Google Apps Script, автоматические уведомления и повторяющиеся операции. ChatGPT, Claude, обработка данных, прототипирование внутренних инструментов. API — базовый / рабочий уровень.', en: 'Google Apps Script, automatic notifications and repetitive workflows. ChatGPT, Claude, data processing and internal-tool prototyping. API use at a basic / working level.' },
  { title: 'Data', ru: 'Excel и Google Sheets: формулы, dashboards, аналитические таблицы, структурирование данных, метрики и отчётность. SQL — базовый уровень.', en: 'Excel and Google Sheets: formulas, dashboards, analytical spreadsheets, data structuring, metrics and reporting. SQL at a basic level.' },
  { title: 'Digital / E-commerce', ru: 'Маркетплейсы, карточки товаров, digital content и production pipelines. Работа с product / creative teams, процессы между отделами и запуск новых продуктов.', en: 'Marketplaces, product listings, digital content and production pipelines. Work with product and creative teams, processes across departments and new product launches.' },
] as const

export function Skills() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="skills" className="hr-section" aria-labelledby="skills-title"><div className="hr-container">
    <header className="hr-section-header"><p className="hr-eyebrow">03 / {ru ? 'Навыки' : 'Skills'}</p><h2 id="skills-title"><span className="section-icon"><Check size={25} aria-hidden="true" /></span>{ru ? 'Что я умею' : 'What I can do'}</h2></header>
    <div className="hr-skills-grid">{SKILLS.map((skill, i) => { const Icon = SKILL_ICONS[i]; return <Reveal key={skill.title} delay={(i % 3) * .06}><article><span className="skill-icon"><Icon size={23} aria-hidden="true" /></span><h3>{skill.title}</h3><ul>{skill[language].split('. ').map(line => <li key={line}>{line.replace(/\.$/, '')}</li>)}</ul></article></Reveal> })}</div>
  </div></section>
}

const TOOL_GROUPS = [
  { title: { ru: 'Управление', en: 'Management' }, groups: [
    { label: { ru: 'Программы', en: 'Software' }, items: ['Bitrix24', 'Miro'] },
    { label: { ru: 'Подходы', en: 'Approaches' }, items: ['Scrum', 'Agile', 'BPMN'] },
  ] },
  { title: { ru: 'Данные и автоматизация', en: 'Data & Automation' }, groups: [{ items: ['Excel', 'Google Sheets', 'Apps Script', 'SQL', 'Colab'] }] },
  { title: { ru: 'AI', en: 'AI' }, groups: [{ items: ['ChatGPT', 'Claude', 'Codex'] }] },
  { title: { ru: 'Продукт и дизайн', en: 'Product & Creative' }, groups: [{ items: ['Figma', 'Illustrator', 'Photoshop', 'Canva', 'GitHub'] }] },
  { title: { ru: 'Рабочая среда', en: 'Workspace' }, groups: [{ items: ['Google Workspace', 'Nextcloud', 'Kinescope'] }] },
] as const

const TOOL_ICONS: Record<string, string> = {
  Bitrix24: 'bitrix.svg', Miro: 'miro.png', Excel: 'excel.svg', 'Google Sheets': 'sheets.svg',
  'Apps Script': 'apps-script.svg', Colab: 'colab.svg', ChatGPT: 'chatgpt.svg', Claude: 'claude.svg', Codex: 'codex.svg',
  Figma: 'figma.svg', Illustrator: 'illustrator.svg', Photoshop: 'photoshop.svg', Canva: 'canva.svg', GitHub: 'github.svg',
  'Google Workspace': 'workspace.png', Nextcloud: 'nextcloud.png', Kinescope: 'kinescope.png',
}

export function Tools() {
  const { language } = useLanguage()
  const title = language === 'ru' ? 'Инструменты и подходы' : 'Tools and approaches'
  return <section id="tools" className="hr-section hr-tools" aria-labelledby="tools-title"><Reveal className="hr-container"><header className="hr-section-header"><h2 id="tools-title"><span className="section-icon"><Settings2 size={25} aria-hidden="true" /></span>{title}</h2></header><SwipeRail className="hr-tool-groups" label={title}>{TOOL_GROUPS.map(group => <div className="tool-group" key={group.title.en}><h3>{group.title[language]}</h3>{group.groups.map((row, i) => <div className="hr-tool-row" key={i}>{'label' in row && row.label.en === 'Approaches' && <p className="approaches-title">{row.label[language]}</p>}<ul className="tool-list">{row.items.map(item => <li key={item}>{TOOL_ICONS[item] ? <img src={`${import.meta.env.BASE_URL}icons/tools/${TOOL_ICONS[item]}`} width="24" height="24" alt="" loading="lazy" /> : item === 'SQL' ? <Database size={24} aria-hidden="true" /> : <Workflow size={20} aria-hidden="true" />}<span>{item}</span></li>)}</ul></div>)}</div>)}</SwipeRail></Reveal></section>
}
