import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

interface TiltCardProps {
  children?: ReactNode
  className?: string
  /** Maximum tilt angle in degrees. Kept small — this is a flat-card hover cue, not a 3D scene. */
  maxTilt?: number
  /**
   * When set, this element itself fades in via opacity once scrolled into
   * view (once, at this delay), instead of getting its entrance transform
   * from an ancestor. Deliberately kept on THIS component rather than a
   * wrapping motion.div: this element is the one carrying backdrop-blur-*
   * in Hero, and backdrop-filter on an element that's itself under an
   * *active* transform animation (or has one as an ancestor) renders at
   * reduced quality in some browsers until the animation settles — visible
   * as the blur looking different "mid-reveal" vs after. Confirmed via
   * Playwright (opacity/x/rotate all previously lived on one CardReveal
   * wrapper): splitting x/rotate onto CardReveal and opacity onto this
   * element removed the visible discrepancy. rotateX/rotateY below are a
   * separate, unrelated motion-value-driven style prop (the hover tilt,
   * inert at rest) — they coexist fine with this declarative fade.
   */
  fadeInDelay?: number
}

const SPRING = { stiffness: 300, damping: 30, mass: 0.6 }

/**
 * Wraps a flat card with a subtle perspective tilt that follows the cursor.
 * Shared primitive so hover behavior stays identical across Hero's cards.
 */
export function TiltCard({ children, className, maxTilt = 3, fadeInDelay }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]), SPRING)
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]), SPRING)

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  const fadeProps =
    fadeInDelay !== undefined
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.7, delay: fadeInDelay, ease: EASE },
        }
      : {}

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
      {...fadeProps}
    >
      {children}
    </motion.div>
  )
}
