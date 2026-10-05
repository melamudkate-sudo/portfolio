import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

/** Native touch scrolling, with keyboard-accessible controls on narrow screens. */
export function SwipeRail({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const { language } = useLanguage()
  const rail = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  useEffect(() => {
    const element = rail.current
    if (!element) return
    const update = () => setEdges({ start: element.scrollLeft < 4, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 4 })
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [language])
  const move = (direction: number) => {
    const element = rail.current
    if (!element) return
    const first = element.firstElementChild as HTMLElement | null
    const step = (first?.offsetWidth ?? element.clientWidth) + parseFloat(getComputedStyle(element).columnGap || '0')
    element.scrollBy({ left: direction * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <div className="swipe-rail"><div ref={rail} className={className} role="group" aria-label={label}>{children}</div><div className="rail-controls"><button type="button" disabled={edges.start} onClick={() => move(-1)} aria-label={language === 'ru' ? 'Прокрутить назад' : 'Scroll back'}><ArrowLeft size={19} /></button><button type="button" disabled={edges.end} onClick={() => move(1)} aria-label={language === 'ru' ? 'Прокрутить вперёд' : 'Scroll forward'}><ArrowRight size={19} /></button></div></div>
}
