import type { MouseEvent } from 'react'

export type Goal =
  | 'projects_click'
  | 'project_video_system'
  | 'project_production'
  | 'project_tender'
  | 'project_erp_calendar'
  | 'resume_download'
  | 'contacts_open'
  | 'contact_telegram'
  | 'contact_email'
  | 'contact_whatsapp'
  | 'projects_view'
  | 'contacts_view'

type Metrika = (counter: number, method: 'reachGoal', goal: Goal, params?: Record<string, unknown>, callback?: () => void) => void

declare global {
  interface Window { ym?: Metrika }
}

export function trackGoal(goal: Goal, callback?: () => void): boolean {
  if (typeof window.ym !== 'function') return false
  try {
    if (callback) window.ym(113423608, 'reachGoal', goal, {}, callback)
    else window.ym(113423608, 'reachGoal', goal)
    return true
  } catch {
    // Analytics must never prevent navigation or break the page.
    return false
  }
}

export function trackLinkGoal(event: MouseEvent<HTMLAnchorElement>, goal: Goal) {
  if (event.defaultPrevented || event.button > 1) return
  const link = event.currentTarget
  // New tabs and downloads leave this page alive to finish sending the goal.
  // Modified clicks retain the browser's native handling, including new windows.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      (link.target && link.target !== '_self') || link.hasAttribute('download')) {
    trackGoal(goal)
    return
  }
  if (typeof window.ym !== 'function') return

  event.preventDefault()
  let followed = false
  const follow = () => {
    if (followed) return
    followed = true
    window.clearTimeout(timer)
    window.location.assign(link.href)
  }
  // A blocked or slow counter must not leave the link unresponsive.
  const timer = window.setTimeout(follow, 500)
  if (!trackGoal(goal, follow)) follow()
}

const viewedGoals = new Set<Goal>()

export function trackViewOnce(goal: 'projects_view' | 'contacts_view'): boolean {
  const key = `metrika:113423608:${goal}`
  if (viewedGoals.has(goal)) return true
  try {
    if (sessionStorage.getItem(key)) { viewedGoals.add(goal); return true }
  } catch { /* Use the in-memory guard when storage is unavailable. */ }
  if (!trackGoal(goal)) return false
  viewedGoals.add(goal)
  try { sessionStorage.setItem(key, '1') } catch { /* The in-memory guard still applies. */ }
  return true
}
