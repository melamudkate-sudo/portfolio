import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Wraps language-dependent content so switching languages briefly exits
 * the old content, then mounts the new content fresh under a new `id`.
 * Framer Motion's own entrance mechanisms (CardReveal, the h1 clip-path
 * reveal, FadeIn's viewport observer) only run once per mount, so a freshly
 * mounted instance replays them — the same reveal that plays on first
 * load plays again on every language switch, no separate crossfade
 * machinery needed.
 */
export function LanguageTransition({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
