import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { ArrowUpRight } from './Icons'

const TOOLS_LIST = [
  { keyName: 'AI 工具', en: 'AI Tools', items: ['ChatGPT', 'Claude', 'Gemini', 'DeepSeek', 'Kimi', 'Perplexity', 'NotebookLM', 'Suno', 'MidJourney'] },
  { keyName: '设计 & 内容', en: 'Design & Content', items: ['Canva', 'Affinity', '剪映', 'Instagram', 'Facebook', 'Discord'] },
  { keyName: '开发 & 效率', en: 'Dev & Productivity', items: ['Electron', 'React', 'Vite', 'Node.js', 'Codex', 'Claude Code'] },
]

export default function About() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
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

          {/* Meta strip — info moved from Hero */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
            {[t.about.metaLabel1, t.about.metaLabel2, t.about.metaLabel3, t.about.meta].map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--muted)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="max-w-3xl">
              <p
                className="font-sans text-[22px]"
                style={{ color: 'var(--ink)', lineHeight: 1.65, fontWeight: 450 }}
              >
                {t.about.bio}
              </p>
              <p
                className="font-sans text-base mt-8 max-w-2xl"
                style={{ color: 'var(--muted)', lineHeight: 1.9 }}
              >
                {t.about.bioSecondary}
              </p>
            </div>

            <div
              className="mt-12 pt-8 flex flex-wrap items-center gap-4 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
                PDF / Resume
              </span>
              <button
                type="button"
                className="btn-ghost inline-flex items-center gap-2"
                style={{ padding: '12px 22px' }}
              >
                {t.about.resumeButton}
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 lg:col-span-5"
          >
            <div
              className="p-8 md:p-10"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '6px' }}
            >
              <div className="mb-10">
                <p className="font-mono text-[10px] mb-4 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                  {t.about.courseTitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  {t.about.courseList.map((course) => (
                    <span key={course} className="pill" style={{ padding: '8px 14px', fontSize: '12px', color: 'var(--ink)' }}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {TOOLS_LIST.map((category, i) => (
                <div
                  key={category.keyName}
                  className={i === TOOLS_LIST.length - 1 ? '' : 'mb-8 pb-8 border-b'}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="font-mono text-[10px] mb-3 tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
                    {titles[i]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map(tool => (
                      <span
                        key={tool}
                        className="pill"
                        style={{ padding: '7px 12px', fontSize: '11px' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
