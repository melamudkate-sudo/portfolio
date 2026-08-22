/**
 * A soft circular accent glow that fades to fully transparent within its
 * own bounds, via radial-gradient rather than a solid circle + CSS blur.
 * blur(Npx) only softens edges up to N pixels past the element's own box —
 * inside an overflow-hidden ancestor (or just while the element itself is
 * moving/scaling), that residual blur radius gets clipped, showing as a
 * hard cutoff right where the blur was still fading out. A radial-gradient
 * reaches transparent (0 alpha) before the box edge, so there's no edge
 * left for anything to clip.
 */
export function radialGlow(opacityPercent: number, fadeStop = 75) {
  return `radial-gradient(closest-side, color-mix(in oklab, var(--color-primary) ${opacityPercent}%, transparent) 0%, transparent ${fadeStop}%)`
}
