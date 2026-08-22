import { FadeIn } from '@/components/motion/fade-in'
import { ProjectCard } from '@/components/project-card'

const PROJECTS = [
  {
    title: 'Project One',
    description: 'A short description of the problem this project solved and your role in it.',
    tags: ['React', 'TypeScript'],
    href: 'https://example.com',
  },
  {
    title: 'Project Two',
    description: 'A short description of the problem this project solved and your role in it.',
    tags: ['Next.js', 'Postgres'],
    href: 'https://example.com',
  },
  {
    title: 'Project Three',
    description: 'A short description of the problem this project solved and your role in it.',
    tags: ['Vite', 'Tailwind'],
    href: 'https://example.com',
  },
]

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-24">
      <FadeIn>
        <h2 className="text-2xl font-medium tracking-tight text-foreground">
          Selected work
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.1}>
            <ProjectCard {...project} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
