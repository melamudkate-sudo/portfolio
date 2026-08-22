import { ArrowUpRight } from 'lucide-react'

import { BorderBeam } from '@/components/magicui/border-beam'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href: string
}

export function ProjectCard({ title, description, tags, href }: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
    >
      <BorderBeam
        duration={8}
        size={200}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </a>
  )
}
