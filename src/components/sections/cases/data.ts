export type Copy = { ru: string; en: string }
type Visual = 'model' | 'scenario' | 'queue' | 'product' | 'kpi' | 'network'

export type Case = {
  number: string
  type: Visual
  category: Copy
  title: Copy
  lead: Copy
  context: Copy
  actions: Copy[]
  result: Copy
  metric?: Copy
  outcomes?: Array<{
    value: Copy
    label: Copy
  }>
}

export const CASES: Case[] = [
  {
    number: '01',
    type: 'model',
    category: { ru: 'Операционная трансформация', en: 'Operational transformation' },
    title: { ru: 'Перестройка операционной модели и ресурсное планирование', en: 'Rebuilding an operating model and resource planning' },
    lead: { ru: 'Перевела решения о ресурсах с интуиции на расчётную модель.', en: 'Moved resource decisions from intuition to a calculation model.' },
    context: { ru: 'Функции пересекались, трудоёмкость не была рассчитана, а планирование ресурсов не опиралось на единую модель.', en: 'Responsibilities overlapped, effort had not been calculated, and resource planning had no shared model.' },
    actions: [
      { ru: 'Собрала фактический функционал и рассчитала трудоёмкость ключевых направлений.', en: 'Mapped actual responsibilities and calculated effort across key areas.' },
      { ru: 'Сравнила найм, подряд и баланс загрузки по стоимости, скорости и управляемости.', en: 'Compared hiring, contractors, and workload balance by cost, speed, and controllability.' },
      { ru: 'Переработала роли, базу знаний, регламенты и цикл адаптации.', en: 'Reworked roles, knowledge base, operating rules, and onboarding.' },
    ],
    outcomes: [
      { value: { ru: '+20%', en: '+20%' }, label: { ru: 'объём задач', en: 'work volume' } },
      { value: { ru: '−40%', en: '−40%' }, label: { ru: 'просроченных задач', en: 'overdue tasks' } },
    ],
    result: { ru: 'Появился понятный план расширения команды, а также масштабируемая система передачи знаний.', en: 'Created a clear plan for team expansion and a scalable system for knowledge transfer.' },
  },
  {
    number: '02',
    type: 'scenario',
    category: { ru: 'Операционная модель', en: 'Operating model' },
    title: { ru: 'Оптимизация модели видеопроизводства', en: 'Optimising a video-production model' },
    lead: { ru: 'Сравнила сценарии производства и обосновала более управляемую модель.', en: 'Compared production scenarios and justified a more controllable model.' },
    context: { ru: 'Плановый рост объёма материалов усиливал зависимость от внешних исполнителей, расходов и длительных циклов правок.', en: 'Planned volume growth increased dependence on external suppliers, costs, and long revision cycles.' },
    actions: [
      { ru: 'Разработала несколько сценариев: подряд, частичное перераспределение и внутреннее производство.', en: 'Built several scenarios: contractors, partial redistribution, and in-house production.' },
      { ru: 'Рассчитала затраты, производственную мощность, риски и качество каждого сценария.', en: 'Modelled cost, capacity, risk, and quality for each scenario.' },
      { ru: 'Подготовила экономическое обоснование и рекомендацию для руководства.', en: 'Prepared the business case and recommendation for leadership.' },
    ],
    metric: { ru: 'Потенциальная экономия — около 45% относительно базового сценария.', en: 'Potential savings — around 45% relative to the baseline scenario.' },
    result: { ru: 'Новая модель перешла к подготовке внутренней инфраструктуры.', en: 'The new model moved into internal-infrastructure preparation.' },
  },
  {
    number: '03',
    type: 'queue',
    category: { ru: 'Автоматизация', en: 'Automation' },
    title: { ru: 'Self-service доступ к ограниченному ресурсу', en: 'Self-service access to a constrained resource' },
    lead: { ru: 'Превратила ручную координацию в понятный сценарий без постоянного посредника.', en: 'Turned manual coordination into a clear flow without a constant intermediary.' },
    context: { ru: 'Сотрудники вручную уточняли доступность общего сервиса, пересекались по времени и тратили часы на коммуникацию.', en: 'Employees manually checked a shared service’s availability, collided in time, and spent hours coordinating.' },
    actions: [
      { ru: 'Разобрала пользовательский сценарий и причины конфликтов доступа.', en: 'Analysed the user flow and the causes of access conflicts.' },
      { ru: 'Спроектировала очередь: статусы, уведомления, освобождение доступа и исключения.', en: 'Designed a queue: statuses, notifications, release rules, and exceptions.' },
      { ru: 'Настроила автоматизацию, права, инструкции и сопровождение после запуска.', en: 'Configured automation, permissions, guidance, and post-launch support.' },
    ],
    metric: { ru: 'Количество конфликтов и повторных уточнений сократилось вдвое.', en: 'Conflicts and repeat clarification requests were cut in half.' },
    result: { ru: 'Инструмент экономит команде несколько рабочих часов еженедельно.', en: 'The tool saves the team several work hours every week.' },
  },
  {
    number: '04',
    type: 'product',
    category: { ru: 'Продуктовое мышление', en: 'Product thinking' },
    title: { ru: 'Перепроектирование внутренней системы управления процессом', en: 'Redesigning an internal process-management system' },
    lead: { ru: 'Вернула внутренний продукт к исходной бизнес-задаче.', en: 'Brought an internal product back to its original business goal.' },
    context: { ru: 'Проработка MVP смещалась к набору отдельных функций и рисковала потерять ценность для реального сценария работы.', en: 'MVP work was shifting toward a feature set and risking loss of value for the real work scenario.' },
    actions: [
      { ru: 'Проанализировала MVP, роли и пользовательские сценарии.', en: 'Analysed the MVP, roles, and user scenarios.' },
      { ru: 'Сфокусировала концепцию на этапах, ответственности, рисках и передаче результата.', en: 'Refocused the concept on stages, ownership, risks, and handoffs.' },
      { ru: 'Создала интерактивный прототип и представила обновлённую логику команде.', en: 'Created an interactive prototype and presented the updated logic to the team.' },
    ],
    result: { ru: 'Часть логики вошла в дальнейший план реализации.', en: 'Part of the proposed logic entered the further implementation plan.' },
  },
  {
    number: '05',
    type: 'kpi',
    category: { ru: 'Аналитика и мотивация', en: 'Analytics and motivation' },
    title: { ru: 'KPI-системы для функциональных блоков', en: 'KPI systems for functional units' },
    lead: { ru: 'Сделала оценку работы измеримой и более справедливой.', en: 'Made performance assessment measurable and fairer.' },
    context: { ru: 'Исходные показатели были фрагментарными, плохо измеримыми и не отражали реальную работу сотрудников.', en: 'Initial metrics were fragmented, difficult to measure, and did not reflect employees’ actual work.' },
    actions: [
      { ru: 'Провела интервью с сотрудниками, руководителями и владельцами процессов.', en: 'Interviewed employees, leaders, and process owners.' },
      { ru: 'Отделила показатели под контролем сотрудника от внешних факторов.', en: 'Separated employee-controlled metrics from external factors.' },
      { ru: 'Создала расчётные модели, сводки и основу для автоматизации.', en: 'Created calculation models, summaries, and a basis for automation.' },
    ],
    result: { ru: 'Для двух блоков появились полноценные KPI-системы, связанные с бизнес-результатами.', en: 'Two units received full KPI systems connected to business results.' },
  },
  {
    number: '06',
    type: 'network',
    category: { ru: 'Управление подрядчиками', en: 'Contractor management' },
    title: { ru: 'Управление внешним производственным контуром', en: 'Managing an external production network' },
    lead: { ru: 'Собрала управляемый контур из нескольких внешних исполнителей.', en: 'Built a manageable network of external specialists.' },
    context: { ru: 'Параллельно требовалось координировать до восьми специалистов и подрядчиков — от выбора исполнителя до передачи результата.', en: 'Up to eight specialists and contractors needed coordination in parallel — from selection to handoff.' },
    actions: [
      { ru: 'Формировала требования, сравнивала условия и организовывала выбор исполнителей.', en: 'Formed requirements, compared terms, and organised supplier selection.' },
      { ru: 'Согласовывала ТЗ, сроки, стоимость и контрольные точки.', en: 'Aligned briefs, timelines, cost, and checkpoints.' },
      { ru: 'Разрешала разногласия между внутренними заказчиками и исполнителями.', en: 'Resolved friction between internal stakeholders and suppliers.' },
    ],
    result: { ru: 'Стали прозрачнее сроки, статусы, качество и нагрузка внешнего контура.', en: 'Timelines, status, quality, and capacity became more transparent.' },
  },
]

