import React, { useEffect, useId, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { cn } from "@/lib/utils"

/**
 *  DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 * @param {boolean} [glow=false] - Whether dots should have a glowing animation effect
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
  /**
   * Externally-tracked pointer position (container-relative px). Pass this
   * when the pattern sits behind interactive siblings that would otherwise
   * swallow pointer events before they reach the SVG itself — track on a
   * common ancestor instead and hand the position down. Falls back to
   * tracking pointer events on the SVG directly when omitted.
   */
  mouseX?: MotionValue<number>
  mouseY?: MotionValue<number>
  [key: string]: unknown
}

/**
 * DotPattern Component
 *
 * A React component that creates an animated or static dot pattern background using SVG.
 * The pattern automatically adjusts to fill its container and can optionally display glowing dots.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With glowing effect and custom spacing
 * <DotPattern
 *   width={20}
 *   height={20}
 *   glow={true}
 *   className="opacity-50"
 * />
 *
 * @notes
 * - The component is client-side only ("use client")
 * - Automatically responds to container size changes
 * - When glow is enabled, dots are rendered as one SVG pattern with one
 *   shared, gentle pulse. This prevents long sections from creating
 *   thousands of permanent per-dot animations.
 * - Dots additionally enlarge and shift to the theme's accent color near the pointer, driven purely by cursor position (no loop)
 * - Uses Motion for animations
 * - Dots color can be controlled via the text color utility classes
 */

const PROXIMITY_RADIUS = 200

function PulsingDotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow: _glow,
  mouseX: _mouseX,
  mouseY: _mouseY,
  ...props
}: DotPatternProps) {
  const id = useId()
  const reduceMotion = useReducedMotion()

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80', className)}
      {...props}
      style={{ ...props.style, animation: reduceMotion ? 'none' : 'dot-pattern-pulse 8s ease-in-out infinite' }}
    >
      <defs>
        <pattern id={`${id}-dots`} width={width} height={height} x={x} y={y} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dots)`} />
    </svg>
  )
}

function ReactiveDot({
  cx,
  cy,
  r,
  mouseX,
  mouseY,
}: {
  cx: number
  cy: number
  r: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const proximity = useTransform([mouseX, mouseY], (latest) => {
    const [mx, my] = latest as [number, number]
    const distance = Math.hypot(mx - cx, my - cy)
    return Math.max(0, 1 - distance / PROXIMITY_RADIUS)
  })
  const scale = useTransform(proximity, (p) => 1 + p * 0.9)
  const baseOpacity = useTransform(proximity, (p) => 0.4 + p * 0.2)
  const accentOpacity = useTransform(proximity, (p) => p)

  return (
    <motion.g style={{ scale, transformOrigin: `${cx}px ${cy}px` }}>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="currentColor"
        style={{ opacity: baseOpacity }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        className="fill-primary"
        style={{ opacity: accentOpacity }}
      />
    </motion.g>
  )
}

function InteractiveDotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow: _glow,
  mouseX: externalMouseX,
  mouseY: externalMouseY,
  ...props
}: DotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isControlled = externalMouseX != null && externalMouseY != null

  const internalMouseX = useSpring(useMotionValue(-1000), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })
  const internalMouseY = useSpring(useMotionValue(-1000), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })
  const mouseX = externalMouseX ?? internalMouseX
  const mouseY = externalMouseY ?? internalMouseY

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const updateDimensions = () => {
      const { width, height } = node.getBoundingClientRect()
      setDimensions({ width, height })
    }

    // ResizeObserver on the container itself, not window resize: the
    // section this sits in can grow from its own content (e.g. adding the
    // stats row) without the window ever resizing, and a window-only
    // listener never learns about that — the dot grid would stay sized to
    // whatever the container measured at mount.
    updateDimensions()
    const observer = new ResizeObserver(updateDimensions)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  function handlePointerLeave() {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  const dots = Array.from(
    {
      length:
        Math.ceil(dimensions.width / width) *
        Math.ceil(dimensions.height / height),
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width)
      const row = Math.floor(i / Math.ceil(dimensions.width / width))
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }
    }
  )

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={isControlled ? undefined : handlePointerMove}
      onPointerLeave={isControlled ? undefined : handlePointerLeave}
      className={cn(
        "absolute inset-0 h-full w-full text-neutral-400/80",
        isControlled ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <ReactiveDot
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </svg>
  )
}

export function DotPattern(props: DotPatternProps) {
  return props.glow ? <PulsingDotPattern {...props} /> : <InteractiveDotPattern {...props} />
}
