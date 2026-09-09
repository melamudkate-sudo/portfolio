import { ArrowUpRight, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { useLanguage } from '@/hooks/use-language'
import { cn, SECTION_CONTAINER_CLASS } from '@/lib/utils'

type Channel = 'telegram' | 'whatsapp' | 'email'

const CONTACTS = {
  email: 'melamudkate@gmail.com',
  phone: '+7 985 248 99 39',
  phoneDigits: '79852489939',
  telegram: 'aggesiya',
}

const CHANNELS = [
  { id: 'telegram' as const, ru: 'Telegram', en: 'Telegram' },
  { id: 'whatsapp' as const, ru: 'WhatsApp', en: 'WhatsApp' },
  { id: 'email' as const, ru: 'E-mail', en: 'Email' },
]

export function Footer() {
  const { language } = useLanguage()
  const [channel, setChannel] = useState<Channel>('telegram')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const contact = String(form.get('contact') || '')
    const message = String(form.get('message') || '')
    const body = language === 'ru'
      ? `Здравствуйте, Екатерина!\n\nМеня зовут: ${name}\nКонтакты для ответа: ${contact}\n\n${message}`
      : `Hello, Ekaterina!\n\nMy name: ${name}\nMy contact details: ${contact}\n\n${message}`
    const encoded = encodeURIComponent(body)

    const destination = channel === 'telegram'
      ? `https://t.me/${CONTACTS.telegram}?text=${encoded}`
      : channel === 'whatsapp'
        ? `https://wa.me/${CONTACTS.phoneDigits}?text=${encoded}`
        : `mailto:${CONTACTS.email}?subject=${encodeURIComponent(language === 'ru' ? 'Сообщение с сайта-портфолио' : 'Message from portfolio website')}&body=${encoded}`

    window.open(destination, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer id="contact" className="relative z-[80] -mt-8 isolate overflow-hidden rounded-t-[3rem] border-t border-border/60 bg-[color-mix(in_oklab,var(--color-muted)_20%,var(--color-background))] py-24 sm:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-6 select-none font-heading text-[10rem] leading-none text-foreground/[0.035] sm:-right-7 sm:top-4 sm:text-[clamp(12rem,25vw,27rem)]">06</span>
      <div className={cn('relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20', SECTION_CONTAINER_CLASS)}>
        <div>
          <h2 className="text-balance text-5xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            <span>{language === 'ru' ? 'Давайте ' : 'Let’s '}</span>
            <span className="font-heading text-[1.16em] text-primary">{language === 'ru' ? 'поговорим' : 'talk'}</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {language === 'ru'
              ? 'Выберите удобный канал или напишите напрямую — отвечу там, где вам проще продолжить разговор.'
              : 'Choose the channel that works best for you, or reach out directly — I will reply where it is easiest to continue the conversation.'}
          </p>

          <div className="mt-10 space-y-3">
            <a href={`mailto:${CONTACTS.email}`} className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3"><Mail aria-hidden="true" className="size-4 text-primary" /><span className="text-sm text-foreground">{CONTACTS.email}</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`https://t.me/${CONTACTS.telegram}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3"><Send aria-hidden="true" className="size-4 text-primary" /><span className="text-sm text-foreground">t.me/{CONTACTS.telegram}</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`https://wa.me/${CONTACTS.phoneDigits}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3"><MessageCircle aria-hidden="true" className="size-4 text-primary" /><span className="text-sm text-foreground">WhatsApp</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`tel:${CONTACTS.phoneDigits}`} className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3"><Phone aria-hidden="true" className="size-4 text-primary" /><span className="text-sm text-foreground">{CONTACTS.phone}</span></span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/10 sm:p-8">
          <p className="text-sm font-medium text-foreground">{language === 'ru' ? 'Написать сообщение' : 'Send a message'}</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted-foreground"><span>{language === 'ru' ? 'Ваше имя' : 'Your name'}</span><input required name="name" className="h-11 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" placeholder={language === 'ru' ? 'Как к вам обращаться?' : 'How should I address you?'} /></label>
            <label className="grid gap-2 text-sm text-muted-foreground"><span>{language === 'ru' ? 'Контакт для ответа' : 'Reply contact'}</span><input required name="contact" className="h-11 rounded-xl border border-border bg-background px-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" placeholder={language === 'ru' ? 'Почта или Telegram' : 'Email or Telegram'} /></label>
          </div>
          <label className="mt-5 grid gap-2 text-sm text-muted-foreground"><span>{language === 'ru' ? 'Сообщение' : 'Message'}</span><textarea required name="message" rows={5} className="resize-none rounded-xl border border-border bg-background p-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" placeholder={language === 'ru' ? 'Расскажите, о чём хотите поговорить' : 'Tell me what you would like to discuss'} /></label>

          <fieldset className="mt-6"><legend className="text-sm text-muted-foreground">{language === 'ru' ? 'Удобный канал связи' : 'Preferred channel'}</legend><div className="mt-3 flex flex-wrap gap-2">{CHANNELS.map((item) => <label key={item.id} className={cn('cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors', channel === item.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/50')}><input type="radio" name="channel" value={item.id} checked={channel === item.id} onChange={() => setChannel(item.id)} className="sr-only" />{item[language]}</label>)}</div></fieldset>
          <button type="submit" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"><span>{language === 'ru' ? 'Открыть выбранный канал' : 'Open selected channel'}</span><ArrowUpRight aria-hidden="true" className="size-4" /></button>
        </form>
      </div>
      <p className="mx-auto mt-16 w-full max-w-7xl px-6 text-xs text-muted-foreground">© {new Date().getFullYear()} {language === 'ru' ? 'Екатерина Меламуд' : 'Ekaterina Melamud'}</p>
    </footer>
  )
}
