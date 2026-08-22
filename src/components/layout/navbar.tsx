import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'

import { LanguageToggle } from '@/components/language-toggle'
import { LanguageTransition } from '@/components/motion/language-transition'
import { useLanguage } from '@/hooks/use-language'
import { CONTAINER_CLASS, cn } from '@/lib/utils'

const NAME = {
  ru: 'Екатерина Меламуд',
  en: 'Ekaterina Melamud',
} as const

const LINKS = [
  { href: '#about', num: '01', ru: 'Обо мне', en: 'About' },
  { href: '#work', num: '02', ru: 'Кейсы', en: 'Cases' },
  { href: '#skills', num: '03', ru: 'Навыки', en: 'Skills' },
  { href: '#experience', num: '04', ru: 'Опыт', en: 'Experience' },
  { href: '#contact', num: '05', ru: 'Контакты', en: 'Contacts' },
] as const

const EASE = [0.16, 1, 0.3, 1] as const

// Shared keyboard-focus treatment for every interactive element in this
// file — accent-colored, not the browser default, and only ever shown for
// focus-visible (keyboard/programmatic focus), never on mouse click.
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

interface UnderlineRect {
  left: number
  width: number
}

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export function Navbar() {
  const { language, switchId } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [underline, setUnderline] = useState<UnderlineRect | null>(null)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  // Refs the label <span> specifically, not the whole link/column — the
  // column is grid-stretched to an equal-width cell, so measuring the
  // link itself would size the underline to the cell, not the word.
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({})

  function handleHover(href: string) {
    const el = labelRefs.current[href]
    const nav = navRef.current
    if (!el || !nav) return
    const elRect = el.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    setUnderline({ left: elRect.left - navRect.left, width: elRect.width })
    setHoveredHref(href)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className={cn('flex h-16 items-center justify-between', CONTAINER_CLASS)}>
          <a
            href="#top"
            className={cn('flex items-center gap-2 rounded-md text-sm font-medium tracking-tight', FOCUS_RING)}
          >
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-primary" />
            <LanguageTransition id={`${language}-${switchId}`}>
              {/*
                Not <FadeIn>: it triggers via whileInView with a -80px
                viewport margin, tuned for full-height scroll sections.
                That margin excludes the header's own 64px band entirely,
                so on remount (language switch) it never intersects and
                stays stuck at opacity 0 — confirmed by inspecting computed
                styles, not just visually. Reusing menuItemVariants here
                animates on mount directly, no viewport check involved.
              */}
              <motion.span
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                className="inline-block text-xs tracking-[-0.015em] leading-tight"
              >
                {NAME[language]}
              </motion.span>
            </LanguageTransition>
          </a>

          <nav
            ref={navRef}
            onMouseLeave={() => {
              setUnderline(null)
              setHoveredHref(null)
            }}
            className="relative hidden text-sm text-muted-foreground sm:block"
          >
            <LanguageTransition id={`${language}-${switchId}`}>
              {/*
                grid-cols-5 with equal 1fr tracks: each link sits in a
                same-width cell regardless of word length, which is what
                actually guarantees even rhythm — a shared gap or a
                min-width per link (both tried before) only constrains the
                link's own box, not the distance between cell boundaries.
              */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={menuVariants}
                className="grid grid-cols-[repeat(5,minmax(104px,1fr))] gap-x-2"
              >
                {LINKS.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={menuItemVariants}
                    onMouseEnter={() => handleHover(link.href)}
                    className={cn(
                      'relative flex items-center rounded-md py-1 transition-colors hover:text-foreground',
                      FOCUS_RING
                    )}
                  >
                    {/*
                      Priority flip from the previous approach: the numeral
                      is back in normal flow, fixed-gap next to its word, so
                      that gap is identical for every item — centering the
                      [numeral + label] group as a whole (via mx-auto on the
                      group, not text-align on the label) means the group's
                      center drifts slightly off the cell's true center
                      since the numeral's width isn't symmetric. That's the
                      accepted trade-off, not a bug.
                    */}
                    <span className="mx-auto inline-flex items-center gap-1.5">
                      <span
                        className={cn(
                          'text-[10px] tabular-nums transition-colors',
                          hoveredHref === link.href ? 'text-primary' : 'text-muted-foreground/50'
                        )}
                      >
                        {link.num}
                      </span>
                      <span
                        ref={(el) => {
                          labelRefs.current[link.href] = el
                        }}
                      >
                        {link[language]}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </LanguageTransition>
            <AnimatePresence>
              {underline && (
                <motion.span
                  initial={false}
                  animate={{ left: underline.left, width: underline.width, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute bottom-0 h-[2px] rounded-full bg-primary"
                />
              )}
            </AnimatePresence>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
              className={cn(
                'relative flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted sm:hidden',
                FOCUS_RING
              )}
            >
              <Menu
                className={cn(
                  'absolute size-5 transition-all duration-200',
                  mobileOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                )}
              />
              <X
                className={cn(
                  'absolute size-5 transition-all duration-200',
                  mobileOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/*
        Rendered as a sibling of <header>, not a descendant: header's
        backdrop-blur (backdrop-filter) establishes a new containing block
        for `position: fixed` descendants, which would confine this overlay
        to header's own box instead of the viewport.
      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key={`mobile-menu-${language}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-background sm:hidden"
          >
            {LINKS.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={menuItemVariants}
                className={cn(
                  'flex items-center gap-3 rounded-md py-3 text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary',
                  FOCUS_RING
                )}
              >
                <span className="text-sm tabular-nums text-primary">{link.num}</span>
                {link[language]}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
