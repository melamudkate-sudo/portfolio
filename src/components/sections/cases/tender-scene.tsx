import { useState } from 'react'
import { ArrowRight, Building2, ClipboardList, FileText, FlaskConical, Handshake, Scale } from 'lucide-react'
import { delay, translate } from './scene-utils'
import { IconBadge, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function TenderScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [selected, setSelected] = useState(0)
  const steps = [
    { icon: ClipboardList, label: t('Общие вводные', 'Shared brief'), action: t('Задала одну основу', 'Set a common basis'), detail: t('Подготовила единые требования: компании должны были отвечать на одну и ту же задачу.', 'Prepared shared requirements so companies would respond to the same task.') },
    { icon: FileText, label: t('Предложения', 'Proposals'), action: t('Собрала условия', 'Collected the terms'), detail: t('Собирала коммерческие предложения и координировала коммуникацию с компаниями.', 'Collected commercial proposals and coordinated communication with the companies.') },
    { icon: Handshake, label: t('Переговоры', 'Negotiations'), action: t('Уточняла вводные', 'Clarified the inputs'), detail: t('Участвовала в переговорах и структурировала полученные вводные для сравнения.', 'Participated in negotiations and structured the resulting inputs for comparison.') },
    { icon: FlaskConical, label: t('Тестовые работы', 'Test projects'), action: t('Организовала проверку', 'Organised the tests'), detail: t('Организовывала тестовые проекты и собирала результаты: сравнение включало реальную работу.', 'Organised test projects and collected their results, bringing actual work into the comparison.') },
    { icon: Scale, label: t('Сравнение', 'Comparison'), action: t('Подготовила выбор', 'Prepared the decision'), detail: t('Структурировала предложения и результаты тестов в сравнительные материалы для выбора.', 'Structured proposals and test results into comparative materials for selection.') },
  ]
  return <article className="case-scene selection-scene">
    <SceneHeader item={item} language={language} role={t('сформировала пул, организовала отбор и подготовила материалы для решения', 'built the company pool, coordinated selection, and prepared decision materials')} />
    <div className="selection-visual">
      <div className="selection-pool"><div><span className="case-eyebrow">{t('Сформировала пул', 'Built the pool')}</span><strong className="scene-number">20</strong><h4>{t('компаний', 'companies')}</h4></div><div className="selection-companies" aria-hidden="true">{Array.from({length:20},(_,i)=><span key={i} style={delay(.2+i*.025)}><Building2 size={15}/></span>)}</div><p>{t('Одинаковые требования — сопоставимые ответы.', 'Shared requirements make responses comparable.')}</p></div>
      <div className="selection-dossier scene-enter" style={delay(.4)}>
        <div className="dossier-binding" aria-hidden="true"><i/><i/><i/></div>
        <div className="dossier-evidence"><span className="case-eyebrow">{t('Что собрала', 'Evidence I collected')}</span><h4>{t('Обещания + проверка работой', 'Proposals + evidence from work')}</h4><div className="dossier-papers">{[[FileText,t('Коммерческие предложения', 'Commercial proposals')],[Handshake,t('Вводные из переговоров', 'Negotiation inputs')],[FlaskConical,t('Результаты тестовых работ', 'Test-project results')]].map(([Icon,label],i)=>{const I=Icon as typeof FileText;return <div key={String(label)} className={(selected===i+1||selected===4)?'highlighted':''}><I size={23}/><span>{String(label)}</span><ArrowRight size={17}/></div>})}</div></div>
        <div className="dossier-choice"><IconBadge icon={Scale}/><span className="case-eyebrow">{t('Для решения', 'For the decision')}</span><h4>{t('Сравнить на одной основе', 'Compare on a common basis')}</h4><p>{t('Что предложили. Что уточнили. Что показали тесты.', 'What they proposed. What was clarified. What the tests showed.')}</p><strong>{t('Материалы для обоснованного выбора', 'Evidence for an informed choice')}</strong></div>
      </div>
    </div>
    <p className="scene-click-hint">{t('Мой путь отбора · нажмите на этап ↓', 'My selection process · choose a stage ↓')}</p><div className="selection-route" aria-label={t('Этапы отбора — выберите для пояснения', 'Selection stages — choose for details')}>{steps.map(({icon:Icon,label,action},i)=><button key={label} type="button" aria-pressed={selected===i} aria-controls="selection-detail" onClick={()=>setSelected(i)}><span className="selection-step"><span>0{i+1}</span><Icon size={20}/></span><strong>{label}</strong><small>{action}</small></button>)}</div>
    <div id="selection-detail" className="selection-detail" aria-live="polite"><span className="case-eyebrow">{t('Моя работа', 'My work')}</span><p key={selected}>{steps[selected].detail}</p></div>
    <Reconstruction language={language}/>
  </article>
}
