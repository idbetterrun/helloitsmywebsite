import { useEffect, useRef, useState } from 'react'

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(target: number, duration = 1200, trigger = false) {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!trigger) return

    startRef.current = null

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.floor(easeOut(progress) * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, trigger])

  return value
}
