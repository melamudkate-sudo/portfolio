import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0, depth = false }: { children: ReactNode; className?: string; delay?: number; depth?: boolean }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: depth ? 90 : 52, scale: depth ? .965 : .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .06, margin: '0px 0px -24px 0px' }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.22,1,.36,1] }} style={{ transformOrigin: 'center top' }}>{children}</motion.div>
}
