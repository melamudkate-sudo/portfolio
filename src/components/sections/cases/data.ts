export type Copy = { ru: string; en: string }
type Visual = 'model' | 'scenario' | 'product' | 'kpi' | 'markets' | 'tender'

export type Case = {
  number: string
  type: Visual
  category: Copy
  title: Copy
  lead: Copy
  context: Copy
  actions: Copy[]
  result: Copy
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
    number: '02', type: 'scenario',
    category: { ru: 'Бизнес-моделирование и запуск', en: 'Business modelling and launch planning' },
    title: { ru: 'In-house production: от экономики до запуска', en: 'In-house production: from economics to a launch model' },
    lead: { ru: 'Разработала модель внутреннего производства: экономика, команда, ресурсы и площадка.', en: 'Developed an in-house production model spanning economics, team, resources, and premises.' },
    context: { ru: 'Рост производства требовал сопоставить внешний пул затрат с моделью собственного запуска.', en: 'Production growth required comparing the external cost pool with an in-house launch model.' },
    actions: [
      { ru: 'Проанализировала внешний пул затрат и сравнила варианты производства.', en: 'Analysed the external cost pool and compared production options.' },
      { ru: 'Разработала ресурсную модель, состав команды и требования к инфраструктуре.', en: 'Developed the resource model, team composition, and infrastructure requirements.' },
      { ru: 'Проработала требования к площадке и 7 вариантов помещений.', en: 'Worked through site requirements and seven premises options.' },
    ],
    result: { ru: 'Подготовлена модель запуска; руководство перешло к проработке инфраструктуры.', en: 'A launch model was prepared; leadership moved on to developing the infrastructure.' },
  },
  {
    number: '03',
    type: 'product',
    category: { ru: 'Продуктовое мышление', en: 'Product thinking' },
    title: { ru: 'Проектирование системы управления производством', en: 'Designing an internal production-management system' },
    lead: { ru: 'Связала бизнес-задачу, сценарии пользователей и операционную логику в интерактивном прототипе.', en: 'Connected the business problem, user scenarios, and operating logic in an interactive prototype.' },
    context: { ru: 'Проработка MVP смещалась к набору отдельных функций и рисковала потерять ценность для реального сценария работы.', en: 'MVP work was shifting toward a feature set and risking loss of value for the real work scenario.' },
    actions: [
      { ru: 'Проанализировала MVP, роли и пользовательские сценарии.', en: 'Analysed the MVP, roles, and user scenarios.' },
      { ru: 'Описала этапы, ответственных, передачи, статусы, сроки и риски.', en: 'Defined stages, owners, handoffs, statuses, deadlines, and risks.' },
      { ru: 'Создала интерактивный прототип и представила обновлённую логику команде.', en: 'Created an interactive prototype and presented the updated logic to the team.' },
    ],
    result: { ru: 'Значительную часть логики аналитики и IT включили в дальнейший план реализации.', en: 'Analysts and IT included a substantial part of the logic in the next implementation plan.' },
  },

  {
    number: '04',
    type: 'kpi',
    category: { ru: 'Аналитика и мотивация', en: 'Analytics and motivation' },
    title: { ru: 'KPI, которыми сотрудник может управлять', en: 'KPIs employees can actually influence' },
    lead: { ru: 'Отделила управляемый результат от внешних зависимостей — и построила систему оценки.', en: 'Separated controllable outcomes from external dependencies to design a fairer assessment system.' },
    context: { ru: 'Исходные показатели были фрагментарными, плохо измеримыми и не отражали реальную работу сотрудников.', en: 'Initial metrics were fragmented, difficult to measure, and did not reflect employees’ actual work.' },
    actions: [
      { ru: 'Провела интервью с сотрудниками, руководителями и владельцами процессов.', en: 'Interviewed employees, leaders, and process owners.' },
      { ru: 'Отделила показатели под контролем сотрудника от внешних факторов.', en: 'Separated employee-controlled metrics from external factors.' },
      { ru: 'Проработала расчёты, ограничения переменной части, источники данных и автоматизацию.', en: 'Developed calculations, variable-pay constraints, data sources, and automation.' },
    ],
    result: { ru: 'Для двух блоков появились полноценные KPI-системы, связанные с бизнес-результатами.', en: 'Two units received full KPI systems connected to business results.' },
  },

  {
    number: '05', type: 'markets',
    category: { ru: 'Кросс-функциональный запуск', en: 'Cross-functional rollout' },
    title: { ru: 'Подготовка линейки к зарубежным рынкам', en: 'Preparing a product line for international markets' },
    lead: { ru: 'Синхронизировала подготовку моделей, материалов и локализации между пятью функциями.', en: 'Coordinated model preparation, materials, and localisation across five functions.' },
    context: { ru: 'Для нескольких SKU нужно было связать требования к материалам, локализацию и зависимости в общую картину готовности.', en: 'Multiple SKUs required a shared view of material requirements, localisation, dependencies, and readiness.' },
    actions: [
      { ru: 'Синхронизировала product, operations, production, design и content.', en: 'Aligned product, operations, production, design, and content.' },
      { ru: 'Связала требования к материалам и локализацию с подготовкой нескольких SKU.', en: 'Connected material requirements and localisation to preparation across multiple SKUs.' },
      { ru: 'Координировала зависимости и контролировала готовность линейки.', en: 'Coordinated dependencies and tracked the product line’s readiness.' },
    ],
    result: { ru: 'Около 10 моделей в подготовке к зарубежным рынкам — с контролем материалов, локализации и зависимостей.', en: 'Around 10 models in preparation for international markets, with materials, localisation, and dependencies tracked.' },
  },
  {
    number: '06', type: 'tender',
    category: { ru: 'Коммерческий отбор', en: 'Commercial selection' },
    title: { ru: 'Тендер: от 20 компаний до обоснованного выбора', en: 'Tender: from 20 companies to an informed choice' },
    lead: { ru: 'Привела предложения и тестовые работы к единой основе для сравнения.', en: 'Brought proposals and test projects onto a consistent basis for comparison.' },
    context: { ru: 'Выбор требовал сопоставимых вводных, коммерческих предложений и результатов тестовых работ.', en: 'The selection required comparable briefs, commercial proposals, and test-project results.' },
    actions: [
      { ru: 'Сформировала пул, подготовила единые вводные и собрала КП.', en: 'Built the company pool, prepared a shared brief, and collected proposals.' },
      { ru: 'Координировала коммуникацию, участвовала в переговорах и организовывала тесты.', en: 'Coordinated communications, participated in negotiations, and organised test projects.' },
      { ru: 'Структурировала результаты и подготовила сравнительные материалы для выбора.', en: 'Structured the results and prepared comparison materials for the selection.' },
    ],
    result: { ru: 'Предложения, переговоры и тестовые работы собраны в основу для обоснованного выбора.', en: 'Proposals, negotiations, and test-project results formed a basis for an informed choice.' },
  },
]
