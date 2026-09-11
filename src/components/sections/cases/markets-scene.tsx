import { useState } from 'react'
import { ArrowRight, Boxes, CheckCheck, Factory, FileText, Globe2, Languages, Link2, Palette, Settings2 } from 'lucide-react'
import { delay, translate } from './scene-utils'
import { IconBadge, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function MarketsScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [selected, setSelected] = useState(1)
  const teams = [
    { name: t('Продукт', 'Product'), icon: Boxes, detail: t('Связывала продуктовые вводные с подготовкой моделей и материалов.', 'Connected product inputs with model and material preparation.') },
    { name: t('Операции', 'Operations'), icon: Settings2, detail: t('Координировала зависимости: что нужно подготовить и чья работа связана со следующим шагом.', 'Coordinated dependencies: what needs preparing and whose work connects to the next step.') },
    { name: t('Производство', 'Production'), icon: Factory, detail: t('Синхронизировала производственную подготовку с требованиями к материалам.', 'Aligned production preparation with material requirements.') },
    { name: t('Дизайн', 'Design'), icon: Palette, detail: t('Включала дизайн-материалы в общую подготовку линейки и локализацию.', 'Connected design materials to product-line preparation and localisation.') },
    { name: t('Контент', 'Content'), icon: FileText, detail: t('Связывала подготовку контента и локализацию с готовностью каждой модели.', 'Connected content preparation and localisation with each model’s readiness.') },
  ]
  return <article className="case-scene rollout-scene">
    <SceneHeader item={item} language={language} role={t('связывала работу участников и контролировала готовность', 'connected participants’ work and tracked readiness')} />
    <div className="rollout-visual">
      <div className="rollout-lineup scene-enter" style={delay(.25)}>
        <span className="case-eyebrow">{t('Масштаб подготовки', 'Preparation scope')}</span>
        <div className="rollout-count"><strong className="scene-number">≈10</strong><Globe2 size={36} aria-hidden="true"/></div>
        <h4>{t('моделей для зарубежных рынков', 'models for international markets')}</h4>
        <div className="rollout-stack" aria-hidden="true"><span/><span/><div><Boxes size={30}/><span>{t('Линейка продукции', 'Product line')}</span><small>{t('Несколько SKU', 'Multiple SKUs')}</small></div></div>
        <p>{t('У каждой модели — свои материалы и связанные задачи.', 'Each model brings its own materials and connected tasks.')}</p>
      </div>
      <div className="rollout-coordination">
        <div className="rollout-question"><span className="case-eyebrow">{t('Задача', 'Challenge')}</span><h4>{t('Как собрать работу разных участников в готовую линейку?', 'How does everyone’s work come together in a ready product line?')}</h4></div>
        <p className="scene-click-hint">{t('Выберите направление — покажу связи ↓', 'Choose a function to see the connections ↓')}</p><div className="rollout-teams" aria-label={t('Выберите направление', 'Choose a function')}>{teams.map(({ name, icon: Icon }, index) => <button key={name} type="button" aria-pressed={selected === index} aria-controls="rollout-detail" onClick={() => setSelected(index)}><Icon size={24} aria-hidden="true"/><span>{name}</span></button>)}</div>
        <div className="rollout-connections" aria-hidden="true"><svg viewBox="0 0 600 48" preserveAspectRatio="none">{[60,180,300,420,540].map((x,i)=><path key={x} d={`M${x} 0 V12 Q${x} 25 300 25 V48`} className={i===selected?'active':''}/>)}</svg><span><Link2 size={18}/></span></div>
        <div id="rollout-detail" className="rollout-detail" aria-live="polite"><span className="case-eyebrow">{t('Моя координация', 'My coordination')}</span><p key={selected}>{teams[selected].detail}</p></div>
        <div className="rollout-checks">{[[FileText,t('Материалы', 'Materials'),t('Соответствуют требованиям?', 'Meet the requirements?')],[Languages,t('Локализация', 'Localisation'),t('Адаптированы для рынка?', 'Adapted for the market?')],[Link2,t('Зависимости', 'Dependencies'),t('Учтены связанные задачи?', 'Connected tasks accounted for?')]].map(([Icon,title,question])=>{const I=Icon as typeof FileText;return <div key={String(title)}><I size={22} aria-hidden="true"/><div><strong>{String(title)}</strong><p>{String(question)}</p></div></div>})}</div>
      </div>
    </div>
    <div className="rollout-takeaway"><IconBadge icon={CheckCheck}/><div><h4>{t('Одна картина готовности', 'One shared view of readiness')}</h4><p>{t('Контролировала материалы, локализацию и зависимости по линейке. Речь о подготовке к выходу на рынки.', 'Tracked materials, localisation, and dependencies across the line. This work concerns preparation for market entry.')}</p></div><ArrowRight size={26} aria-hidden="true"/></div>
    <Reconstruction language={language}/>
  </article>
}
