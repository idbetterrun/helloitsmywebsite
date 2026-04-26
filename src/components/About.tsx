import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { useLang } from '../i18n/LangContext'

const TOOLS_LIST = [
  { keyName: 'AI 工具', en: 'AI Tools', items: ['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Kimi', 'Perplexity', 'NotebookLM', 'Suno', 'MidJourney'] },
  { keyName: '设计 & 内容', en: 'Design & Content', items: ['Canva', 'Affinity', '剪映', 'Instagram', 'Facebook', 'Discord'] },
  { keyName: '开发 & 效率', en: 'Dev & Productivity', items: ['Electron', 'React', 'Vite', 'Node.js', 'Codex', 'Claude Code'] },
]

export default function About() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 42000, suffix: '+', label: t.about.stat1Label },
    { value: 500, suffix: '+', label: t.about.stat2Label },
    { value: 212, suffix: '%', label: t.about.stat3Label, divisor: 10 },
  ]

  const titles = [t.about.toolsTitle1, t.about.toolsTitle2, t.about.toolsTitle3]

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-3xl"
        >
          <div className="section-eyebrow mb-8">{t.about.eyebrow}</div>
          <h2 className="section-heading">{t.about.heading}</h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 md:col-span-5"
          >
            <p
              className="font-sans text-lg"
              style={{ color: 'var(--ink)', lineHeight: 1.7, fontWeight: 400 }}
            >
              {t.about.bio}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 md:col-span-3 flex flex-col gap-8"
          >
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} trigger={inView} delay={i * 200} />
            ))}
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 md:col-span-4"
          >
            {TOOLS_LIST.map((category, i) => (
              <div key={category.keyName} className="mb-8">
                <p className="font-mono text-[10px] mb-3 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                  {titles[i]}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {category.items.map(tool => (
                    <span
                      key={tool}
                      className="font-mono text-xs cursor-default transition-colors"
                      style={{ color: 'var(--muted)', lineHeight: 2 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, trigger, delay }: {
  stat: { value: number; suffix: string; label: string; divisor?: number }
  trigger: boolean
  delay: number
}) {
  const [started, setStarted] = useState(false)
  const displayValue = useCountUp(stat.value, 1500, started)

  useEffect(() => {
    if (trigger) {
      const t = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(t)
    }
  }, [trigger, delay])

  const formatted = stat.divisor
    ? (displayValue / stat.divisor).toFixed(1)
    : displayValue.toLocaleString()

  return (
    <div>
      <div className="font-display font-bold mb-1" style={{ color: 'var(--ink)', fontSize: '40px', lineHeight: 1, letterSpacing: '-0.04em' }}>
        {formatted}<span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
      </div>
      <div className="font-sans text-xs" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
        {stat.label}
      </div>
    </div>
  )
}
