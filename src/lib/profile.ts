export const CONTACTS = {
  email: 'melamudkate@gmail.com',
  telegram: 'https://t.me/aggesiya',
  whatsapp: 'https://wa.me/79852489939',
}

// Set to a public PDF URL or /resume.pdf when the approved file is available.
declare const __HAS_RESUME__: boolean
export const RESUME_URL: string | undefined = import.meta.env.VITE_RESUME_URL || (__HAS_RESUME__ ? `${import.meta.env.BASE_URL}resume.pdf` : undefined)
