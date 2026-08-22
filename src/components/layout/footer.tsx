export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-16 text-center">
        <h2 className="text-2xl font-medium tracking-tight text-foreground">
          Let&apos;s build something together
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Open to new opportunities and interesting collaborations.
        </p>
        <a
          href="mailto:hello@example.com"
          className="text-sm font-medium text-foreground underline underline-offset-4"
        >
          hello@example.com
        </a>
        <p className="mt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
