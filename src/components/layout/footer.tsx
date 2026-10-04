import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { CONTACTS } from '@/lib/profile'

export function Footer() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <footer id="contact" className="hr-section hr-contact" aria-labelledby="contact-title"><div className="hr-container"><div className="hr-split"><div><p className="hr-eyebrow">06 / {ru ? 'Связаться со мной' : 'Get in touch'}</p><h2 id="contact-title">{ru ? 'Контакты' : 'Contacts'}</h2><p>{ru ? 'По вопросам работы, проектов и сотрудничества можно написать мне:' : 'For roles, projects and collaboration, you can reach me here:'}</p><a className="hr-button hr-button-primary" href={CONTACTS.telegram} target="_blank" rel="noreferrer">{ru ? 'Написать мне' : 'Message me'}<ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="hr-contact-links"><a href={CONTACTS.telegram} target="_blank" rel="noreferrer"><Send size={18} aria-hidden="true" /><span>Telegram<small>@aggesiya</small></span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={`mailto:${CONTACTS.email}`}><Mail size={18} aria-hidden="true" /><span>Email<small>{CONTACTS.email}</small></span><ArrowUpRight size={18} aria-hidden="true" /></a><a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><ArrowUpRight size={18} aria-hidden="true" /></a></div></div><div className="hr-footer-note"><span>{ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} · Project & Operations</span><a href="#top">{ru ? 'Наверх ↑' : 'Back to top ↑'}</a></div></div></footer>
}
