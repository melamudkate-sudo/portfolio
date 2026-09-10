import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { CASES } from './cases/data'
import { CaseOne } from './cases/case-one'
import { CaseStory } from './cases/case-stories'
import './cases/cases.css'

export function Cases() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const busy = useRef(false)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [contentHeight, setContentHeight] = useState<number>()
  const measure = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const observer = new ResizeObserver(() => setContentHeight(node.offsetHeight + 2))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const t = (ru: string, en: string) => language === 'ru' ? ru : en
  function go(next: number, dir: number) {
    if (busy.current || next === active) return
    busy.current = true
    setDirection(dir)
    setActive(next)
  }
  function step(dir: number) { go((active + dir + CASES.length) % CASES.length, dir) }
  return <MotionConfig reducedMotion="user"><section id="work" className="cases-section" aria-labelledby="cases-title">
    <div className="cases-intro"><p className="case-eyebrow">03 / {t('Избранные кейсы', 'Selected work')}</p><h2 id="cases-title">{t('От причины ', 'From cause ')}<span>{t('к результату', 'to outcome')}</span></h2><p>{t('Шесть историй о процессах, ресурсах и решениях. Схемы реконструированы для портфолио; внутренние названия, интерфейсы и бюджеты не раскрываются.', 'Six stories about processes, resources, and decisions. Diagrams are portfolio reconstructions; internal names, interfaces, and budgets are not disclosed.')}</p></div>
    <div className="cases-carousel" role="region" aria-roledescription={t('карусель', 'carousel')} aria-label={t('Кейсы портфолио', 'Portfolio cases')} tabIndex={0} onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1) }
    }}>
      <button className="case-arrow case-prev" type="button" aria-label={t('Предыдущий кейс', 'Previous case')} aria-controls="case-stage" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button>
      <motion.div id="case-stage" className="case-stage" animate={{ height: contentHeight ?? 'auto' }} transition={{ duration: reduced ? 0 : .3, ease: [.16, 1, .3, 1] }} onTouchStart={event => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; else touch.current = null }} onTouchCancel={() => { touch.current = null }} onTouchEnd={event => {
        const start = touch.current; touch.current = null
        if (!start) return
        const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1)
      }}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div ref={measure} key={active} custom={direction} role="group" aria-roledescription={t('слайд', 'slide')} aria-label={`${active + 1} / ${CASES.length}: ${CASES[active].title[language]}`} variants={{ enter: (dir: number) => ({ opacity: reduced ? 1 : 0, x: reduced ? 0 : dir * 30 }), center: { opacity: 1, x: 0 }, exit: (dir: number) => ({ opacity: reduced ? 1 : 0, x: reduced ? 0 : dir * -24 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : .2, ease: [.16, 1, .3, 1] }} onAnimationComplete={definition => { if (definition === 'center') { busy.current = false } }}>
            {active === 0 ? <CaseOne item={CASES[0]} language={language} /> : <CaseStory item={CASES[active]} language={language} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <button className="case-arrow case-next" type="button" aria-label={t('Следующий кейс', 'Next case')} aria-controls="case-stage" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button>
      <nav className="case-navigation" aria-label={t('Выбор кейса', 'Choose a case')}><span className="case-counter" aria-live="polite" aria-atomic="true">{CASES[active].number}<span> / 06</span></span><div className="case-progress">{CASES.map((item, index) => <button type="button" key={item.number} aria-label={`${t('Кейс', 'Case')} ${item.number}: ${item.title[language]}`} aria-current={index === active ? 'true' : undefined} aria-controls="case-stage" onClick={() => go(index, index > active ? 1 : -1)}><span>{item.number}</span><i /></button>)}</div><span className="case-nav-hint">{t('Листайте кейсы', 'Explore the cases')} <span aria-hidden="true">↔</span></span></nav>
    </div>
    <details className="cases-additional"><summary>{t('Ещё внедрила', 'Also implemented')}</summary><div>{[
      ['Единый реестр и контроль качества контента для 20+ товарных позиций.', 'A unified content registry and quality control system for 20+ product positions.'],
      ['Архитектуру внутреннего хранилища с понятными правилами доступа и передачи материалов.', 'An internal storage architecture with clear access and handoff rules.'],
      ['Сквозной операционный контур производства контента с контрольными точками.', 'An end-to-end content-production operating flow with checkpoints.'],
    ].map(([ru, en]) => <p key={en}>{t(ru, en)}</p>)}</div></details>
  </section></MotionConfig>
}
