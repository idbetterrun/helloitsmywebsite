import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { ArrowRight, GithubIcon } from './Icons'

interface StatDisplay {
  value: number
  label: string
  suffix?: string
  format?: (v: number) => string
}

function AnimatedStat({ value, label, suffix, format }: StatDisplay) {
  const [display, setDisplay] = useState(0)

  const runCount = useCallback(() => {
    const start = Math.floor(Math.random() * value)
    const duration = 600
    const startTime = performance.now()
    const animate = (t: number) => {
      const progress = Math.min((t - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(start + (value - start) * eased))
      if (progress < 1) requestAnimationFrame(animate)
      else setDisplay(value)
    }
    requestAnimationFrame(animate)
  }, [value])

  return (
    <div className="text-left" onMouseEnter={runCount}>
      <div className="font-display font-bold mb-0.5" style={{ color: 'var(--ink)', fontSize: '28px', lineHeight: 1, letterSpacing: '-0.03em' }}>
        {format ? format(display) : display.toLocaleString()}<span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </div>
      <div className="font-sans text-[11px]" style={{ color: 'var(--muted)' }}>{label}</div>
    </div>
  )
}

const TAGS = ['Electron', 'React', 'Vite', 'Node.js', 'Tiptap', 'CodeMirror']

export default function Projects() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const velocity = useRef(0)
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const momentumRef = useRef<number>(0)

  const setupSpotlight = (card: HTMLElement) => {
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - rect.left}px`)
      card.style.setProperty('--y', `${e.clientY - rect.top}px`)
    }
    card.addEventListener('mousemove', onMove)
    return () => card.removeEventListener('mousemove', onMove)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.pageX - track.offsetLeft
      scrollLeft.current = track.scrollLeft
      lastX.current = e.pageX
      lastTime.current = performance.now()
      velocity.current = 0
      track.style.cursor = 'grabbing'
      cancelAnimationFrame(momentumRef.current)
    }

    const onMouseUp = () => {
      isDragging.current = false
      track.style.cursor = 'grab'
      const slideMomentum = () => {
        velocity.current *= 0.95
        track.scrollLeft += velocity.current
        if (Math.abs(velocity.current) > 0.5) {
          momentumRef.current = requestAnimationFrame(slideMomentum)
        }
      }
      momentumRef.current = requestAnimationFrame(slideMomentum)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX.current) * 1.5
      track.scrollLeft = scrollLeft.current - walk

      const now = performance.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        velocity.current = (lastX.current - e.pageX) / dt * 16
      }
      lastX.current = e.pageX
      lastTime.current = now
    }

    track.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 mb-16 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="section-eyebrow mb-8">{t.projects.eyebrow}</div>
          <h2 className="section-heading">{t.projects.heading}</h2>
        </motion.div>

        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-500)}
            className="w-11 h-11 flex items-center justify-center rounded-full border transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <ArrowRight size={14} className="rotate-180" />
          </button>
          <button
            onClick={() => scrollBy(500)}
            className="w-11 h-11 flex items-center justify-center rounded-full border transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          cursor: 'grab',
          paddingLeft: 'max(32px, calc((100vw - 1400px) / 2 + 32px))',
          paddingRight: 'max(32px, calc((100vw - 1400px) / 2 + 32px))',
        }}
      >
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="project-card flex-shrink-0 p-10 select-none"
          style={{
            width: '720px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
          }}
          ref={el => { if (el) setupSpotlight(el as HTMLElement) }}
          whileHover={{ y: -4 }}
        >
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <div className="font-mono text-[10px] mb-4 tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                {t.projects.project1.period}
              </div>
              <h3 className="font-display text-4xl font-bold mb-5" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                {t.projects.project1.title}
              </h3>
              <p className="font-sans text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                {t.projects.project1.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {TAGS.map(tag => (
                  <span key={tag} className="pill">{tag}</span>
                ))}
              </div>
              <a
                href="https://github.com/idbetterrun/TomaNotes-release"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 text-xs"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                <GithubIcon size={13} />
                GitHub →
              </a>
            </div>

            <div className="col-span-5 flex flex-col gap-5 justify-center">
              <div className="font-mono text-[10px] mb-1 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                {t.projects.project1.statsTitle}
              </div>
              <AnimatedStat value={42000} label={t.projects.project1.s1} suffix="+" />
              <AnimatedStat value={9000} label={t.projects.project1.s2} />
              <AnimatedStat value={212} label={t.projects.project1.s3} format={v => (v / 10).toFixed(1)} suffix="%" />
              <div>
                <div className="font-display font-bold" style={{ color: 'var(--ink)', fontSize: '28px', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  95<span style={{ color: 'var(--accent)' }}>%</span>
                </div>
                <div className="font-sans text-[11px]" style={{ color: 'var(--muted)' }}>{t.projects.project1.s4}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="project-card flex-shrink-0 p-10 select-none"
          style={{
            width: '420px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
          }}
          ref={el => { if (el) setupSpotlight(el as HTMLElement) }}
          whileHover={{ y: -4 }}
        >
          <div className="font-mono text-[10px] mb-4 tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
            {t.projects.project2.period}
          </div>
          <h3 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            {t.projects.project2.title}
          </h3>
          <p className="font-sans text-sm mb-8" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            {t.projects.project2.desc}
          </p>
          <div className="grid grid-cols-2 gap-5">
            <AnimatedStat value={500} label={t.projects.project2.s1} suffix="+" />
            <AnimatedStat value={800} label={t.projects.project2.s2} suffix="+" />
            <AnimatedStat value={1500} label={t.projects.project2.s3} suffix="+" />
            <AnimatedStat value={60} label={t.projects.project2.s4} suffix="%" />
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="project-card flex-shrink-0 p-10 select-none"
          style={{
            width: '320px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
          }}
          ref={el => { if (el) setupSpotlight(el as HTMLElement) }}
          whileHover={{ y: -4 }}
        >
          <div className="font-mono text-[10px] mb-4 tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
            {t.projects.project3.period}
          </div>
          <h3 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            {t.projects.project3.title}
          </h3>
          <p className="font-mono text-[10px] mb-6 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
            {t.projects.project3.award}
          </p>
          <p className="font-sans text-sm mb-8" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            {t.projects.project3.desc}
          </p>
          <div className="pt-6 border-t flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
            <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>★</span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
              {t.projects.project3.badge}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
