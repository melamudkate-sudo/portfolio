import { delay, translate } from './scene-utils'
import { useState } from 'react'
import { Clapperboard, Split, Video, Coins, Gauge, ShieldCheck, Scale, Check } from 'lucide-react'
import { IconBadge, SceneHeader, type SceneProps } from './scene-primitives'

export function ScenarioScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [focused, setFocused] = useState(2)
  const models = [
    { name: t('Подряд', 'Outsource'), icon: Clapperboard, cue: t('Готовая команда', 'An established team'), cost: t('Анализ внешнего пула', 'External cost-pool analysis'), capacity: t('Внешняя команда', 'External team'), control: t('Зависимость от подрядчика', 'Supplier dependency'), tradeoff: t('Быстрее запустить производство', 'Faster production launch') },
    { name: t('Гибрид', 'Hybrid'), icon: Split, cue: t('Часть функций внутри', 'Some functions in-house'), cost: t('Расчёт смешанных затрат', 'Mixed-cost calculation'), capacity: t('Перераспределение функций', 'Redistributed responsibilities'), control: t('Разделение ответственности', 'Shared responsibilities'), tradeoff: t('Альтернатива в сравнении', 'An alternative in the comparison') },
    { name: t('Внутри команды', 'In-house'), icon: Video, cue: t('Рекомендованная модель', 'Recommended model'), cost: t('Разработанная модель', 'Developed cost model'), capacity: t('Состав команды и ресурсы', 'Team composition and resources'), control: t('Больше управляемости', 'More control'), tradeoff: t('Инфраструктура и модель запуска', 'Infrastructure and launch model') },
  ]
  return <article className="case-scene scenario-scene production-scene">
    <SceneHeader item={item} language={language} role={t('экономическое обоснование, ресурсная модель и подготовка запуска', 'business case, resource modelling, and launch preparation')} />
    <div className="production-economics scene-enter" style={delay(.3)}>
      <div><span className="case-eyebrow">{t('Внешний пул затрат', 'External cost pool')}</span><strong className="scene-number">{t('5,4', '5.4')}<small>{t('млн ₽', 'M RUB')}</small></strong></div>
      <span className="production-arrow" aria-hidden="true">→</span>
      <div><span className="case-eyebrow">{t('Разработанная модель', 'Developed model')}</span><strong className="scene-number">{t('1,7', '1.7')}<small>{t('млн ₽', 'M RUB')}</small></strong></div>
      <div className="production-impact"><span>{t('до', 'up to')}</span><strong>−69%</strong><p>{t('потенциальных затрат', 'potential cost reduction')}</p></div>
    </div>
    <div className="scenario-comparison" aria-label={t('Сравнение трёх моделей производства', 'Comparison of three production models')}>
      {models.map((model, i) => <div key={model.name} className={`scenario-option scene-enter ${i === 2 ? 'recommended' : 'alternative'} ${focused === i ? 'is-focused' : ''}`} style={delay(.25 + i * .1)}>
        <div className="scenario-option-top"><IconBadge icon={model.icon} quiet={i !== 2} /><span>{i === 2 ? <Check aria-label={t('Рекомендация', 'Recommendation')} size={20} /> : `0${i+1}`}</span></div>
        <h4><button type="button" onClick={() => setFocused(i)} aria-pressed={focused === i} aria-controls="scenario-focus">{model.name}</button></h4><p className="scenario-cue">{model.cue}</p>
        <dl className="scenario-criteria scene-enter" style={delay(.65)}>{[[Coins,t('Стоимость', 'Cost'),model.cost],[Gauge,t('Мощность', 'Capacity'),model.capacity],[ShieldCheck,t('Контроль', 'Control'),model.control]].map(([Icon, label, value]) => { const I = Icon as typeof Coins; return <div key={String(label)}><dt><I size={15} aria-hidden="true" />{String(label)}</dt><dd>{String(value)}</dd></div> })}</dl>
        <p className="scenario-tradeoff">{model.tradeoff}</p>
      </div>)}
    </div>
    <div id="scenario-focus" className="scenario-focus" aria-live="polite"><Scale aria-hidden="true" size={20}/><p><strong>{models[focused].name}</strong> · {models[focused].tradeoff}. {focused === 2 ? t('Цена и управляемость — аргументы в пользу модели.', 'Cost and control support this choice.') : focused === 0 ? t('Скорость старта — аргумент в пользу готовой команды.', 'Launch speed is the case for an established team.') : t('Часть функций остаётся у внешних исполнителей.', 'Some responsibilities remain with external suppliers.')}</p><span>{t('Выберите сценарий ↑', 'Select a scenario ↑')}</span></div>
    <div className="production-launch"><div><strong>7</strong><span>{t('вариантов площадок', 'premises options')}</span></div><p>{t('Проработала состав команды, оснащение и требования к помещениям. Подготовлена модель запуска и основа для проработки инфраструктуры.', 'Developed team composition, equipment needs, and premises requirements. Prepared the launch model and a basis for infrastructure planning.')}</p></div>
    <p className="scene-footnote">{t('Показатели — расчётная модель, не полученная экономия. Схема сравнения реконструирована.', 'Figures describe a cost model, not realised savings. Reconstructed comparison schematic.')}</p>
  </article>
}
