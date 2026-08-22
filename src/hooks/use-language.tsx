import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'ru' | 'en'

interface LanguageContextValue {
  language: Language
  /**
   * Increments on every actual language change. `LanguageTransition`
   * instances key off `${language}-${switchId}`, not just `language` —
   * with AnimatePresence's mode="wait", a key that reverts to a value
   * still mid-exit (e.g. ru→en→ru clicked before the ru→en exit finishes)
   * gets matched to that still-exiting instance instead of mounting a
   * fresh one, so any state relying on a fresh mount (Hero's stat
   * counters used to rely on `useInView`'s `once: true` here; they've
   * since dropped that dependency entirely, but the same reuse risk
   * applies to anything else mounted inside a LanguageTransition) never
   * re-runs and the content silently stays stale. switchId is monotonic,
   * so the compound key never repeats and every switch is a
   * guaranteed-fresh mount. Confirmed via Playwright: without this,
   * clicking during the ~200ms exit window left all four Hero stat
   * counters stuck at their old values ~2/3 of the time.
   */
  switchId: number
  setLanguage: (language: Language) => void
}

const STORAGE_KEY = 'language'

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLanguage(): Language {
  return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [switchId, setSwitchId] = useState(0)

  function setLanguage(next: Language) {
    if (next === language) return
    setLanguageState(next)
    setSwitchId((id) => id + 1)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LanguageContext.Provider value={{ language, switchId, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
