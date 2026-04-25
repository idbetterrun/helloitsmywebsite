import { useRef, useEffect } from 'react'

export function useMagnet(strength = 0.25, radius = 60) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const mx = dx * strength
        const my = dy * strength
        el.style.transform = `translate(${mx}px, ${my}px)`
      } else {
        el.style.transform = 'translate(0, 0)'
      }
    }

    const onMouseLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength, radius])

  return ref
}
