import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Case } from './data'
import type { Language } from '@/hooks/use-language'

export type SceneProps = { item: Case; language: Language }

export function IconBadge({ icon: Icon, quiet = false }: { icon: LucideIcon; quiet?: boolean }) {
  return <span className={`scene-icon${quiet ? ' quiet' : ''}`}><Icon aria-hidden="true" size={21} strokeWidth={1.65} /></span>
}
export function SceneHeader({ item, language, role }: SceneProps & { role: string }) {
  return <header className="scene-header"><p className="case-eyebrow">{item.number} — {item.category[language]}</p><h3>{item.title[language]}</h3><p className="scene-lead">{item.lead[language]}</p><p className="scene-role">{language === 'ru' ? 'Моя роль' : 'My role'} · {role}</p></header>
}
export function Outcome({ children, label }: { children: ReactNode; label: string }) {
  return <div className="scene-outcome"><span className="case-eyebrow">{label}</span><p>{children}</p></div>
}
export function Reconstruction({ language }: { language: Language }) {
  return <p className="scene-footnote">{language === 'ru' ? 'Схема подхода · условные элементы, не внутренний интерфейс' : 'Approach reconstruction · illustrative elements, not an internal interface'}</p>
}
