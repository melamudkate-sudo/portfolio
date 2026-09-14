import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { CASES } from './cases/data'
import { CaseOne } from './cases/case-one'
import { CaseStory } from './cases/case-stories'
import { MoreScene } from './cases/more-scene'
import './cases/cases.css'
import './cases/cases-update.css'
import './cases/storytelling.css'

export function Cases() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [compactScale, setCompactScale] = useState(1)
  useLayoutEffect(() => {
    // Keep the complete carousel visible on short desktop viewports.
    const resize = () => setCompactScale(window.innerWidth > 1100 ? Math.min(1, Math.max(.76, (window.innerHeight - 260) / 600)) : 1)
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  const [direction, setDirection] = useState(1)
  const busy = useRef(false)
  const carousel = useRef<HTMLDivElement>(null)
  const [switching, setSwitching] = useState(false)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const t = (ru: string, en: string) => language === 'ru' ? ru : en
  function go(next: number, dir: number) {
    if (busy.current || next === active) return
    busy.current = !reduced
    setSwitching(!reduced)
    if (document.activeElement?.closest('#case-stage')) carousel.current?.focus({ preventScroll: true })
    setDirection(dir)
    setActive(next)
  }
  function step(dir: number) { go((active + dir + CASES.length + 1) % (CASES.length + 1), dir) }
  const isMore = active === CASES.length
  const screenName = isMore ? t('Ещё внедрила', 'Also implemented') : CASES[active].title[language]
  return <MotionConfig reducedMotion="user"><section id="work" className="cases-section" aria-labelledby="cases-title">
    <div className="cases-intro"><p className="case-eyebrow">02 / {t('Избранные кейсы', 'Selected work')}</p><h2 id="cases-title">{t('От причины ', 'From cause ')}<span>{t('к результату', 'to outcome')}</span></h2><p>{t('Шесть историй о процессах, ресурсах и решениях. Схемы реконструированы для портфолио; внутренние названия и интерфейсы не раскрываются.', 'Six stories about processes, resources, and decisions. Diagrams are portfolio reconstructions; internal names and interfaces are not disclosed.')}</p></div>
    <div ref={carousel} className="cases-carousel" style={{ '--case-content-scale': compactScale } as CSSProperties} role="region" aria-roledescription={t('карусель', 'carousel')} aria-label={t('Кейсы портфолио', 'Portfolio cases')} tabIndex={0} onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1) }
    }}>
      <div className="case-frame-label"><span>{isMore ? 'MORE / ' + t('Дополнительные работы', 'Additional work') : `CASE STUDY / ${CASES[active].number} — 06`}</span><span>{t('6 кейсов + ещё внедрила', '6 cases + additional work')}</span></div>
      <button className="case-arrow case-prev" type="button" aria-label={t('Предыдущий кейс', 'Previous case')} aria-controls="case-stage" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button>
      <div id="case-stage" className="case-stage" aria-busy={switching} onTouchStart={event => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; else touch.current = null }} onTouchCancel={() => { touch.current = null }} onTouchEnd={event => {
        const start = touch.current; touch.current = null
        if (!start) return
        const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1)
      }}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div key={active} custom={direction} role="group" aria-roledescription={t('слайд', 'slide')} aria-label={isMore ? screenName : `${active + 1} / ${CASES.length}: ${screenName}`} variants={{ enter: (dir: number) => ({ opacity: reduced ? 1 : 0, x: reduced ? 0 : dir * 30 }), center: { opacity: 1, x: 0 }, exit: (dir: number) => ({ opacity: reduced ? 1 : 0, x: reduced ? 0 : dir * -24 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : .2, ease: [.16, 1, .3, 1] }} onAnimationComplete={definition => { if (definition === 'center') { busy.current = false; setSwitching(false) } }}>
            {isMore ? <MoreScene language={language} /> : active === 0 ? <CaseOne item={CASES[0]} language={language} /> : <CaseStory item={CASES[active]} language={language} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <button className="case-arrow case-next" type="button" aria-label={t('Следующий кейс', 'Next case')} aria-controls="case-stage" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button>
      <nav className="case-navigation" aria-label={t('Выбор кейса', 'Choose a case')}><span className="case-counter" aria-live="polite" aria-atomic="true">{isMore ? 'MORE' : CASES[active].number}{!isMore && <span> / 06</span>}</span><div className="case-progress">{CASES.map((item, index) => <button type="button" key={item.number} aria-label={`${t('Кейс', 'Case')} ${item.number}: ${item.title[language]}`} aria-current={index === active ? 'true' : undefined} aria-controls="case-stage" onClick={() => go(index, index > active ? 1 : -1)}><span>{item.number}</span><i /></button>)}<button type="button" aria-label={t('Ещё внедрила: дополнительные работы', 'More: additional work')} aria-current={isMore ? 'true' : undefined} aria-controls="case-stage" onClick={() => go(CASES.length, 1)}><span>MORE</span><i /></button></div><span className="case-nav-hint">{t('Листайте кейсы', 'Explore the cases')} <span aria-hidden="true">↔</span></span></nav>
    </div>
  </section></MotionConfig>
}
