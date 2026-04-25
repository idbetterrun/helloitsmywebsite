import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { ArrowUpRight } from './Icons'

const TOOLS = [
  'ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Canva', 'Electron', 'React',
  'MidJourney', 'Notion', 'Instagram', 'Perplexity', 'NotebookLM', 'Suno',
  'Affinity', 'Kimi', 'Discord', 'Facebook', 'Vite', 'Node.js',
]

export default function Hero() {
  const { t } = useLang()
  const photoRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Subtle photo parallax
  useEffect(() => {
    const hero = heroRef.current
    const photo = photoRef.current
    if (!hero || !photo) return

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const rx = ((e.clientY - cy) / rect.height) * 4
      const ry = ((e.clientX - cx) / rect.width) * -4
      photo.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => {
      photo.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)'
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col pt-24 pb-12">
      {/* Top meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-[1400px] mx-auto px-8 w-full flex justify-between font-mono text-[10px] tracking-[0.2em]"
        style={{ color: 'var(--muted)' }}
      >
        <span>{t.hero.basedIn}</span>
        <span>{t.hero.role}</span>
        <span>{t.hero.yearLabel}</span>
      </motion.div>

      {/* Main grid */}
      <div className="flex-1 max-w-[1400px] mx-auto px-8 w-full grid grid-cols-12 gap-8 mt-16 items-center">
        {/* Left: Big headline */}
        <div className="col-span-7 relative">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow mb-10"
          >
            {t.hero.eyebrow}
          </motion.div>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-[0.95] mb-10"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: 'var(--ink)',
              letterSpacing: '-0.045em',
            }}
          >
            <div className="reveal-word">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {t.hero.headline1}
              </motion.span>
            </div>
            <div className="reveal-word">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{ color: 'var(--accent)' }}
              >
                {t.hero.headline2}
              </motion.span>
            </div>
          </h1>

          {/* Sub meta */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-sans text-base mb-12 max-w-md"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            {t.hero.meta}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-3"
          >
            <button onClick={() => scrollTo('contact')} className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowUpRight size={14} />
            </button>
            <button onClick={() => scrollTo('projects')} className="btn-ghost">
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <div className="col-span-5 flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            ref={photoRef}
            className="photo-container relative w-full max-w-[400px] aspect-[4/5] overflow-hidden crop-frame"
            style={{ borderRadius: 0 }}
          >
            <span className="crop-tr" />
            <span className="crop-bl" />

            {/* Photo placeholder */}
            <div
              className="absolute inset-3 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--bg-alt) 0%, var(--border) 100%)',
                filter: 'grayscale(40%) contrast(1.05)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center" style={{ color: 'var(--muted)' }}>
                  <div className="font-mono text-[10px] mb-1 tracking-[0.2em]">[ PHOTO PLACEHOLDER ]</div>
                  <div className="font-mono text-[10px] opacity-50">portrait.jpg</div>
                </div>
              </div>

              {/* Grain */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Caption */}
            <div className="absolute -bottom-7 right-3 font-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
              {t.hero.photoCaption}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full pt-20 pb-2 mt-auto overflow-hidden border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="font-mono text-[10px] tracking-[0.2em] mb-3" style={{ color: 'var(--muted)' }}>
            STACK / TOOLBELT
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={i}
                className="font-grotesk text-2xl px-6 whitespace-nowrap font-medium"
                style={{ color: 'var(--ink)', opacity: 0.4 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
              >
                {tool}
                <span style={{ color: 'var(--accent)' }} className="ml-6">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
