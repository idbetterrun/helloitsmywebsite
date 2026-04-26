import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  words: readonly string[]
  color?: string
  interval?: number
}

export function RotatingWord({ words, color = 'var(--accent)', interval = 2400 }: Props) {
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
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'block', color }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
