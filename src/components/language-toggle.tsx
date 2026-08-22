import { motion } from 'framer-motion'

import { useLanguage } from '@/hooks/use-language'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5 text-xs font-medium">
      {(['ru', 'en'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={cn(
            'relative rounded-full px-2 py-1 uppercase transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            language === option
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {language === option && (
            <motion.span
              layoutId="language-toggle-bg"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="absolute inset-0 -z-10 rounded-full bg-primary"
            />
          )}
          {option}
        </button>
      ))}
    </div>
  )
}
