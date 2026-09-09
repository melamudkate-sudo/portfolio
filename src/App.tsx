import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { About } from '@/components/sections/about'
import { Cases } from '@/components/sections/cases'
import { Education } from '@/components/sections/education'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { HowIWork } from '@/components/sections/how-i-work'
import { Skills } from '@/components/sections/skills'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    const isReload = navigation?.type === 'reload'

    // A refreshed portfolio should always reopen at a complete screen,
    // rather than Safari restoring a few hundred pixels into Hero. Direct
    // links to a section still work on a first visit; only reloads reset.
    if (isReload || !window.location.hash) {
      if (isReload && window.location.hash) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      }
      const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
      return () => {
        window.cancelAnimationFrame(frame)
        window.history.scrollRestoration = previousRestoration
      }
    }

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/*
        relative z-10: keeps all real content above any decorative,
        z-index:auto-positioned background element that might sit
        elsewhere on the page (fixed/absolute glows etc.) — a plain
        position:relative section with no z-index of its own sits at CSS
        stack level 0, which paints BEHIND any sibling that has an
        explicit positive z-index, regardless of DOM order or how low
        that number looks. Previously caught a decorative navbar glow
        (since removed) painting over Hero's pill badge this way — kept
        as a standing guard against the same class of bug recurring with
        any future decorative addition.
      */}
      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <HowIWork />
        <Cases />
        <Skills />
        <Experience />
        <Education />
      </main>
      <Footer />
    </div>
  )
}

export default App
