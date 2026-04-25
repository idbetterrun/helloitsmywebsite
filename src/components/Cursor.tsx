import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const trailParticles = useRef<{ x: number; y: number; opacity: number; birth: number }[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let lastTrailTime = 0

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      const now = performance.now()
      if (now - lastTrailTime > 16) {
        trailParticles.current.push({ x: e.clientX, y: e.clientY, opacity: 0.06, birth: now })
        lastTrailTime = now
      }

      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [data-magnetic]') !== null
      const isText = target.closest('p, h1, h2, h3, h4, span, li') !== null

      if (isClickable) {
        ring.style.width = '40px'
        ring.style.height = '40px'
        ring.style.backgroundColor = 'var(--accent)'
        ring.style.opacity = '0.4'
        dot.style.opacity = '0'
      } else if (isText) {
        ring.style.width = '3px'
        ring.style.height = '20px'
        ring.style.backgroundColor = 'var(--accent)'
        ring.style.borderRadius = '2px'
        ring.style.opacity = '0.8'
        dot.style.opacity = '1'
      } else {
        ring.style.width = '24px'
        ring.style.height = '24px'
        ring.style.backgroundColor = 'transparent'
        ring.style.borderRadius = '50%'
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
    }

    const animate = (timestamp: number) => {
      // Lerp ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12

      dot.style.left = mousePos.current.x + 'px'
      dot.style.top = mousePos.current.y + 'px'
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'

      // Draw trail
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = timestamp
      trailParticles.current = trailParticles.current.filter(p => now - p.birth < 1200)

      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()

      for (const p of trailParticles.current) {
        const age = (now - p.birth) / 1200
        const alpha = p.opacity * (1 - age)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 30, 0, Math.PI * 2)
        ctx.fillStyle = accentColor.startsWith('#')
          ? hexToRgba(accentColor, alpha)
          : `rgba(192, 57, 43, ${alpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-radius 0.2s, opacity 0.2s',
        }}
      />
    </>
  )
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
