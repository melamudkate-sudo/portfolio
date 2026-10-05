import { useLanguage } from '@/hooks/use-language'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return <div className="language-switch" data-language={language} role="group" aria-label={language === 'ru' ? 'Язык сайта' : 'Site language'}>
    <span className="language-switch-thumb" aria-hidden="true" />
    {(['ru', 'en'] as const).map(option => <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} lang={option} aria-label={option === 'ru' ? 'Русский' : 'English'}>{option.toUpperCase()}</button>)}
  </div>
}
