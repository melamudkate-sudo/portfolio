import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { About } from '@/components/sections/about'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'

function App() {
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
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

export default App
