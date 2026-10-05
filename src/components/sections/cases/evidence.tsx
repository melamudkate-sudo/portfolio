import './evidence.css'
import { useId, useState } from 'react'
import { Plus, ArrowRight, Bell, FileText, GitBranch, Layers, CalendarDays, CircleCheck, Workflow } from 'lucide-react'
import type { Language } from '@/hooks/use-language'

type Props = { language: Language }

export function ScrumEvidence({ language }: Props) {
  const ru = language === 'ru'
  const [view, setView] = useState('board')
  const columns = [
    { name: 'Backlog', items: ru ? ['Локализация материалов', 'Видео: сценарий'] : ['Asset localisation', 'Video: script'] },
    { name: 'Planned', items: ru ? ['Упаковка · модель A', 'Инструкция · модель A'] : ['Packaging · model A', 'Manual · model A'] },
    { name: 'In progress', items: ru ? ['Карточка товара', 'Фото · модель B'] : ['Product listing', 'Photos · model B'] },
    { name: 'Done', items: ru ? ['Панель · модель A'] : ['Panel · model A'] },
  ]
  return <div className="evidence-app">
    <div className="evidence-toolbar"><span><Layers size={16} aria-hidden="true" />{ru ? 'Проектная работа' : 'Project delivery'}</span><span className="evidence-pill">{ru ? 'Спринт · 2 недели' : 'Sprint · 2 weeks'}</span></div>
    <div className="evidence-tabs" role="group" aria-label={ru ? 'Примеры рабочих материалов' : 'Sample working materials'}>{[['board', ru ? 'Scrum-доска' : 'Scrum board'], ['structure', ru ? 'Структура задач' : 'Task structure'], ['rules', ru ? 'Правила и сводки' : 'Rules & summaries']].map(([id, label]) => <button key={id} type="button" aria-pressed={view === id} aria-controls="scrum-evidence-content" onClick={() => setView(id)}>{label}</button>)}</div>
    <div id="scrum-evidence-content" className="evidence-content">
      {view === 'board' && <div className="evidence-board">{columns.map((column, index) => <div key={column.name} className="evidence-column"><h4><i className={`status-dot status-${index}`} />{column.name}<small>{column.items.length}</small></h4>{column.items.map((item) => <div key={item} className="evidence-task"><p>{item}</p></div>)}</div>)}</div>}
      {view === 'structure' && <div className="evidence-tree"><div className="tree-parent"><GitBranch size={18} aria-hidden="true" /><div><small>{ru ? 'Материнская задача' : 'Parent task'}</small><strong>{ru ? 'Материалы для модели A' : 'Assets for model A'}</strong></div></div>{(ru ? ['Панель → дизайн → согласование', 'Упаковка → макет → проверка', 'Инструкция → редактура → локализация', 'Карточка товара → контент → готовность'] : ['Panel → design → approval', 'Packaging → layout → review', 'Manual → editing → localisation', 'Product listing → content → readiness']).map((item, i) => <div className="tree-child" key={item}><span>0{i + 1}</span>{item}</div>)}</div>}
      {view === 'rules' && <div className="evidence-notes"><div><FileText size={21} aria-hidden="true" /><h4>{ru ? 'Правила работы команды' : 'Team working rules'}</h4><p>{ru ? 'Задача → декомпозиция → оценка → спринт → проверка результата' : 'Task → breakdown → estimate → sprint → review'}</p><div className="evidence-rituals"><span>Planning</span><span>Daily</span><span>Retrospective</span></div></div><div><Bell size={21} aria-hidden="true" /><h4>{ru ? 'Регулярная сводка' : 'Recurring summary'}</h4><p>{ru ? 'Ближайшие сроки · ответственные · задачи с риском задержки' : 'Upcoming deadlines · owners · tasks at risk of delay'}</p><span className="evidence-pill">{ru ? 'Автоматическое уведомление' : 'Automatic notification'}</span></div></div>}
    </div>

  </div>
}

export function ProductionEvidence({ language }: Props) {
  const ru = language === 'ru'
  const rows = ru ? ['Арт-работы', 'Инструкции', 'Рецепты', 'Фото и видео', 'Карточки товаров'] : ['Artwork', 'Manuals', 'Recipes', 'Photo & video', 'Product listings']
  return <div className="evidence-app">
    <div className="evidence-toolbar"><span><CalendarDays size={16} aria-hidden="true" />Production plan</span><span className="evidence-pill">{ru ? '30 дней' : '30 days'}</span></div>
    <div className="evidence-content">
      <div className="pipeline-metrics"><div><strong>30</strong><span>{ru ? 'дней планирования' : 'day planning horizon'}</span></div><div><strong>10</strong><span>{ru ? 'рецептов в неделю' : 'recipes per week'}</span></div><div><strong>5</strong><span>{ru ? 'публикаций в неделю' : 'posts per week'}</span></div></div>
      <div className="pipeline-scroll" tabIndex={0} role="region" aria-label={ru ? 'План потоков — прокрутите по горизонтали' : 'Stream plan — scroll horizontally'}><div className="pipeline-table" role="table" aria-label={ru ? 'Пример плана производственных потоков' : 'Sample production stream plan'}>
        <div className="pipeline-row pipeline-head" role="row"><span role="columnheader">{ru ? 'Поток' : 'Stream'}</span>{[1, 2, 3, 4].map(i => <span role="columnheader" key={i}>{ru ? 'Нед.' : 'Wk'} {i}</span>)}</div>
        {rows.map((row, i) => <div className="pipeline-row" role="row" key={row}><span role="rowheader">{row}</span>{[0, 1, 2, 3].map(week => <span role="cell" key={week} className={`pipeline-cell ${week === i % 3 ? 'active' : week === (i % 3) + 1 ? 'next' : ''}`}>{week === i % 3 ? (ru ? 'В работе' : 'In progress') : week === (i % 3) + 1 ? (ru ? 'Проверка' : 'Review') : '—'}</span>)}</div>)}
      </div>
      </div><div className="pipeline-dependency"><GitBranch size={17} aria-hidden="true" /><p>{ru ? 'Готовность инструкции → локализация → карточка товара' : 'Manual readiness → localisation → product listing'}</p></div>
    </div>

  </div>
}

export function AutomationEvidence({ language }: Props) {
  const ru = language === 'ru'
  const [view, setView] = useState('leave')
  return <div className="evidence-app">
    <div className="evidence-toolbar"><span><Workflow size={16} aria-hidden="true" />Internal tools</span><span className="evidence-pill">Sheets + Apps Script</span></div>
    <div className="evidence-tabs" role="group" aria-label={ru ? 'Примеры внутренних инструментов' : 'Sample internal tools'}>{[['leave', ru ? 'Отпуска' : 'Leave'], ['deadlines', ru ? 'Сводка дедлайнов' : 'Deadline summary']].map(([id, label]) => <button key={id} type="button" aria-pressed={view === id} aria-controls="automation-evidence-content" onClick={() => setView(id)}>{label}</button>)}</div>
    <div id="automation-evidence-content" className="evidence-content">
      {view === 'leave' ? <><div className="leave-overview"><div><small>{ru ? 'Доступно дней' : 'Days available'}</small><strong>14<span>{ru ? 'дн.' : 'days'}</span></strong><p>{ru ? 'Автоматический расчёт' : 'Automatic calculation'}</p></div><div className="leave-request"><span className="evidence-pill">{ru ? 'На согласовании' : 'Awaiting approval'}</span><h4>{ru ? 'Заявка · сотрудник A' : 'Request · employee A'}</h4><p>{ru ? '12–18 ноября · 7 дней' : '12–18 November · 7 days'}</p><small>{ru ? 'Проверка остатка пройдена' : 'Balance check passed'}</small></div></div><div className="automation-flow">{(ru ? ['Заявка', 'Проверка дней', 'Согласование', 'Уведомление'] : ['Request', 'Balance check', 'Approval', 'Notification']).map((label, i) => <span key={label}>{i < 2 ? <CircleCheck size={14} aria-hidden="true" /> : <span className="flow-index">{i + 1}</span>}{label}{i < 3 && <ArrowRight size={12} aria-hidden="true" />}</span>)}</div><div className="notification-preview"><Bell size={18} aria-hidden="true" /><div><strong>{ru ? 'Руководителю' : 'To the manager'}</strong><p>{ru ? 'Новая заявка готова к согласованию. Пересечения отпусков проверены.' : 'A new request is ready for approval. Leave overlaps have been checked.'}</p></div></div></> : <div className="deadline-demo"><p className="hr-eyebrow">{ru ? 'Автоматическая сводка' : 'Automatic summary'}</p><h4>{ru ? 'Ближайшие дедлайны' : 'Upcoming deadlines'}</h4>{(ru ? [['Инструкция · модель A', 'Редактор', 'Завтра'], ['Макет упаковки', 'Дизайнер', 'Через 3 дня'], ['Видео · согласование', 'Продакт', 'Нужна проверка']] : [['Manual · model A', 'Editor', 'Tomorrow'], ['Packaging layout', 'Designer', 'In 3 days'], ['Video · approval', 'Product manager', 'Review needed']]).map(([task, owner, status], i) => <div key={task}><span>{task}<small>{owner}</small></span><span className={i === 2 ? 'deadline-risk' : ''}>{status}</span></div>)}<p>{ru ? 'Реестр → проверка дат и статусов → сводка → уведомление' : 'Register → date and status check → summary → notification'}</p></div>}
    </div>
  </div>
}


function ApprovalDiagram({ language }: Props) {
  const ru = language === 'ru'
  const markerId = useId().replace(/:/g, '')
  return <svg className="approval-diagram" viewBox="0 0 600 170" role="img" aria-label={ru ? 'Обобщённая процессная схема: материал, проверка, согласование, передача; правки возвращаются в работу' : 'General process diagram: asset, review, approval and handoff; revisions return to work'}>
    <defs><marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#7c8da9" /></marker></defs>
    <text x="0" y="14" fill="#7c8da9" fontSize="11">{ru ? 'Согласование и передача материалов' : 'Asset approval and handoff'}</text>
    <g stroke="#7c8da9" strokeWidth="1" fill="none" markerEnd={`url(#${markerId})`}><path d="M29 72H56" /><path d="M166 72H193" /><path d="M303 72H332" /><path d="M396 72H443" /><path d="M553 72H576" /><path d="M364 104V140H110V97" /></g>
    <circle cx="18" cy="72" r="11" fill="none" stroke="#7c8da9" />
    <rect x="56" y="47" width="110" height="50" rx="8" fill="#f3f6fe" stroke="#a7b7d3" /><rect x="193" y="47" width="110" height="50" rx="8" fill="#f3f6fe" stroke="#a7b7d3" />
    <path d="M364 40 396 72 364 104 332 72z" fill="#eaf0ff" stroke="#6e83ee" /><path d="M356 64 372 80M372 64 356 80" stroke="#6e83ee" />
    <rect x="443" y="47" width="110" height="50" rx="8" fill="#f3f6fe" stroke="#a7b7d3" /><circle cx="587" cy="72" r="10" fill="none" stroke="#7c8da9" strokeWidth="3" />
    <g fill="#344561" fontSize="12" textAnchor="middle"><text x="111" y="77">{ru ? 'Материал' : 'Asset'}</text><text x="248" y="77">{ru ? 'Проверка' : 'Review'}</text><text x="498" y="77">{ru ? 'Передача' : 'Handoff'}</text></g>
    <g fill="#7c8da9" fontSize="10"><text x="401" y="62">{ru ? 'готово' : 'ready'}</text><text x="186" y="132">{ru ? 'нужны правки → вернуть в работу' : 'revisions needed → return to work'}</text><text x="322" y="30">{ru ? 'Согласовано?' : 'Approved?'}</text></g>
  </svg>
}

export function LaunchEvidence({ language }: Props) {
  const ru = language === 'ru'
  const [selected, setSelected] = useState(0)
  const stages = ru ? ['Новая модель', 'Панель и упаковка', 'Инструкция и рецепты', 'Контент и карточка', 'Видео', 'Локализация'] : ['New model', 'Panel & packaging', 'Manual & recipes', 'Content & listing', 'Video', 'Localisation']
  const details = ru ? ['Вводные от продукта, состав материалов и требования к запуску.', 'Дизайн, проверка требований и передача согласованных макетов.', 'Подготовка, редактура и согласование материалов до передачи дальше.', 'Готовые материалы, требования каналов и проверка полноты.', 'Сценарий, производство, правки и передача результата.', 'RU / EN / ZH: приоритет материалов, трудоёмкость, ресурсы и готовность.'] : ['Product inputs, asset scope and launch requirements.', 'Design, requirements review and handoff of approved layouts.', 'Preparation, editing and approval before the next handoff.', 'Ready assets, channel requirements and completeness checks.', 'Script, production, revisions and delivery.', 'RU / EN / ZH: asset priorities, effort, resources and readiness.']
  return <div className="evidence-app"><div className="evidence-toolbar"><span><GitBranch size={16} aria-hidden="true" />Product workflow</span><span className="evidence-pill">RU / EN / ZH</span></div><div className="evidence-content"><p className="workflow-intro">{ru ? 'От новой модели до готовых материалов' : 'From a new model to launch-ready assets'}</p><div className="launch-flow" role="group" aria-label={ru ? 'Этапы процесса' : 'Process stages'}>{stages.map((stage, i) => <button key={stage} type="button" aria-pressed={selected === i} aria-controls="launch-detail" onClick={() => setSelected(i)}><small>0{i + 1}</small><strong>{stage}</strong><ArrowRight size={16} aria-hidden="true" /></button>)}</div><div id="launch-detail" className="launch-detail" aria-live="polite"><strong>{stages[selected]}</strong><p>{details[selected]}</p></div><details className="approval-disclosure"><summary>{ru ? 'Схема согласования и передачи' : 'Approval and handoff diagram'}<Plus size={14} aria-hidden="true" /></summary><ApprovalDiagram language={language} /></details><p className="workflow-note">{ru ? 'Схема обобщает путь продукта; отдельные работы могут идти параллельно.' : 'This diagram summarises the product journey; some work can run in parallel.'}</p></div></div>
}
