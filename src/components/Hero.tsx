import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { ArrowUpRight } from './Icons'
import { RotatingWord } from './RotatingWord'

const TOOLS = [
  'ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Canva', 'Electron', 'React',
  'MidJourney', 'Notion', 'Instagram', 'Perplexity', 'NotebookLM', 'Suno',
  'Affinity', 'Kimi', 'Discord', 'Facebook', 'Vite', 'Node.js',
]

export default function Hero() {
  const { t } = useLang()

  // JS-driven marquee — avoids animation-duration jump bug
  const marqueeRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const speedRef = useRef(1)        // px per frame
  const rafRef = useRef(0)
  const [activeTool, setActiveTool] = useState<string | null>(null)

  useEffect(() => {
    const track = marqueeRef.current
    if (!track) return
    let alive = true
    const step = () => {
      if (!alive) return
      posRef.current += speedRef.current
      const half = track.scrollWidth / 2
      if (posRef.current >= half) posRef.current -= half
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      alive = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col">

      {/* Full-screen background — replace /hero-bg.jpg with your photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0c0c10',
        }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)' }} />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-mono text-[10px] tracking-[0.25em] uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {t.hero.eyebrow}
        </motion.div>

        {/* Headline — serif, centered, with rotating word */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif font-bold leading-tight mb-14"
          style={{
            fontSize: 'clamp(28px, 4vw, 54px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            maxWidth: '860px',
          }}
        >
          {t.hero.headlinePrefix}
          <RotatingWord words={t.hero.rotatingWords} color="var(--accent)" />
          {t.hero.headlineSuffix}
        </motion.h1>

        {/* Glass CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-4 justify-center flex-wrap"
        >
          <button onClick={() => scrollTo('contact')} className="btn-glass">
            {t.hero.ctaPrimary}
            <ArrowUpRight size={14} />
          </button>
          <button onClick={() => scrollTo('projects')} className="btn-glass-outline">
            {t.hero.ctaSecondary}
          </button>
        </motion.div>
      </div>

      {/* Marquee strip at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 pt-4 pb-8 border-t overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        onMouseEnter={() => { speedRef.current = 0.4 }}
        onMouseLeave={() => { speedRef.current = 1; setActiveTool(null) }}
      >
        <div className="max-w-[1400px] mx-auto px-8 mb-3">
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            STACK / TOOLBELT
          </span>
        </div>

        <div className="overflow-hidden">
          <div
            ref={marqueeRef}
            style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
          >
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={i}
                className="font-grotesk text-2xl px-6 whitespace-nowrap font-medium select-none cursor-default"
                style={{
                  color: activeTool === tool ? 'var(--accent)' : 'rgba(255,255,255,0.9)',
                  opacity:
                    activeTool !== null && activeTool !== tool
                      ? 0.3
                      : activeTool === null
                        ? 0.5
                        : 1,
                  transition: 'color 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={() => setActiveTool(tool)}
                onMouseLeave={() => setActiveTool(null)}
              >
                {tool}
                <span
                  className="ml-6"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
