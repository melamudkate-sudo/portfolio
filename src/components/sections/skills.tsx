import { useLanguage } from '@/hooks/use-language'

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
    <header className="hr-section-header"><p className="hr-eyebrow">03 / {ru ? 'Навыки' : 'Skills'}</p><h2 id="skills-title">{ru ? 'Что я умею' : 'What I can do'}</h2></header>
    <div className="hr-skills-grid">{SKILLS.map((skill, i) => <article key={skill.title}><span className="hr-skill-number">0{i + 1}</span><h3>{skill.title}</h3><p>{skill[language]}</p></article>)}</div>
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

export function Tools() {
  const { language } = useLanguage()
  return <section id="tools" className="hr-section hr-tools" aria-labelledby="tools-title"><div className="hr-container"><header className="hr-section-header"><h2 id="tools-title">{language === 'ru' ? 'Инструменты и подходы' : 'Tools and approaches'}</h2></header><div className="hr-tool-groups">{TOOL_GROUPS.map(group => <div key={group.title.en}><h3>{group.title[language]}</h3>{group.groups.map((row, i) => <div className="hr-tool-row" key={i}>{'label' in row && <small>{row.label[language]}</small>}<p>{row.items.join(' · ')}</p></div>)}</div>)}</div></div></section>
}
