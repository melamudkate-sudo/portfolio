import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './use-language'

const STORAGE_KEY = 'language'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru')
  // A monotonic key keeps quick repeated language switches from reusing an exiting animation.
  const [switchId, setSwitchId] = useState(0)
  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'ru' ? 'Екатерина Меламуд — Project & Operations' : 'Ekaterina Melamud — Project & Operations'
  }, [language])
  function setLanguage(next: Language) {
    if (next === language) return
    setLanguageState(next)
    setSwitchId(id => id + 1)
    localStorage.setItem(STORAGE_KEY, next)
  }
  return <LanguageContext.Provider value={{ language, switchId, setLanguage }}>{children}</LanguageContext.Provider>
}
