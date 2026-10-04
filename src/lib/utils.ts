import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Shared wide grid for all section headings and their content. */
export const SECTION_CONTAINER_CLASS = "mx-auto w-full max-w-7xl px-6"
