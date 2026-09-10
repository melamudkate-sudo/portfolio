import type { CSSProperties } from 'react'
import type { Language } from '@/hooks/use-language'

export const translate = (language: Language) => (ru: string, en: string) => language === 'ru' ? ru : en
export const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` })
