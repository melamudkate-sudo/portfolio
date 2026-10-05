import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { About } from '@/components/sections/about'
import { Cases } from '@/components/sections/cases'
import { Education } from '@/components/sections/education'
import { Growth, Personal, Resume } from '@/components/sections/next'
import { Hero } from '@/components/sections/hero'
import { Skills, Tools } from '@/components/sections/skills'
import './portfolio.css'
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
      <main className="language-surface relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Education />
        <Cases />
        <Skills />
        <Tools />
        <Growth />
        <Resume />
        <Personal />
      </main>
      <Footer />
    </div>
  )
}

export default App
