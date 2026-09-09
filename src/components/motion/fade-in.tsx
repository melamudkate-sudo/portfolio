import { motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance in pixels the content travels in from. */
  offset?: number
  direction?: 'up' | 'down' | 'none'
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Starts an entrance only after its element reaches the actual browser
 * viewport. A page-wide Framer `whileInView` observer could mark lower
 * sections as seen during initial mount, finishing their transitions below
 * the fold before a visitor had a chance to see them.
 */
export function useScrollReveal<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isRevealed) return

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsRevealed(true)
        observer.disconnect()
      },
      { threshold: 0.12 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isRevealed])

  return [ref, isRevealed]
}

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
  const [ref, isRevealed] = useScrollReveal<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isRevealed ? 'visible' : 'hidden'}
      variants={buildVariants(offset, direction)}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
