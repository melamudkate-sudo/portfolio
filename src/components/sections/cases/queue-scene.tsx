import { translate } from './scene-utils'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Bell, Check, Clock3, LockKeyhole, LogOut, MessagesSquare, Route, UserRound } from 'lucide-react'
import { IconBadge, Reconstruction, SceneHeader, type SceneProps } from './scene-primitives'

export function QueueScene({ item, language }: SceneProps) {
  const t = translate(language)
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const [replay, setReplay] = useState(0)
  useEffect(() => {
    if (reduced) return
    const timers = [700, 1250, 1900].map((time, i) => window.setTimeout(() => setPhase(i + 1), time))
    return () => timers.forEach(window.clearTimeout)
  }, [reduced, replay])
  const step = reduced ? 3 : phase
  return <article className="case-scene queue-scene">
    <SceneHeader item={item} language={language} role={t('полный цикл: от проблемы до внедрения self-service в Bitrix24', 'full cycle: from identifying the problem to launching self-service in Bitrix24')} />
    <div className="queue-proofs"><div><span className="scene-number">−50<span>%</span></span><p>{t('конфликтов и повторных уточнений', 'conflicts and repeat clarification requests')}</p></div><div><Clock3 aria-hidden="true" /><strong>{t('Часы', 'Hours')}</strong><p>{t('команды сэкономлены каждую неделю', 'of team time saved every week')}</p></div></div>
    <div key={replay} className={`queue-simulation phase-${step}`}>
      <div className="queue-before"><IconBadge icon={MessagesSquare} quiet /><p className="case-eyebrow">{t('Ручная координация', 'Manual coordination')}</p><div className="queue-collisions" aria-hidden="true"><span>A ↗</span><span>B →</span><span>C ↘</span><LockKeyhole size={26} /></div><p>{t('Общий ресурс. Одновременные запросы. Повторные уточнения.', 'One shared resource. Concurrent requests. Repeated checks.')}</p></div>
      <div className="queue-after"><div className="scene-system-label"><span className="scene-status-dot" />{t('Очередь управляет доступом', 'The queue manages access')}</div>
        <div className="queue-lanes">
          <div className="queue-waiting"><p className="case-eyebrow">{t('Очередь', 'Queue')}</p><div className={`queue-person ${step >= 3 ? 'transferred' : ''}`}><UserRound size={18} /><strong>B</strong><span>{t('Следующий', 'Next')}</span></div><div className="queue-person"><UserRound size={18} /><strong>C</strong><span>{t('Ожидает', 'Waiting')}</span></div></div>
          <div className="queue-transfer" aria-hidden="true"><i /><span>→</span></div>
          <div className="queue-active"><IconBadge icon={step === 2 ? LogOut : LockKeyhole} /><p className="case-eyebrow">{step === 2 ? t('Освобождён', 'Released') : t('Доступ активен', 'Access active')}</p><strong key={step >= 3 ? 'B' : 'A'}>{step >= 3 ? 'B' : 'A'}</strong><span>{t('Один пользователь', 'One user at a time')}</span></div>
        </div>
        <div className="queue-notice" aria-live="off"><Bell size={18} aria-hidden="true" /><span>{step >= 3 ? t('B получил уведомление и доступ. C — следующий.', 'B is notified and has access. C is next.') : step === 2 ? t('A освободил ресурс → уведомление следующему', 'A released the resource → notify the next user') : t('Запрос зарегистрирован → место в очереди сохранено', 'Request registered → place in the queue saved')}</span><Check size={16} aria-hidden="true" /></div>
        <p className="queue-rule">{t('Запрос → ожидание → доступ → освобождение → следующий', 'Request → wait → access → release → next user')}</p>
      </div>
    </div>
    <div className="queue-interaction"><button type="button" className="scene-control" onClick={() => {setPhase(0); setReplay(value => value + 1)}}><Route size={17} aria-hidden="true"/>{t('Показать передачу доступа', 'Replay access handoff')}</button><p>{t('Настроила права и исключения, протестировала путь и подготовила инструкции.', 'Configured permissions and exceptions, tested the flow, and prepared guidance.')}</p></div>
    <Reconstruction language={language} />
  </article>
}
