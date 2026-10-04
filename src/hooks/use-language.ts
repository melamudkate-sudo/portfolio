import { createContext, useContext } from 'react'

export type Language = 'ru' | 'en'
interface LanguageContextValue {
  language: Language
  switchId: number
  setLanguage: (language: Language) => void
}
export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
