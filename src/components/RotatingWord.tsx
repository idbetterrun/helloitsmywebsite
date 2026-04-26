import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const ROTATING_WORD_INTERVAL = 4600

interface Props {
  words: readonly string[]
  color?: string
  interval?: number
}

export function RotatingWord({ words, color = 'var(--accent)', interval = ROTATING_WORD_INTERVAL }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        height: '1.1em',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'block', color }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
