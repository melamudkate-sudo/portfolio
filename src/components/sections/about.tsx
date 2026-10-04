import { useLanguage } from '@/hooks/use-language'

export function About() {
  const { language } = useLanguage()
  const ru = language === 'ru'
  return <section id="about" className="hr-section hr-about" aria-labelledby="about-title">
    <div className="hr-container hr-split">
      <header><p className="hr-eyebrow">01 / {ru ? 'Контекст' : 'Context'}</p><h2 id="about-title">{ru ? 'Обо мне' : 'About me'}</h2></header>
      <div className="hr-prose">
        <p>{ru ? 'Я учусь на 3 курсе РАНХиГС на программе «Стратегическое управление компанией» и параллельно работаю в DEMIAND — российском бренде кухонной техники.' : 'I am in my third year at RANEPA, studying Strategic company management, while working at DEMIAND, a Russian kitchen appliance brand.'}</p>
        <p>{ru ? 'Моя работа выросла из ассистентских задач в project / operations-функцию внутри отдела креаторов. Занимаюсь организацией процессов, проектным управлением, Scrum, внутренними системами и автоматизацией. Контролирую сроки и координирую задачи между дизайном, контентом, продуктом и другими участниками.' : 'My work has grown from assistant tasks into a project and operations function within the Creators Department. I organise processes and project delivery, work with Scrum, and build internal systems and automations. I manage deadlines and coordinate work across design, content, product and other contributors.'}</p>
        <p className="hr-prose-accent">{ru ? 'Мне интересны задачи, где нужно разобраться в сложной системе, собрать её в понятный процесс и сделать так, чтобы он действительно работал для команды.' : 'I enjoy understanding complex systems, turning them into clear processes and making those processes work for the team.'}</p>
      </div>
    </div>
  </section>
}
