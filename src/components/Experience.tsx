import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { FlipCard } from './FlipCard'

export default function Experience() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-3xl"
        >
          <div className="section-eyebrow mb-8">{t.experience.eyebrow}</div>
          <h2 className="section-heading">{t.experience.heading}</h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-12">
          {/* Timeline */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-0">
              {t.experience.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <FlipCard
                    front={<TimelineFront item={item} />}
                    back={<TimelineBack item={item} t={t} />}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="col-span-12 lg:col-span-4 lg:pl-12 lg:border-l" style={{ borderColor: 'var(--border)' }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-mono text-[10px] mb-6 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
                // {t.experience.educationLabel}
              </p>
              {t.experience.education.map((edu, i) => (
                <div key={i} className="mb-8">
                  <div className="font-mono text-[11px] mb-2 tracking-[0.1em]" style={{ color: 'var(--accent)' }}>
                    {edu.year}
                  </div>
                  <div className="font-sans font-medium text-base mb-1" style={{ color: 'var(--ink)' }}>
                    {edu.school}
                  </div>
                  <div className="font-sans text-sm mb-1" style={{ color: 'var(--muted)' }}>
                    {edu.degree}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
                    {edu.note}
                  </div>
                </div>
              ))}

              <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="font-mono text-[10px] mb-5 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
                  // {t.experience.certsLabel}
                </p>
                {['CET-4', 'CET-6'].map(cert => (
                  <div key={cert} className="flex items-center gap-3 mb-3">
                    <span style={{ color: 'var(--accent)' }} className="font-mono">◆</span>
                    <span className="font-mono text-sm" style={{ color: 'var(--ink)' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----- timeline item faces ----- */

type Item = (typeof import('../i18n/translations').translations.zh.experience.items)[number]

function TimelineFront({ item }: { item: Item }) {
  return (
    <div className="timeline-item flex gap-10 py-8 group">
      <div
        className="timeline-time font-mono text-[11px] w-28 flex-shrink-0 pt-1 whitespace-pre-line transition-colors tracking-[0.1em]"
        style={{ color: 'var(--muted)' }}
      >
        {item.date}
      </div>

      <div className="timeline-content flex-1">
        <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
          <h3 className="font-sans font-semibold text-lg" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            {item.title}
          </h3>
          {item.subtitle && (
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
              {item.subtitle}
            </span>
          )}
        </div>
        <p className="font-sans text-sm mb-3" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          {item.desc}
        </p>
        <div className="flex gap-2 flex-wrap items-center">
          {item.tags.map(tag => (
            <span key={tag} className="pill">{tag}</span>
          ))}
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            FLIP →
          </span>
        </div>
      </div>
    </div>
  )
}

function TimelineBack({ item, t }: { item: Item; t: typeof import('../i18n/translations').translations.zh }) {
  return (
    <div
      className="flex gap-10 py-8 px-6 -mx-6 rounded"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div
        className="font-mono text-[11px] w-28 flex-shrink-0 pt-1 whitespace-pre-line tracking-[0.1em]"
        style={{ color: 'var(--accent)' }}
      >
        {item.date}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-[10px] mb-3 tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
            / {t.experience.detailLabels.responsibilities}
          </p>
          <ul className="space-y-2">
            {item.detail.responsibilities.map((line, idx) => (
              <li key={idx} className="font-sans text-[13px] flex gap-2" style={{ color: 'var(--ink)', lineHeight: 1.55 }}>
                <span style={{ color: 'var(--muted)' }} className="font-mono text-[10px] flex-shrink-0 mt-1">
                  0{idx + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] mb-3 tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
            / {t.experience.detailLabels.achievements}
          </p>
          <ul className="space-y-2">
            {item.detail.achievements.map((line, idx) => (
              <li key={idx} className="font-sans text-[13px] flex gap-2" style={{ color: 'var(--ink)', lineHeight: 1.55 }}>
                <span style={{ color: 'var(--accent)' }} className="font-mono text-[10px] flex-shrink-0 mt-1">
                  ◆
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
