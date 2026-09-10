import { useState } from 'react'
import { Boxes, CheckCheck, Factory, FileText, Globe2, Languages, Link2, Palette, Settings2 } from 'lucide-react'
import { delay, translate } from './scene-utils'
import { IconBadge, Method, Outcome, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function MarketsScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [selected, setSelected] = useState(0)
  const functions = [
    { name: 'Product', icon: Boxes, detail: t('Продуктовые вводные связываются с подготовкой линейки и нескольких SKU.', 'Product inputs connect to preparation of the line and multiple SKUs.') },
    { name: 'Operations', icon: Settings2, detail: t('Зависимости и контроль готовности объединяют работу всех участников.', 'Dependencies and readiness tracking connect the work of all participants.') },
    { name: 'Production', icon: Factory, detail: t('Производственная подготовка синхронизируется с требованиями к материалам.', 'Production preparation is aligned with material requirements.') },
    { name: 'Design', icon: Palette, detail: t('Дизайн-материалы учитываются в общей подготовке и локализации.', 'Design materials are included in shared preparation and localisation.') },
    { name: 'Content', icon: FileText, detail: t('Контент и локализация связаны с готовностью материалов по моделям.', 'Content and localisation connect to material readiness for each model.') },
  ]
  return <article className="case-scene markets-scene">
    <SceneHeader item={item} language={language} role={t('кросс-функциональная координация подготовки линейки', 'cross-functional coordination of product-line preparation')} />
    <div className="markets-proof"><IconBadge icon={Globe2}/><strong className="scene-number">≈10</strong><div><h4>{t('моделей в подготовке', 'models in preparation')}</h4><p>{t('к зарубежным рынкам', 'for international markets')}</p></div></div>
    <div className="markets-system">
      <div className="markets-functions" aria-label={t('Участники подготовки', 'Preparation participants')}>{functions.map(({ name, icon: Icon }, index) => <button key={name} type="button" aria-pressed={selected === index} aria-controls="markets-detail" onClick={() => setSelected(index)}><Icon size={21} aria-hidden="true"/><span>{name}</span></button>)}</div>
      <div className="markets-readiness scene-enter" style={delay(.35)}>
        <div className="markets-models"><p className="case-eyebrow">{t('Несколько SKU', 'Multiple SKUs')}</p><div aria-hidden="true">{['A', 'B', 'C'].map(label => <span key={label}><Boxes size={22}/>SKU {label}</span>)}</div><small>{t('Условные обозначения моделей', 'Illustrative model labels')}</small></div>
        <div className="markets-track">{[[FileText,t('Требования к материалам', 'Material requirements')],[Languages,t('Локализация', 'Localisation')],[Link2,t('Зависимости', 'Dependencies')],[CheckCheck,t('Контроль готовности', 'Readiness tracking')]].map(([Icon,label], index) => { const I = Icon as typeof FileText; return <div className="scene-enter" key={String(label)} style={delay(.45 + index * .12)}><I size={23} aria-hidden="true"/><span>{String(label)}</span></div> })}</div>
      </div>
      <div id="markets-detail" className="scenario-focus" aria-live="polite"><Link2 size={20} aria-hidden="true"/><p><strong>{functions[selected].name}</strong> · {functions[selected].detail}</p></div>
    </div>
    <Outcome label={t('Фокус проекта', 'Project focus')}>{t('Общая картина готовности линейки: материалы, локализация и зависимости между функциями.', 'A shared view of product-line readiness: materials, localisation, and cross-functional dependencies.')}</Outcome>
    <Method item={item} language={language} icons={[Settings2, Languages, CheckCheck]}/><Reconstruction language={language}/>
  </article>
}
