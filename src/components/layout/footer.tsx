import { Reveal } from '@/components/motion/reveal'
import { ArrowUpRight, Mail, Send, MessageCircle, ArrowUp } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { CONTACTS } from '@/lib/profile'

export function Footer() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const contacts = [
    { name: 'Telegram', value: '@aggesiya', href: CONTACTS.telegram, Icon: Send, external: true },
    { name: 'Email', value: CONTACTS.email, href: `mailto:${CONTACTS.email}`, Icon: Mail, external: false },
    { name: 'WhatsApp', value: CONTACTS.phone, href: CONTACTS.whatsapp, Icon: MessageCircle, external: true },
  ]
  return <footer id="contact" className="language-surface hr-section hr-contact" aria-labelledby="contact-title"><Reveal className="hr-container"><header className="contact-heading"><h2 className="section-title" id="contact-title">{ru ? 'Контакты' : 'Contacts'}</h2><p>{ru ? 'Открыта к предложениям о работе, проектам и сотрудничеству.' : 'Open to job opportunities, projects and collaboration.'}</p></header><div className="contact-buttons">{contacts.map(({ name, value, href, Icon, external }) => <a key={name} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><Icon size={25} aria-hidden="true" /><span><strong>{name}</strong><span>{value}</span></span><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div><div className="hr-footer-note"><span>{ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} · Project & Operations</span><a href="#top">{ru ? 'Наверх' : 'Back to top'}<ArrowUp size={16} aria-hidden="true" /></a></div></Reveal></footer>
}
