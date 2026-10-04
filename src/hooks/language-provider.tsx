import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './use-language'

const STORAGE_KEY = 'language'
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru')
  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'ru' ? 'Екатерина Меламуд — Project & Operations' : 'Ekaterina Melamud — Project & Operations'
  }, [language])
  function setLanguage(next: Language) {
    if (next === language) return
    setLanguageState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
