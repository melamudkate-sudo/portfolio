import { motion, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/hooks/use-language'

const LINKS = [
  { href: '#about', ru: 'Обо мне', en: 'About' },
  { href: '#work', ru: 'Проекты', en: 'Projects' },
  { href: '#skills', ru: 'Навыки', en: 'Skills' },
  { href: '#resume', ru: 'Резюме', en: 'Résumé' },
] as const

export function Navbar() {
  const { language } = useLanguage()
  const { scrollYProgress } = useScroll()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)
  const ru = language === 'ru'
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
      if (event.key === 'Tab') {
        const elements = [menuButton.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[]
        const first = elements[0], last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey) }
  }, [open])
  return <>
    <header className="site-header"><motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" /><div className="hr-container nav-layout"><a href="#top" className="nav-brand" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">м<span>.</span></span><span>{ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'}</span></a><nav className="desktop-nav" aria-label={ru ? 'Основная навигация' : 'Main navigation'}>{LINKS.map(link => <a key={link.href} href={link.href}>{link[language]}</a>)}</nav><div className="nav-actions"><LanguageToggle /><a className="nav-contact" href="#contact">{ru ? 'Написать' : 'Say hello'}<ArrowUpRight size={16} aria-hidden="true" /></a><button ref={menuButton} className="menu-toggle" type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={ru ? (open ? 'Закрыть меню' : 'Открыть меню') : (open ? 'Close menu' : 'Open menu')} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div></div></header>
    {open && <nav ref={menu} id="mobile-navigation" className="mobile-navigation" aria-label={ru ? 'Навигация' : 'Navigation'}>{[...LINKS, { href: '#contact', ru: 'Контакты', en: 'Contacts' }].map((link, i) => <a href={link.href} key={link.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{link[language]}<ArrowUpRight size={24} /></a>)}</nav>}
  </>
}
