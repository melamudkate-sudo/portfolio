import { useState } from 'react'
import { ArrowRight, Building2, ClipboardList, FileText, FlaskConical, Handshake, ListChecks, Scale, Search } from 'lucide-react'
import { delay, translate } from './scene-utils'
import { IconBadge, Method, Outcome, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function TenderScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [selected, setSelected] = useState(0)
  const steps = [
    { icon: ClipboardList, label: t('Единые требования', 'Shared requirements'), detail: t('Подготовила единые вводные, чтобы предложения можно было сопоставить.', 'Prepared shared inputs so proposals could be compared.') },
    { icon: FileText, label: t('Коммерческие предложения', 'Commercial proposals'), detail: t('Координировала коммуникацию и собирала КП от компаний.', 'Coordinated communication and collected companies’ commercial proposals.') },
    { icon: Handshake, label: t('Переговоры', 'Negotiations'), detail: t('Участвовала в переговорах и структурировала полученные вводные.', 'Participated in negotiations and structured the resulting inputs.') },
    { icon: FlaskConical, label: t('Тестовые проекты', 'Test projects'), detail: t('Организовывала тестовые работы и собирала результаты для анализа.', 'Organised test projects and collected results for analysis.') },
    { icon: Scale, label: t('Сравнительный анализ', 'Comparative analysis'), detail: t('Структурировала результаты и готовила сравнительные материалы для выбора.', 'Structured results and prepared comparative materials for selection.') },
  ]
  return <article className="case-scene tender-scene">
    <SceneHeader item={item} language={language} role={t('организация отбора, коммуникация, участие в переговорах и сравнительный анализ', 'selection coordination, communications, participation in negotiations, and comparison')} />
    <div className="tender-pool"><IconBadge icon={Building2}/><div><strong className="scene-number">20</strong><p>{t('компаний в исходном пуле', 'companies in the initial pool')}</p></div><div className="tender-pool-map" aria-hidden="true">{Array.from({length:20}, (_,i) => <span key={i}/>)}</div></div>
    <div className="tender-path">{steps.map(({ icon: Icon, label }, index) => <button key={label} type="button" className="scene-enter" style={delay(.25 + index * .1)} aria-pressed={selected === index} aria-controls="tender-detail" onClick={() => setSelected(index)}><span className="case-eyebrow">0{index + 1}</span><Icon size={25} aria-hidden="true"/><strong>{label}</strong><ArrowRight size={16} aria-hidden="true"/></button>)}</div>
    <div className="tender-decision"><div id="tender-detail" aria-live="polite"><span className="case-eyebrow">{t('Моя работа на этапе', 'My work at this stage')}</span><h4>{steps[selected].label}</h4><p>{steps[selected].detail}</p></div><Outcome label={t('Основа решения', 'Decision basis')}>{item.result[language]}</Outcome></div>
    <Method item={item} language={language} icons={[Search, Handshake, ListChecks]}/><Reconstruction language={language}/>
  </article>
}
