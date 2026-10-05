import type { Language } from '@/hooks/use-language'
export type Copy = Record<Language, string>
const c = (ru: string, en: string): Copy => ({ ru, en })
export const CASES = [
  {
    id: 'scrum', category: 'Operations / Scrum',
    title: c('Проектная работа отдела дизайна и контента', 'Project delivery for design and content'),
    context: c('Десятки задач по новым продуктам, упаковке, инструкциям, контенту, видео и локализации идут одновременно. В работе участвуют дизайнеры, редакторы, продакт и подрядчики.', 'Dozens of tasks for new products, packaging, manuals, content, video and localisation run in parallel, involving designers, editors, a product manager and contractors.'),
    role: c('Участвовала в перестройке проектной системы отдела: собирала более управляемый способ работы команды и переносила его в Bitrix24 Scrum Pro.', 'Helped rebuild the department’s project system: designing a more manageable way of working and moving it into Bitrix24 Scrum Pro.'),
    changes: [
      c('Собрала структуру материнских задач и подзадач, реестр и правила работы с backlog, planned и in progress.', 'Built the parent-task and subtask structure, task register and rules for backlog, planned and in progress.'),
      c('Внедрила двухнедельные спринты. Участвовала в planning, daily и retrospective, выполняла функции Scrum Master и фасилитировала работу команды.', 'Introduced two-week sprints. Took part in planning, daily meetings and retrospectives, performing Scrum Master duties and facilitating the team’s work.'),
      c('Подготовила инструкции, настроила регулярные уведомления и контроль ближайших дедлайнов.', 'Wrote team instructions and set up recurring notifications and upcoming-deadline tracking.'),
      c('В e-com с нуля выстроила работу по Agile: выполняю функции Scrum Master, разбираю задачи и уточняю приоритеты.', 'Built an Agile way of working in e-commerce from scratch: performing Scrum Master duties and clarifying tasks and priorities.'),
      c('В работе над операционной моделью рассчитала трудоёмкость и загрузку, проработала распределение ролей, инструкции и онбординг.', 'For the operating model, calculated effort and capacity and developed role allocation, working instructions and onboarding.'),
    ],
    result: c('Около 150 задач держу в фокусе в спринте: отслеживаю ответственных, сроки и зависимости. В рамках работы над операционной моделью объём задач вырос примерно на 20%, а доля просроченных сократилась на 40%. Это результат изменений в работе отдела, а не отдельная метрика переноса в Scrum.', 'Keep around 150 tasks in focus throughout the sprint, tracking owners, deadlines and dependencies. During the operating-model work, task volume increased by about 20% and the share of overdue tasks fell by 40%. These results reflect changes in department operations, not an isolated measure of the Scrum migration.'),
    tags: ['Bitrix24 Scrum Pro', 'Scrum', 'Sprint Planning', 'Facilitation'],
  },
  {
    id: 'production', category: 'Project Management / Production',
    title: c('Система планирования контента, арт-работ и видео', 'Planning content, artwork and video production'),
    context: c('Арт-работы новых моделей, инструкции, упаковка, кулинарные книги, рецепты, фото, видео и материалы для маркетплейсов — несколько связанных производственных потоков.', 'Artwork for new models, manuals, packaging, cookbooks, recipes, photos, video and marketplace assets form several connected production streams.'),
    role: c('Собираю единый горизонт планирования и координирую дизайнеров, редакторов, продактов и подрядчиков. Работаю и с e-com: выстраиваю работу команды, разбираю задачи и уточняю приоритеты.', 'Build a shared planning horizon and coordinate designers, editors, product managers and contractors. Also work with e-commerce, structuring team delivery and clarifying tasks and priorities.'),
    changes: [
      c('Связываю начало и завершение этапов, зависимости и дедлайны в общем плане.', 'Connect stage start and finish dates, dependencies and deadlines in a shared plan.'),
      c('Отслеживаю готовность материалов, собираю регулярные управленческие сводки и выделяю риски до наступления дедлайна.', 'Track asset readiness, compile regular management summaries and flag risks before deadlines.'),
      c('Участвую в проектировании операционной логики внутренней системы вместе с аналитиками и IT: роли, статусы, передачи результата, отчётность и интерактивный прототип.', 'Work with analysts and IT on the operating logic of an internal system: roles, statuses, handoffs, reporting and an interactive prototype.'),
    ],
    result: c('30 дней оперативного планирования, 10 рецептов и 5 публикаций в неделю — вместе с параллельными потоками видео, инструкций, упаковки и арт-работ. План связывает их зависимости и готовность. Часть логики прототипа включена в дальнейший план реализации. Мой вклад — процессы и прототипирование совместно с аналитиками и IT.', 'A 30-day planning horizon, 10 recipes and 5 posts per week, alongside parallel video, manual, packaging and artwork streams. The plan connects dependencies and readiness across them. Part of the prototype logic was included in the implementation plan. My contribution covered processes and prototyping alongside analysts and IT.'),
    tags: ['Production pipeline', 'Dependencies', 'Reporting'],
  },
  {
    id: 'automation', category: 'Internal Tools / Automation',
    title: c('Внутренние инструменты и автоматизация', 'Internal tools and automation'),
    context: c('Расчёт доступных дней отпуска, согласования, сверки материалов и регулярные отчёты требуют повторяющихся операций.', 'Available leave calculations, approvals, asset checks and recurring reports involve repetitive work.'),
    role: c('Проектирую и собираю инструменты под конкретный рабочий процесс — от таблицы и скрипта до dashboard и небольшого web-интерфейса.', 'Design and build tools for specific workflows, from spreadsheets and scripts to dashboards and small web interfaces.'),
    changes: [
      c('Собрала dashboard отпусков: расчёт доступных дней, workflow заявки и согласования, предупреждения руководителю и уведомления.', 'Built a leave dashboard with available-day calculations, a request and approval workflow, manager alerts and notifications.'),
      c('Создала реестры, таблицы планирования и оценки трудоёмкости, регулярные сводки по дедлайнам.', 'Created registers, planning and effort-estimation spreadsheets, and recurring deadline summaries.'),
      c('Использую Google Sheets и Apps Script для расчётов, обработки данных и автоматических сценариев; тестирую и дорабатываю логику.', 'Use Google Sheets and Apps Script for calculations, data processing and automated workflows, testing and refining the logic.'),
    ],
    result: c('В реестре контента для 20+ товарных позиций формулы и Apps Script автоматизируют индикацию пробелов и приоритеты. Меньше ручных сверок и риска пропустить обязательный материал.', 'In a content register covering 20+ product items, formulas and Apps Script automate gap indicators and priorities, reducing manual checks and the risk of missing required assets.'),
    tags: ['Google Sheets', 'Apps Script', 'Dashboards', 'AI'],
  },
  {
    id: 'launch', category: 'Business Processes / Product',
    title: c('Процесс запуска и локализации новых продуктов', 'New product launch and localisation workflow'),
    context: c('Новая модель проходит через панель, упаковку, инструкцию, кулинарные материалы, контент, карточку товара, видео и локализацию. Этапы зависят друг от друга и требуют участия разных команд.', 'A new model moves through panel design, packaging, manuals, cooking materials, content, product listings, video and localisation. Stages depend on each other and involve several teams.'),
    role: c('Помогаю собирать этот путь в последовательную систему задач, зависимостей и ответственных, синхронизируя product, operations, production, design и content.', 'Help turn this journey into a structured set of tasks, dependencies and owners, aligning product, operations, production, design and content.'),
    changes: [
      c('Фиксирую требования к материалам и точки передачи результата, отслеживаю готовность каждого этапа.', 'Capture asset requirements and handoffs, and track readiness at each stage.'),
      c('Планирую локализацию на русский, английский и китайский: приоритеты материалов, трудоёмкость и ресурсы.', 'Plan Russian, English and Chinese localisation, including asset priorities, effort and resources.'),
      c('Связываю параллельные работы в общий план, чтобы изменения в одном потоке учитывались в других.', 'Connect parallel work in a shared plan so changes in one stream are reflected in the others.'),
      c('Собрала и согласовала информацию для будущих иностранных партнёров, самостоятельно разработала страницу для дилеров и участвовала в её публикации на зарубежных серверах.', 'Collected and approved information for prospective international partners, independently built the dealer page and helped publish it on international servers.'),
    ],
    result: c('Около 10 моделей в подготовке к зарубежным рынкам. Требования, зависимости и готовность материалов собраны в общую систему контроля при подготовке запуска.', 'Around 10 models are being prepared for international markets. Requirements, dependencies and asset readiness are brought into a shared tracking system during launch preparation.'),
    tags: ['Process mapping', 'Localisation', 'Resource planning'],
  },
] as const

export const DELIVERABLE_LABELS = [
  [c('Структура работы', 'Work structure'), c('Scrum и команда', 'Scrum and team'), c('Сроки и уведомления', 'Deadlines and notifications'), c('E-com с нуля', 'E-commerce from scratch'), c('Ресурсы и правила', 'Resources and rules')],
  [c('Общий план', 'Shared plan'), c('Готовность и риски', 'Readiness and risks'), c('Операционная логика', 'Operating logic')],
  [c('Отпуска и согласования', 'Leave and approvals'), c('Планирование и реестры', 'Planning and registers'), c('Расчёты и автоматизация', 'Calculations and automation')],
  [c('Требования и готовность', 'Requirements and readiness'), c('Локализация', 'Localisation'), c('Связанный план', 'Connected planning'), c('Страница для дилеров', 'Dealer page')],
] as const

export const CASE_PRESENTATION = [
  {
    intro: c('Спроектировала способ работы команды: от структуры задач до спринтов, загрузки и контроля сроков.', 'Designed how the team works: from task structure to sprints, capacity and deadline tracking.'),
    outcome: c('Держу в фокусе около 150 задач в спринте: сроки, ответственные и зависимости. Показатели ниже — результат работы над операционной моделью отдела.', 'I keep around 150 tasks in focus during a sprint: deadlines, owners and dependencies. The figures below reflect the department operating-model work.'),
    metrics: [{ value: '+20%', label: c('объём задач', 'task volume') }, { value: '−40%', label: c('доля просроченных', 'share of overdue tasks') }],
  },
  {
    intro: c('Связала несколько производственных потоков в общий план: участники, сроки, зависимости и готовность материалов.', 'Connected multiple production streams in one plan: contributors, deadlines, dependencies and asset readiness.'),
    outcome: c('План показывает готовность материалов и зависимости между потоками. Вместе с аналитиками и IT спроектировала логику и прототип: часть решений вошла в план реализации.', 'The plan connects asset readiness and dependencies across streams. With analysts and IT, I designed workflow logic and a prototype; some solutions entered the implementation plan.'),
    metrics: [{ value: '30', label: c('дней планирования', 'day planning horizon') }, { value: '10 / 5', label: c('рецептов / публикаций в неделю', 'recipes / posts per week') }],
  },
  {
    intro: c('Сама собираю инструменты под процесс: расчёты, заявки, согласования, реестры и автоматические уведомления.', 'I build tools around the workflow: calculations, requests, approvals, registers and automatic notifications.'),
    outcome: c('Автоматизировала расчёты отпусков и сводки дедлайнов. Реестр для 20+ товарных позиций показывает пробелы в контенте и приоритеты — меньше ручных сверок.', 'Automated leave calculations and deadline summaries. A register for 20+ product items flags content gaps and priorities, reducing manual checks.'),
    metrics: [{ value: '20+', label: c('позиций в реестре контента', 'items in the content register') }, { value: 'Apps Script', label: c('от идеи до рабочего инструмента', 'from idea to a working tool') }],
  },
  {
    intro: c('Собираю путь продукта в систему этапов, ответственных и точек передачи между командами.', 'Structure the product journey into stages, owners and handoffs between teams.'),
    outcome: c('Около 10 моделей в подготовке к зарубежным рынкам. Приоритеты материалов, оценка трудоёмкости, ресурсы и контроль готовности.', 'Around 10 models being prepared for international markets. Asset priorities, effort estimates, resources and readiness tracking.'),
    metrics: [{ value: '≈10', label: c('моделей в подготовке', 'models in preparation') }, { value: 'RU / EN / ZH', label: c('языки локализации материалов', 'asset localisation languages') }],
  },
] as const
