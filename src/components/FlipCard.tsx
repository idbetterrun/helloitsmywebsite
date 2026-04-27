import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface Props {
  front: ReactNode
  back: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * 3-D card flip on click.
 * Uses CSS-grid stacking so the container height = max(front, back).
 * Ignores clicks that look like drags (>5 px movement) to play nice
 * with horizontally draggable parents (e.g. Projects carousel).
 */
export function FlipCard({ front, back, className, style }: Props) {
  const [flipped, setFlipped] = useState(false)
  const downPos = useRef({ x: 0, y: 0 })

  const onMouseDown = (e: MouseEvent) => {
    downPos.current = { x: e.clientX, y: e.clientY }
  }

  const onClick = (e: MouseEvent) => {
    const dx = Math.abs(e.clientX - downPos.current.x)
    const dy = Math.abs(e.clientY - downPos.current.y)
    if (dx > 5 || dy > 5) return // it was a drag, not a click
    setFlipped(f => !f)
  }

  return (
    <div
      className={className}
      style={{ perspective: 1500, ...style }}
      onMouseDown={onMouseDown}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped(f => !f)
        }
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          display: 'grid',
          cursor: 'pointer',
        }}
      >
        {/* Front face */}
        <div
          style={{
            gridArea: '1/1',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>
        {/* Back face — pre-rotated 180° so it shows when parent is flipped */}
        <div
          style={{
            gridArea: '1/1',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
