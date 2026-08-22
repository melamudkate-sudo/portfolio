import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

interface PulsingIconProps {
  children: ReactNode
  /**
   * Bump this to replay the pulse — a one-shot scale "pop" + expanding
   * glow ring, not a persistent loop. 0 means "never pulsed yet" (no
   * animation on first mount); any change above that replays it.
   * `key={pulseKey}` is what makes the replay work: changing a key forces
   * React to remount the motion element, so its initial→animate
   * transition runs again from scratch — same trick LanguageTransition
   * uses for replaying entrances.
   */
  pulseKey: number
  className?: string
}

/**
 * Wraps any small badge/icon with a one-shot pulse, triggered by bumping
 * `pulseKey` — originally built for About's "wick" reaching a node during
 * scroll, generalized to take `children` instead of an Icon+lit pair so
 * Hero's stat badges (which have no lit/unlit concept, just a plain
 * always-on accent badge) can reuse the exact same pulse mechanism
 * instead of a second copy of it.
 */
export function PulsingIcon({ children, pulseKey, className }: PulsingIconProps) {
  return (
    <motion.div
      key={pulseKey}
      initial={pulseKey > 0 ? { scale: 1.45 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn('relative', className)}
    >
      {pulseKey > 0 && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-primary"
        />
      )}
      {children}
    </motion.div>
  )
}
