export const CONTACTS = {
  email: 'melamudkate@gmail.com',
  telegram: 'https://t.me/aggesiya',
  whatsapp: 'https://wa.me/79852489939',
  phone: '+7 985 248-99-39',
}

// Add public/resume.pdf and rebuild; the download link is enabled automatically.
declare const __HAS_RESUME__: boolean
export const RESUME_URL: string | undefined = __HAS_RESUME__ ? `${import.meta.env.BASE_URL}resume.pdf` : undefined
