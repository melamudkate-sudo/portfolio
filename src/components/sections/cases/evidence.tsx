import { ArrowDown, ArrowRight, CalendarDays, Check, ClipboardList, Flag, GitBranch, Layers, ListTodo, Network, RefreshCw, UsersRound } from 'lucide-react'
import type { Language } from '@/hooks/use-language'
import './evidence.css'
type Props = { language: Language }

export function ProjectSystemVisual({ language }: Props) {
  const ru = language === 'ru'
  const stages = [
    { Icon: Layers, label: ru ? 'Материнская задача' : 'Parent task', detail: ru ? 'Цель и результат' : 'Goal and outcome' },
    { Icon: GitBranch, label: ru ? 'Подзадачи' : 'Subtasks', detail: ru ? 'Роли и зависимости' : 'Owners and dependencies' },
    { Icon: ListTodo, label: 'Backlog', detail: ru ? 'Приоритеты и оценка' : 'Priorities and estimates' },
    { Icon: CalendarDays, label: ru ? 'Спринт' : 'Sprint', detail: ru ? 'План и загрузка' : 'Plan and capacity' },
    { Icon: UsersRound, label: ru ? 'Работа' : 'Delivery', detail: ru ? 'Сроки и синхронизация' : 'Deadlines and coordination' },
    { Icon: Check, label: ru ? 'Контроль результата' : 'Outcome review', detail: ru ? 'Проверка и обратная связь' : 'Review and feedback' },
  ]
  return <div className="project-system-visual">
    <div className="visual-heading"><Network size={20} aria-hidden="true" /><h4>{ru ? 'Система проектной работы' : 'Project operating system'}</h4></div>
    <ol className="system-architecture">{stages.map(({ Icon, label, detail }) => <li key={label}><Icon size={22} aria-hidden="true" /><div><strong>{label}</strong><span>{detail}</span></div><ArrowRight className="architecture-arrow" size={17} aria-hidden="true" /></li>)}</ol>
    <div className="system-cadence"><div><strong>{ru ? '2 недели' : '2 weeks'}</strong><span>{ru ? 'ритм спринта' : 'sprint cadence'}</span></div><div><strong>≈150</strong><span>{ru ? 'задач в фокусе' : 'tasks in focus'}</span></div></div>
    <div className="system-rituals"><RefreshCw size={18} aria-hidden="true" /><p>{ru ? 'Планирование → ежедневная синхронизация → ретроспектива' : 'Planning → daily coordination → retrospective'}</p></div>
  </div>
}

export function VideoEconomicsVisual({ language }: Props) {
  const ru = language === 'ru'
  return <div className="video-economics-visual">
    <div className="visual-heading"><h4>{ru ? 'Сравнение моделей затрат' : 'Comparing cost models'}</h4></div>
    <div className="cost-comparison" role="img" aria-label={ru ? 'Внешняя модель: 5,4 млн рублей. Предложенная модель: около 1,7 млн рублей. Расчётный потенциал снижения затрат — до 69 процентов.' : 'External model: RUB 5.4 million. Proposed model: about RUB 1.7 million. Projected potential cost reduction: up to 69 percent.'}>
      <div className="cost-label"><span>{ru ? 'Внешняя модель' : 'External model'}</span><strong>{ru ? '5,4 млн ₽' : 'RUB 5.4M'}</strong></div><div className="cost-track"><span className="cost-bar external" /></div>
      <div className="cost-reduction"><ArrowDown size={25} aria-hidden="true" /><strong>{ru ? 'до −69%' : 'up to −69%'}</strong><span>{ru ? 'потенциальное снижение затрат' : 'potential cost reduction'}</span></div>
      <div className="cost-label"><span>{ru ? 'Предложенная модель' : 'Proposed model'}</span><strong>{ru ? '≈1,7 млн ₽' : '≈RUB 1.7M'}</strong></div><div className="cost-track"><span className="cost-bar proposed" /></div>
    </div>
    <p className="cost-disclaimer">{ru ? 'Расчётный эффект. Не фактически полученная экономия.' : 'Projected impact, not realised savings.'}</p>
    <div className="studio-path"><strong>{ru ? '7 площадок' : '7 locations'}</strong><p>{ru ? 'Требования → осмотры → сравнительный анализ' : 'Requirements → site visits → comparison'}</p></div>
  </div>
}

export function TenderVisual({ language }: Props) {
  const ru = language === 'ru'
  const stages = ru ? ['20+ компаний', 'Коммерческие предложения', 'Переговоры', 'Тестовые работы', 'Сравнительная матрица', 'Решение'] : ['20+ companies', 'Commercial proposals', 'Negotiations', 'Test assignments', 'Comparison matrix', 'Decision']
  const criteria = ru ? ['Стоимость', 'Сроки', 'Качество', 'Ресурсы', 'Условия'] : ['Cost', 'Timelines', 'Quality', 'Resources', 'Terms']
  return <div className="tender-visual"><div className="visual-heading"><UsersRound size={20} aria-hidden="true" /><h4>{ru ? 'Единый процесс отбора' : 'A consistent selection process'}</h4></div>
    <ol className="tender-funnel">{stages.map((stage, i) => <li key={stage}><span className="funnel-node">{i === 0 ? <UsersRound size={22} aria-hidden="true" /> : i === 5 ? <Flag size={20} aria-hidden="true" /> : <span aria-hidden="true">{i + 1}</span>}</span><strong>{stage}</strong>{i < stages.length - 1 && <ArrowRight className="funnel-arrow" size={16} aria-hidden="true" />}</li>)}</ol>
    <div className="tender-matrix"><div><ClipboardList size={19} aria-hidden="true" /><h5>{ru ? 'Сравнительная матрица' : 'Comparison matrix'}</h5></div><ul>{criteria.map(criterion => <li key={criterion}><Check size={16} aria-hidden="true" />{criterion}</li>)}</ul><p>{ru ? 'Одинаковые критерии для каждого предложения' : 'The same criteria for every proposal'}</p></div>
  </div>
}

export function ERPCalendarVisual({ language }: Props) {
  const ru = language === 'ru'
  const rows = ru ? ['Дизайн', 'Инструкции', 'Контент', 'Видео'] : ['Design', 'Manuals', 'Content', 'Video']
  return <div className="erp-visual"><div className="visual-heading"><CalendarDays size={20} aria-hidden="true" /><h4>{ru ? 'ERP · Производственный календарь' : 'ERP · Production calendar'}</h4></div>
    <div className="erp-calendar" role="img" aria-label={ru ? 'Реконструкция календаря: четыре потока, шкала из четырёх недель, связанные этапы, контрольные точки и статусы. Данные условные.' : 'Reconstructed calendar: four streams, a four-week timeline, linked stages, milestones and statuses. Illustrative data.'}>
      <div className="erp-row-labels"><span>{ru ? 'Поток' : 'Stream'}</span>{rows.map(row => <strong key={row}>{row}</strong>)}</div>
      <div className="erp-timeline"><div className="erp-weeks">{[1,2,3,4].map(n => <span key={n}>{ru ? 'Нед.' : 'Wk'} {n}</span>)}</div><div className="erp-tracks">
        <div className="erp-track"><span className="erp-bar bar-complete"><Check size={13} aria-hidden="true" />{ru ? 'Готово' : 'Done'}</span><i className="erp-milestone milestone-one" /></div>
        <div className="erp-track"><span className="erp-bar bar-review">{ru ? 'Проверка' : 'Review'}</span><i className="erp-milestone milestone-two" /></div>
        <div className="erp-track"><span className="erp-bar bar-active">{ru ? 'В работе' : 'Active'}</span></div>
        <div className="erp-track"><span className="erp-bar bar-planned">{ru ? 'План' : 'Planned'}</span><i className="erp-milestone milestone-three" /></div>
        <svg className="erp-dependencies" viewBox="0 0 400 256" preserveAspectRatio="none" aria-hidden="true"><path d="M124 32H138V78H154M258 96H278V142H288M342 160H355V205H364"/><path d="m148 73 6 5-6 5m134 54 6 5-6 5m70 58 6 5-6 5"/></svg>
      </div></div>
    </div><div className="erp-legend"><span><i className="legend-dependency" />{ru ? 'Зависимость' : 'Dependency'}</span><span><i className="legend-milestone" />{ru ? 'Контрольная точка' : 'Milestone'}</span></div>
    <div className="erp-statuses">{(ru ? ['Готово', 'Проверка', 'В работе', 'План'] : ['Done', 'Review', 'Active', 'Planned']).map((status, i) => <span key={status}><i className={`erp-status-${i}`} />{status}</span>)}</div>
    <div className="erp-product-path"><Network size={20} aria-hidden="true" /><p><strong>BPMN</strong><ArrowRight size={14} aria-hidden="true" /><span>{ru ? 'Требования' : 'Requirements'}</span><ArrowRight size={14} aria-hidden="true" /><span>{ru ? 'Прототип' : 'Prototype'}</span><ArrowRight size={14} aria-hidden="true" /><strong>ERP</strong></p></div>
    <p className="erp-adoption">{ru ? 'Часть логики и интерфейсных решений вошла в продукт' : 'Some workflow and interface solutions were adopted in the product'}</p>
  </div>
}
