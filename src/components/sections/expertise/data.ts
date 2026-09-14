export type Copy = { ru: string; en: string }
export type Level = 'advanced' | 'confident' | 'high' | 'working' | 'basic' | 'developing'
export const copy = (ru: string, en: string): Copy => ({ ru, en })
export const levels: Record<Level, Copy> = {
  advanced: copy('Продвинутый', 'Advanced'), confident: copy('Уверенный', 'Proficient'),
  high: copy('Высокий', 'Highly proficient'), working: copy('Рабочий', 'Working knowledge'),
  basic: copy('Базовый', 'Basic'), developing: copy('Базовый · развиваю', 'Basic · developing'),
}
export type Competency = { title: Copy; level: Level; scope: Copy }
export const management: Competency[] = [
  { title: copy('Управление проектами', 'Project management'), level: 'advanced', scope: copy('Декомпозиция · планирование · сроки · зависимости · риски · контроль', 'Work breakdown · planning · timelines · dependencies · risks · tracking') },
  { title: copy('Проектирование и оптимизация процессов', 'Process design and improvement'), level: 'advanced', scope: copy('Этапы · роли · точки передачи · контрольные точки · устранение узких мест', 'Stages · roles · handoffs · checkpoints · bottleneck removal') },
  { title: copy('Управление сроками и ресурсами', 'Time and resource management'), level: 'advanced', scope: copy('Загрузка · приоритеты · capacity · распределение ресурсов · дедлайны', 'Workload · priorities · capacity · resource allocation · deadlines') },
  { title: copy('Кросс-функциональная координация', 'Cross-functional coordination'), level: 'advanced', scope: copy('Продукт · дизайн · контент · производство · маркетинг', 'Product · design · content · production · marketing') },
  { title: copy('Управление внешними исполнителями', 'External delivery management'), level: 'confident', scope: copy('Поиск · отбор · переговоры · КП · сроки · контроль · приёмка', 'Sourcing · selection · negotiations · proposals · timelines · tracking · acceptance') },
  { title: copy('Сбор и формализация требований', 'Requirements gathering and definition'), level: 'advanced', scope: copy('Вводные → требования → ТЗ → критерии результата → план реализации', 'Inputs → requirements → brief → acceptance criteria → implementation plan') },
]
export const analysis: Competency[] = [
  { title: copy('Операционная аналитика', 'Operational analytics'), level: 'confident', scope: copy('Сроки · загрузка · стоимость · отклонения · сравнение сценариев', 'Timelines · workload · cost · variance · scenario comparison') },
  { title: copy('KPI и система метрик', 'KPIs and measurement systems'), level: 'confident', scope: copy('Показатели · управляемые факторы · расчётная логика · KPI-модели', 'Metrics · controllable factors · calculation logic · KPI models') },
  { title: copy('Автоматизация процессов', 'Process automation'), level: 'advanced', scope: copy('Роботы · триггеры · статусы · уведомления · автоматические сценарии', 'Automation rules · triggers · statuses · notifications · automated flows') },
  { title: copy('Бизнес-моделирование', 'Business modelling'), level: 'confident', scope: copy('Исследование · структура модели · ресурсы · сценарии · риски', 'Research · model structure · resources · scenarios · risks') },
  { title: copy('Продуктовые задачи', 'Product work'), level: 'confident', scope: copy('MVP · пользовательские сценарии · роли · требования · внедрение', 'MVP · user scenarios · roles · requirements · implementation') },
  { title: copy('Бюджеты и коммерческие предложения', 'Budgets and commercial proposals'), level: 'confident', scope: copy('Бюджеты · КП · сравнение вариантов · платежи · коммерческий отбор', 'Budgets · proposals · option comparison · payments · commercial selection') },
]
export type Tool = { name: string; level: Level; logo?: string; mono?: boolean }
export const toolGroups: { id: string; title: Copy; tools: Tool[] }[] = [
  { id: 'projects', title: copy('Проекты и процессы', 'Projects and processes'), tools: [
    { name: 'Bitrix24', level: 'advanced', logo: 'bitrix24.svg' }, { name: 'Buildin', level: 'advanced', logo: 'buildin.png', mono: true },
    { name: 'YouGile', level: 'confident', logo: 'yougile.png' }, { name: 'Miro', level: 'confident', logo: 'miro.svg', mono: true },
  ] },
  { id: 'data', title: copy('Таблицы и данные', 'Spreadsheets and data'), tools: [
    { name: 'Google Sheets', level: 'high', logo: 'google-sheets.svg' }, { name: 'Excel', level: 'advanced', logo: 'microsoft-excel.svg' }, { name: 'SQL', level: 'developing' },
  ] },
  { id: 'documents', title: copy('Документы и презентации', 'Documents and presentations'), tools: [
    { name: 'Google Workspace', level: 'advanced', logo: 'workspace.png' }, { name: 'PowerPoint', level: 'advanced', logo: 'microsoft-powerpoint.svg' },
    { name: 'Google Slides', level: 'advanced', logo: 'google-slides.svg' }, { name: 'Word', level: 'advanced', logo: 'microsoft-word.svg' }, { name: 'Google Docs', level: 'advanced', logo: 'google-docs.svg', mono: true },
  ] },
  { id: 'ai', title: copy('AI', 'AI'), tools: [
    { name: 'ChatGPT', level: 'advanced', logo: 'openai_dark.svg' }, { name: 'Claude / Claude Code', level: 'working', logo: 'claude-ai-icon.svg' }, { name: 'Codex', level: 'working', logo: 'codex_dark.svg' },
  ] },
  { id: 'design', title: copy('Дизайн и визуальные материалы', 'Design and visual materials'), tools: [
    { name: 'Canva', level: 'advanced', logo: 'canva.svg' }, { name: 'Adobe Illustrator', level: 'advanced', logo: 'illustrator.svg' },
    { name: 'Higgsfield', level: 'confident', logo: 'higgsfield.png' }, { name: 'Figma', level: 'basic', logo: 'figma.svg' }, { name: 'Adobe Photoshop', level: 'basic', logo: 'photoshop.svg' },
  ] },
  { id: 'technical', title: copy('Технические инструменты', 'Technical tools'), tools: [
    { name: 'GitHub', level: 'working', logo: 'github_dark.svg' }, { name: 'GitHub Desktop', level: 'working', logo: 'github_dark.svg' },
  ] },
]
