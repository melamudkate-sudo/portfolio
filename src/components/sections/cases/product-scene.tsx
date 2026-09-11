import { delay, translate } from './scene-utils'
import { useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowRight, Blocks, CircleCheck, Clock3, FileBarChart2, GitBranch, Layers3, MousePointer2, Route, Target, TriangleAlert, UsersRound } from 'lucide-react'
import { IconBadge, Outcome, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function ProductScene({ item, language }: SceneProps) {
  const t = translate(language)
  const [selected, setSelected] = useState(0)
  const explanations = [t('У задачи должен быть ответственный: кто выполняет работу и кто получает её дальше.', 'Each task needs an owner: who does the work and who receives it next.'), t('Переход между этапами связывает статус задачи, следующего участника и сроки.', 'A stage transition connects task status, the next participant, and deadlines.'), t('Просрочки и риски должны быть видны в управленческой отчётности.', 'Overdue work and risks need to be visible in management reports.')]
  return <article className="case-scene product-scene">
    <SceneHeader item={item} language={language} role={t('проектирование логики и прототип · вместе с аналитиками и IT', 'workflow design and prototype · alongside analysts and IT')} />
    <div className="product-transformation">
      <div className="product-backlog"><p className="case-eyebrow">{t('Точка пересмотра', 'The point of reassessment')}</p><h4>{t('Функции без общей логики', 'Features without a shared logic')}</h4><div className="product-fragments" aria-hidden="true">{[Blocks, Layers3, MousePointer2, GitBranch].map((Icon,i)=><div key={i} style={{'--fragment-rotation': `${[-7,5,-3,7][i]}deg`} as CSSProperties}><Icon size={19}/><span>{[t('Роли', 'Roles'),t('Статусы', 'Statuses'),t('Сроки', 'Deadlines'),t('Отчёты', 'Reports')][i]}</span></div>)}</div><p>{item.context[language]}</p></div>
      <div className="product-axis"><span className="product-connector" aria-hidden="true" /><div className="product-goal scene-enter" style={delay(.35)}><IconBadge icon={Target}/><div><span className="case-eyebrow">{t('Опорная точка', 'The anchor')}</span><h4>{t('Как движется работа?', 'How does work move?')}</h4></div></div><ArrowDown aria-hidden="true" className="product-down"/><p className="scene-click-hint">{t('Выберите вопрос ↓', 'Choose a question ↓')}</p><div className="product-logic scene-enter" style={delay(.65)}>{[[UsersRound,t('Кто делает','Who owns it')],[Route,t('Как передаёт','How it moves')],[Layers3,t('Где задержка','Where it stalls')]].map(([Icon,label],i)=>{const I=Icon as typeof Route;return <button type="button" key={String(label)} aria-pressed={selected===i} onClick={()=>setSelected(i)} aria-controls="prototype-explanation"><I size={22} aria-hidden="true"/><span>{String(label)}</span></button>})}</div><div className="product-handoff scene-enter" style={delay(.8)}><GitBranch size={21} aria-hidden="true"/><span>{t('Участники связаны правилами передачи работы', 'People are connected by work-handoff rules')}</span></div></div>
      <div className="product-prototype scene-enter" style={delay(1)}><div className="prototype-chrome"><span/><span/><span/><p>{t('Создала интерактивный прототип','Built an interactive prototype')}</p></div><div className={`prototype-map focus-${selected}`}>
          <h4>{t('Кто → кому → когда', 'Who → to whom → when')}</h4>
          <div className="prototype-route">
            <div className="prototype-owner"><UsersRound size={25}/><span>{t('Кто делает', 'Who owns the work')}</span><strong>{t('Ответственный', 'Task owner')}</strong></div>
            <div className="prototype-transfer"><ArrowRight size={24}/><span>{t('Передача', 'Handoff')}</span></div>
            <div className="prototype-recipient"><Route size={25}/><span>{t('Кому передаёт', 'Who receives it')}</span><strong>{t('Следующий участник', 'Next participant')}</strong></div>
          </div>
          <div className="prototype-checkpoints"><span><CircleCheck size={19}/>{t('Статус задачи', 'Task status')}</span><span><Clock3 size={19}/>{t('Срок передачи', 'Handoff deadline')}</span></div>
          <div className="prototype-escalation"><div><TriangleAlert size={21}/><span>{t('Просрочки и риски', 'Overdue work and risks')}</span></div><ArrowRight size={20}/><div><FileBarChart2 size={21}/><strong>{t('Отчёт руководителю', 'Management report')}</strong></div></div>
        </div><div className="prototype-caption"><MousePointer2 size={20}/><p id="prototype-explanation" aria-live="polite">{explanations[selected]}</p></div></div>
    </div>
    <Outcome label={t('Принято в дальнейшую работу', 'Taken forward')}>{item.result[language]}</Outcome>
    <Reconstruction language={language}/>
  </article>
}
