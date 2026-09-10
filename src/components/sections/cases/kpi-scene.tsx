import { delay, translate } from './scene-utils'
import { useState } from 'react'
import { ArrowRight, CircleCheck, Clock3, Database, Filter, Gauge, GitBranch, ListChecks, MessageSquare, Scale, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { IconBadge, Method, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function KpiScene({ item, language }: SceneProps) {
  const t=translate(language)
  const [selected,setSelected]=useState(0)
  const explanations=[t('Сроки: отделить личный результат от задержек на смежных этапах.','Timeliness: separate individual results from delays in adjacent stages.'),t('Качество: зафиксировать критерии оценки результата.','Quality: define the criteria for assessing outcomes.'),t('Объём: учитывать нагрузку вместе с качеством и сроками.','Volume: consider workload alongside quality and timing.'),t('Приоритеты: учитывать срочные задачи и дополнительную нагрузку.','Priorities: account for urgent tasks and additional workload.'),t('Внешние зависимости: учитывать отдельно, не приписывать сотруднику чужой результат.','External dependencies: consider separately; do not attribute others’ outcomes to the employee.')]

  return <article className="case-scene kpi-scene">
    <SceneHeader item={item} language={language} role={t('полностью разработала системы для дизайна и контента и складского блока', 'fully designed the systems for design and content and the warehouse unit')}/>
    <div className="kpi-proof"><span className="scene-number">02</span><div><h4>{t('Полноценные KPI-системы','Complete KPI systems')}</h4><p>{t('Ещё в двух блоках помогала: логистика и финансы.', 'Also contributed to two other units: logistics and finance.')}</p></div></div>
    <div className="kpi-engine">
      <div className="kpi-input"><p className="case-eyebrow">{t('Реальная работа', 'Actual work')}</p>{[[Clock3,t('Сроки','Timeliness')],[ShieldCheck,t('Качество','Quality')],[Gauge,t('Объём','Volume')],[ListChecks,t('Приоритеты и срочные задачи','Priorities and urgent tasks')],[GitBranch,t('Внешние зависимости','External dependencies')]].map(([Icon,label],i)=>{const I=Icon as typeof Clock3;return <button type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)} aria-controls="kpi-explanation" key={String(label)} className={`kpi-factor ${i===4?'external':''}`} style={delay(.25+i*.07)}><I size={18} aria-hidden="true"/><span>{String(label)}</span><ArrowRight size={15} aria-hidden="true"/></button>})}</div>
      <div className="kpi-filter"><div className="kpi-filter-core scene-enter" style={delay(.55)}><IconBadge icon={Filter}/><h4>{t('Может ли сотрудник влиять на результат?', 'Can the employee influence the outcome?')}</h4><span className="case-eyebrow">{t('Проверка управляемости','Controllability check')}</span></div><div className="kpi-external scene-enter" style={delay(.85)}><GitBranch size={19} aria-hidden="true"/><p>{t('Внешние факторы — отдельно', 'External factors — considered separately')}<small>{t('Учитываются как контекст, а не личный результат.', 'Treated as context, not individual performance.')}</small></p></div></div>
      <div className="kpi-model scene-enter" style={delay(1)}><div className="scene-system-label"><CircleCheck size={18}/>{t('KPI-модель', 'KPI model')}</div><h4>{t('Оценка, которую можно объяснить', 'An assessment you can explain')}</h4><ul>{[t('Управляемый результат','Controllable outcome'),t('Источник данных','Data source'),t('Расчёт и ограничения','Calculation and constraints')].map(x=><li key={x}><CircleCheck size={18}/>{x}</li>)}</ul><div className="kpi-model-footer"><Database size={20}/><span>{t('Сводки + основа автоматизации', 'Summaries + a basis for automation')}</span></div></div>
    </div>
    <div id="kpi-explanation" className="kpi-explanation" aria-live="polite"><Filter size={20} aria-hidden="true"/><p>{explanations[selected]}</p><span>{t('Выберите фактор ↑','Select a factor ↑')}</span></div>
    <Method item={item} language={language} icons={[MessageSquare, Scale, SlidersHorizontal]}/><Reconstruction language={language}/>
  </article>
}
