import type { Language } from '@/hooks/use-language'
export type Copy = Record<Language, string>
const c = (ru: string, en: string): Copy => ({ ru, en })
export const CASES = [
  {
    id: 'scrum', category: 'Operations / Scrum',
    title: c('Перестройка проектной работы отдела креаторов', 'Rebuilding project delivery in the Creators Department'),
    context: c('Десятки задач по новым продуктам, упаковке, инструкциям, контенту, видео и локализации идут одновременно. В работе участвуют дизайнеры, редакторы, продакт и подрядчики.', 'Dozens of tasks for new products, packaging, manuals, content, video and localisation run in parallel, involving designers, editors, a product manager and contractors.'),
    role: c('Участвовала в перестройке проектной системы отдела: собирала более управляемый способ работы команды и переносила его в Bitrix24 Scrum Pro.', 'Helped rebuild the department’s project system: designing a more manageable way of working and moving it into Bitrix24 Scrum Pro.'),
    changes: [
      c('Собрала структуру материнских задач и подзадач, реестр и правила работы с backlog, planned и in progress.', 'Built the parent-task and subtask structure, task register and rules for backlog, planned and in progress.'),
      c('Внедрила двухнедельные спринты. Участвовала в planning, daily и retrospective, выполняла функции Scrum Master и фасилитировала работу команды.', 'Introduced two-week sprints. Took part in planning, daily meetings and retrospectives, performing Scrum Master duties and facilitating the team’s work.'),
      c('Подготовила инструкции, настроила регулярные уведомления и контроль ближайших дедлайнов.', 'Wrote team instructions and set up recurring notifications and upcoming-deadline tracking.'),
    ],
    result: c('Около 150 задач в командном спринте. Задачи связаны с этапами, ответственными и спринтами. Реестр, правила и автоматические сводки дают команде общий способ планировать работу и контролировать сроки.', 'Around 150 tasks per team sprint. Tasks are linked to stages, owners and sprints. The register, working rules and automated summaries give the team a shared way to plan delivery and track deadlines.'),
    tags: ['Bitrix24 Scrum Pro', 'Scrum', 'Sprint Planning', 'Facilitation'],
  },
  {
    id: 'production', category: 'Project Management / Production',
    title: c('Система планирования контента, арт-работ и видео', 'Planning content, artwork and video production'),
    context: c('Арт-работы новых моделей, инструкции, упаковка, кулинарные книги, рецепты, фото, видео и материалы для маркетплейсов — несколько связанных производственных потоков.', 'Artwork for new models, manuals, packaging, cookbooks, recipes, photos, video and marketplace assets form several connected production streams.'),
    role: c('Собираю единый горизонт планирования и координирую дизайнеров, редакторов, продактов и подрядчиков.', 'Build a shared planning horizon and coordinate designers, editors, product managers and contractors.'),
    changes: [
      c('Связываю начало и завершение этапов, зависимости и дедлайны в общем плане.', 'Connect stage start and finish dates, dependencies and deadlines in a shared plan.'),
      c('Отслеживаю готовность материалов, собираю регулярные управленческие сводки и выделяю риски до наступления дедлайна.', 'Track asset readiness, compile regular management summaries and flag risks before deadlines.'),
      c('Участвую в проектировании операционной логики внутренней системы вместе с аналитиками и IT: роли, статусы, передачи результата, отчётность и интерактивный прототип.', 'Work with analysts and IT on the operating logic of an internal system: roles, statuses, handoffs, reporting and an interactive prototype.'),
    ],
    result: c('План объединяет несколько production streams и делает видимыми зависимости и готовность материалов. Часть логики прототипа включена в дальнейший план реализации. Мой вклад — процессы и прототипирование совместно с аналитиками и IT.', 'The plan connects several production streams and makes dependencies and asset readiness visible. Part of the prototype logic was included in the implementation plan. My contribution covered processes and prototyping alongside analysts and IT.'),
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
    ],
    result: c('Около 10 моделей в подготовке к зарубежным рынкам. Требования, зависимости и готовность материалов собраны в общую систему контроля при подготовке запуска.', 'Around 10 models are being prepared for international markets. Requirements, dependencies and asset readiness are brought into a shared tracking system during launch preparation.'),
    tags: ['Process mapping', 'Localisation', 'Resource planning'],
  },
] as const
