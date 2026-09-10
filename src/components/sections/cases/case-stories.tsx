import { ArrowDown, ArrowRight, Check, GitBranch, UsersRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Case } from './data'
import type { Language } from '@/hooks/use-language'

const ROLES = [
  ['Анализ сценариев и экономическое обоснование', 'Scenario analysis and business case'],
  ['Полный цикл · от проблемы до внедрения в Bitrix24', 'Full cycle · from problem to launch in Bitrix24'],
  ['Анализ и прототипирование · совместно с аналитиками и IT', 'Analysis and prototyping · with analysts and IT'],
  ['Разработка систем для дизайна, контента и склада', 'System design for design, content, and warehouse teams'],
  ['Операционная координация · от отбора до закрывающих документов', 'Operations coordination · from selection to closing documents'],
]

function StoryVisual({ item, language }: { item: Case; language: Language }) {
  const t = (ru: string, en: string) => language === 'ru' ? ru : en
  if (item.type === 'scenario') return <>
    <div className="case-visual-heading"><span>{t('Выбор производственной модели', 'Choosing a production model')}</span><span>02</span></div>
    <div className="case-scenarios">
      {[
        [t('Подряд', 'Agency'), t('Быстрее старт', 'Faster start'), t('Готовая команда; зависимость от внешних исполнителей.', 'An established team; dependence on external suppliers.')],
        [t('Перераспределение', 'Redistribution'), t('Частично внутри', 'Partly in-house'), t('Альтернативный сценарий с перераспределением функций.', 'An alternative scenario that redistributes responsibilities.')],
        [t('Внутри команды', 'In-house'), t('Больше управляемости', 'More control'), t('Штатная модель дешевле подрядной; нужна инфраструктура.', 'The staff model costs less than contractors; infrastructure is needed.')],
      ].map(([title, lead, detail], i) => <div key={title} className={i === 2 ? 'case-scenario is-selected' : 'case-scenario'}><span className="case-eyebrow">0{i + 1}</span><h4>{title}</h4><p className="text-primary">{lead}</p><p>{detail}</p></div>)}
    </div>
    <div className="case-big-fact"><strong>≈45%</strong><p>{t('потенциальная экономия', 'potential savings')}<small>{t('Расчёт относительно базового сценария, не полученная экономия.', 'Modelled against the baseline, not realised savings.')}</small></p></div>
    <p className="case-visual-note">{t('Критерии: стоимость единицы · мощность · скорость · правки · риски', 'Criteria: unit cost · capacity · speed · revisions · risks')}</p>
  </>
  if (item.type === 'queue') return <>
    <div className="case-visual-heading"><span>{t('Доступ без координатора', 'Access without a coordinator')}</span><span>03</span></div>
    <div className="case-queue">
      {[t('Запросить доступ', 'Request access'), t('Занять место в очереди', 'Join the queue'), t('Получить уведомление', 'Receive a notification'), t('Использовать и освободить', 'Use and release')].map((label, i) => <div className="case-queue-step" key={label}><span>0{i + 1}</span><p>{label}</p>{i === 3 ? <Check size={18} /> : <ArrowDown size={18} />}</div>)}
      <p className="case-loop">↳ {t('Освобождение запускает следующий доступ', 'Release triggers the next access')}</p>
    </div>
    <div className="case-big-fact"><strong>÷2</strong><p>{t('конфликтов и повторных уточнений', 'conflicts and repeat clarification requests')}<small>{t('Несколько рабочих часов команды сэкономлено еженедельно.', 'Several team work hours saved every week.')}</small></p></div>
  </>
  if (item.type === 'product') return <>
    <div className="case-visual-heading"><span>{t('От функций к сценарию', 'From features to a workflow')}</span><GitBranch size={18} /></div>
    <div className="case-product">
      <div className="case-feature-list">{[t('Функции', 'Features'), t('Роли', 'Roles'), t('Этапы', 'Stages')].map(x => <span key={x}>{x}</span>)}</div>
      <ArrowDown className="mx-auto my-4 text-primary" size={22} />
      <div className="case-goal">{t('Исходная бизнес-цель', 'Original business goal')}</div>
      <div className="case-branches"><div>{t('Сценарии ролей', 'Role scenarios')}<small>{t('Ответственность и передачи', 'Ownership and handoffs')}</small></div><div>{t('Параллельные ветки', 'Parallel workstreams')}<small>{t('Зависимости и риски', 'Dependencies and risks')}</small></div></div>
      <div className="case-goal subtle">{t('Контрольные точки и согласования', 'Checkpoints and approvals')}</div>
      <p className="case-prototype">{t('Интерактивный прототип', 'Interactive prototype')} <ArrowRight size={16} /> {t('План реализации', 'Implementation plan')}</p>
    </div>
    <p className="case-visual-note">{t('Значительная часть логики включена аналитиками и IT в дальнейший план.', 'Analysts and IT included a substantial part of the logic in the next implementation plan.')}</p>
  </>
  if (item.type === 'kpi') return <>
    <div className="case-visual-heading"><span>{t('Оценивать то, на что можно влиять', 'Assess what people can influence')}</span><span>05</span></div>
    <div className="case-kpi">
      <div className="case-kpi-core"><span className="case-eyebrow">{t('Под контролем сотрудника', 'Employee-controlled')}</span><div>{[t('Сроки', 'Timeliness'), t('Качество', 'Quality'), t('Объём', 'Volume'), t('Приоритеты', 'Priorities')].map(x => <span key={x}><Check size={15} />{x}</span>)}</div></div>
      <div className="case-kpi-context">{t('Внешние зависимости', 'External dependencies')}<small>{t('Учитываются отдельно от управляемого результата', 'Considered separately from controllable outcomes')}</small></div>
      <p className="case-formula">{t('Источники данных → расчёт → прозрачная оценка', 'Data sources → calculation → transparent assessment')}</p>
    </div>
    <div className="case-big-fact"><strong>02</strong><p>{t('полноценные KPI-системы', 'complete KPI systems')}<small>{t('Дизайн и контент · склад. Участие ещё в двух блоках: логистика и финансы.', 'Design and content · warehouse. Also contributed to logistics and finance.')}</small></p></div>
  </>
  return <>
    <div className="case-visual-heading"><span>{t('Единый контур координации', 'One coordination network')}</span><UsersRound size={18} /></div>
    <div className="case-network"><div className="case-network-hub"><strong>{t('до 8', 'up to 8')}</strong><span>{t('подрядчиков параллельно', 'contractors in parallel')}</span></div><div className="case-network-orbit">{[t('ТЗ и требования', 'Briefs and requirements'), t('Сроки и стоимость', 'Timing and cost'), t('Правки и качество', 'Revisions and quality'), t('Передача материалов', 'Material handoff')].map(x => <span key={x}>{x}</span>)}</div></div>
    <div className="case-contract-stages">{[t('Отбор', 'Selection'), t('Производство', 'Production'), t('Закрытие', 'Closeout')].map((x, i) => <span key={x}><small>0{i+1}</small>{x}</span>)}</div>
    <p className="case-visual-note">{t('Согласование интересов заказчиков и исполнителей: бюджет, качество, сроки.', 'Aligning stakeholders and suppliers on budget, quality, and timing.')}</p>
  </>
}

export function CaseStory({ item, language }: { item: Case; language: Language }) {
  const reduced = useReducedMotion()
  const role = ROLES[Number(item.number) - 2][language === 'ru' ? 0 : 1]
  return <article className={`case-story case-story-${item.type}`}>
    <header className="case-story-header">
      <p className="case-eyebrow">{item.number} <span className="mx-2">—</span> {item.category[language]}</p>
      <h3>{item.title[language]}</h3>
      <p className="case-role">{language === 'ru' ? 'Моя роль' : 'My role'} · {role}</p>
      <p className="case-lead">{item.lead[language]}</p>
    </header>
    <motion.div className="case-story-visual" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.38 }}><StoryVisual item={item} language={language} /></motion.div>
    <div className="case-story-detail"><p className="case-context">{item.context[language]}</p><ol>{item.actions.map((action, index) => <motion.li key={index} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 + index * .07, duration: .3 }}><span>0{index+1}</span>{action[language]}</motion.li>)}</ol><div className="case-result"><span className="case-eyebrow">{language === 'ru' ? 'Результат' : 'Outcome'}</span><p>{item.result[language]}</p></div></div>
  </article>
}
