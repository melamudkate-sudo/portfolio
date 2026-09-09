import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shared horizontal constraint for the navbar and the Hero card grid, so
 * their left/right edges line up. Both apply this on their own outer
 * wrapper (never on a padded ancestor) — mixing "pad the ancestor" with
 * "constrain this element" produces subtly different edges depending on
 * viewport width even when the numbers look like they should match.
 */
export const CONTAINER_CLASS = "mx-auto w-full max-w-5xl px-6"

/** Shared wide grid for all section headings and their content. */
export const SECTION_CONTAINER_CLASS = "mx-auto w-full max-w-7xl px-6"
