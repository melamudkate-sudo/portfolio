import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance in pixels the content travels in from. */
  offset?: number
  direction?: 'up' | 'down' | 'none'
}

const EASE = [0.16, 1, 0.3, 1] as const

function buildVariants(offset: number, direction: FadeInProps['direction']): Variants {
  const y = direction === 'up' ? offset : direction === 'down' ? -offset : 0
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  }
}

/**
 * Fades and slides content into view once it enters the viewport.
 * Shared primitive for scroll-triggered reveals across sections.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  offset = 16,
  direction = 'up',
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={buildVariants(offset, direction)}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
