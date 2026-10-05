import { GraduationCap, Layers, ShoppingBag } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { useLanguage } from '@/hooks/use-language'

export function About() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="about" className="hr-section hr-about" aria-labelledby="about-title"><div className="hr-container"><Reveal>
    <header className="about-heading"><h2 className="section-title" id="about-title">{ru ? 'Обо мне' : 'About me'}</h2><p>{ru ? 'Мне нравится разбираться в сложных задачах и видеть, как решение начинает работать для команды.' : 'I enjoy working through complex problems and seeing a solution start working for the team.'}</p></header>
    <div className="about-columns"><article><GraduationCap size={24} aria-hidden="true" /><h3>{ru ? 'Работа и образование' : 'Work and education'}</h3><p>{ru ? <>Я на 3 курсе РАНХиГС и работаю в <strong>DEMIAND</strong> — российском бренде кухонной техники. Моя работа — проекты, процессы и внутренние системы.</> : <>I’m a third-year RANEPA student and work at <strong>DEMIAND</strong>, a Russian kitchen appliance brand. My work covers projects, processes and internal systems.</>}</p></article><article><Layers size={24} aria-hidden="true" /><h3>{ru ? 'Проекты и процессы' : 'Projects and processes'}</h3><p>{ru ? <>Из ассистентских задач выросла в <strong>project / operations-функцию</strong>: проектная система отдела, Scrum, ресурсы и внутренние инструменты. Работаю с дизайном, контентом, product, IT и подрядчиками.</> : <>My work grew from assistant duties into a <strong>project / operations function</strong>: team delivery, Scrum, resources and internal tools. I work with design, content, product, IT and contractors.</>}</p></article><article><ShoppingBag size={24} aria-hidden="true" /><h3>{ru ? 'Управление работой e-commerce' : 'E-commerce team operations'}</h3><p>{ru ? <>С нуля выстроила работу по Agile. Выполняю функции <strong>Scrum Master</strong>, разбираю задачи и уточняю приоритеты. Хочу дальше расти в project и operations management.</> : <>Built an Agile way of working from scratch. I perform <strong>Scrum Master duties</strong> and clarify tasks and priorities. I want to keep growing in project and operations management.</>}</p></article></div>
  </Reveal></div></section>
}
