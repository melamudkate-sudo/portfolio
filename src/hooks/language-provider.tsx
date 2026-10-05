import { useEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { LanguageContext, type Language } from './use-language'

const STORAGE_KEY = 'language'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru' } catch { return 'ru' }
  })
  const switchSequence = useRef(0)
  const animations = useRef<Animation[]>([])
  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'ru' ? 'Екатерина Меламуд — Project & Operations' : 'Ekaterina Melamud — Project & Operations'
  }, [language])
  useEffect(() => () => { switchSequence.current++; animations.current.forEach(animation => animation.cancel()) }, [])

  async function setLanguage(next: Language) {
    const sequence = ++switchSequence.current
    animations.current.forEach(animation => animation.cancel())
    if (next === language) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>('.language-surface'))
    if (!reduced) {
      animations.current = surfaces.map(surface => surface.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-12px)' }], { duration: 140, fill: 'forwards', easing: 'ease-in' }))
      await Promise.allSettled(animations.current.map(animation => animation.finished))
      if (sequence !== switchSequence.current) return
    }
    // Keep the visible section in place when translated text changes its height.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section, footer'))
    const anchor = sections.find(section => section.getBoundingClientRect().bottom > 110)
    const previousTop = anchor?.getBoundingClientRect().top
    flushSync(() => setLanguageState(next))
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* Language still works without storage. */ }
    if (anchor && previousTop !== undefined && window.scrollY > 0) {
      window.scrollBy({ top: anchor.getBoundingClientRect().top - previousTop, behavior: 'instant' })
    }
    animations.current.forEach(animation => animation.cancel())
    if (!reduced) animations.current = surfaces.map(surface => surface.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' }))
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
