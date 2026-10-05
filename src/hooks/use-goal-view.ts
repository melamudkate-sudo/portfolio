import { useEffect, useRef } from 'react'
import { trackViewOnce } from '@/lib/metrika'

export function useGoalView(goal: 'projects_view' | 'contacts_view') {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!heading.current || typeof IntersectionObserver === 'undefined') return
    let visible = false
    const report = () => {
      if (visible && document.visibilityState === 'visible' && trackViewOnce(goal)) observer.disconnect()
    }
    // Observe the heading: the projects section is taller than the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.5
      report()
    }, { threshold: 0.5, rootMargin: '-72px 0px 0px 0px' })
    observer.observe(heading.current)
    document.addEventListener('visibilitychange', report)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', report)
    }
  }, [goal])
  return heading
}
