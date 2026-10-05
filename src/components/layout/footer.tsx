import { Reveal } from '@/components/motion/reveal'
import { ArrowUpRight, Mail, Send, MessageCircle, ArrowUp } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { CONTACTS } from '@/lib/profile'
import { trackLinkGoal } from '@/lib/metrika'
import { useGoalView } from '@/hooks/use-goal-view'

export function Footer() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  const heading = useGoalView('contacts_view')
  const contacts = [
    { name: 'Telegram', value: '@aggesiya', href: CONTACTS.telegram, Icon: Send, external: true, goal: 'contact_telegram' },
    { name: 'Email', value: CONTACTS.email, href: `mailto:${CONTACTS.email}`, Icon: Mail, external: false, goal: 'contact_email' },
    { name: 'WhatsApp', value: CONTACTS.phone, href: CONTACTS.whatsapp, Icon: MessageCircle, external: true, goal: 'contact_whatsapp' },
  ] as const
  return <footer id="contact" className="language-surface hr-section hr-contact" aria-labelledby="contact-title"><Reveal className="hr-container"><header className="contact-heading"><h2 ref={heading} className="section-title" id="contact-title">{ru ? 'Контакты' : 'Contacts'}</h2><p>{ru ? 'Открыта к предложениям о работе, проектам и сотрудничеству.' : 'Open to job opportunities, projects and collaboration.'}</p></header><div className="contact-buttons">{contacts.map(({ name, value, href, Icon, external, goal }) => <a key={name} href={href} onClick={event => trackLinkGoal(event, goal)} onAuxClick={event => trackLinkGoal(event, goal)} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><Icon size={25} aria-hidden="true" /><span><strong>{name}</strong><span>{value}</span></span><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div><div className="hr-footer-note"><span>{ru ? 'Екатерина Меламуд' : 'Ekaterina Melamud'} · Project & Operations</span><a href="#top">{ru ? 'Наверх' : 'Back to top'}<ArrowUp size={16} aria-hidden="true" /></a></div></Reveal></footer>
}
