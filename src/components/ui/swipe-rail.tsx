import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

/** One full card per mobile viewport; native swipe and keyboard-accessible arrows. */
export function SwipeRail({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const { language } = useLanguage()
  const id = useId()
  const rail = useRef<HTMLDivElement>(null)
  const active = useRef(0)
  const [position, setPosition] = useState({ index: 0, count: 1, height: 0 })
  useEffect(() => {
    const element = rail.current
    if (!element) return
    const items = Array.from(element.children) as HTMLElement[]
    const mobile = matchMedia('(max-width:560px)')
    const update = () => {
      const index = mobile.matches ? items.reduce((closest, item, i) => Math.abs(item.offsetLeft - element.scrollLeft) < Math.abs(items[closest].offsetLeft - element.scrollLeft) ? i : closest, 0) : 0
      active.current = index
      const height = items[index]?.offsetHeight ?? 0
      setPosition(previous => previous.index === index && previous.height === height && previous.count === items.length ? previous : { index, height, count: items.length })
    }
    let previousWidth = element.clientWidth
    const observer = new ResizeObserver(() => {
      if (element.clientWidth !== previousWidth) {
        previousWidth = element.clientWidth
        // Preserve the selected card through device rotation and breakpoint changes.
        const item = items[Math.min(active.current, items.length - 1)]
        element.scrollTo({ left: mobile.matches ? item?.offsetLeft ?? 0 : 0, behavior: 'instant' })
      }
      update()
    })
    items.forEach(item => observer.observe(item))
    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [language])
  const move = (direction: number) => {
    const element = rail.current
    if (!element) return
    const index = Math.max(0, Math.min(element.children.length - 1, active.current + direction))
    const item = element.children[index] as HTMLElement
    element.scrollTo({ left: item.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <div className="swipe-rail" style={{ '--rail-height': `${position.height}px` } as CSSProperties}>
    <div id={id} ref={rail} className={className} role="group" aria-label={label}>{children}</div>
    <div className="rail-controls">
      <button type="button" disabled={position.index === 0} onClick={() => move(-1)} aria-controls={id} aria-label={language === 'ru' ? 'Предыдущая карточка' : 'Previous card'}><ChevronLeft size={17} /></button>
      <button type="button" disabled={position.index >= position.count - 1} onClick={() => move(1)} aria-controls={id} aria-label={language === 'ru' ? 'Следующая карточка' : 'Next card'}><ChevronRight size={17} /></button>
    </div>
  </div>
}
