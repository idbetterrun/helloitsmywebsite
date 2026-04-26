import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { ArrowUpRight } from './Icons'
import { RotatingWord } from './RotatingWord'

export default function Contact() {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState<string | null>(null)

  const items = [
    { type: 'phone', label: t.contact.tipPhone, value: '19164873028', action: 'copy' },
    { type: 'email', label: t.contact.tipEmail, value: 'acaimaomao@gmail.com', action: 'email' },
    { type: 'wechat', label: t.contact.tipWechat, value: 'tequihar', action: 'copy' },
  ]

  const handleClick = async (item: typeof items[0]) => {
    if (item.action === 'copy') {
      await navigator.clipboard.writeText(item.value)
      setCopied(item.value)
      setTimeout(() => setCopied(null), 1500)
    } else if (item.action === 'email') {
      window.location.href = `mailto:${item.value}`
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-4xl"
        >
          <div className="section-eyebrow mb-8">{t.contact.eyebrow}</div>
          <h2 className="section-heading" style={{ lineHeight: 1.15 }}>
            {/* Line 1: rotating — isolated so width changes don't reflow line 2 */}
            <span style={{ display: 'block' }}>
              {t.contact.headingPrefix}
              <RotatingWord words={t.contact.rotatingWords} />
              {t.contact.headingSuffix}
            </span>
            {/* Line 2: static accent line */}
            <span style={{ display: 'block', color: 'var(--accent)' }}>
              {t.contact.headingTwo}
            </span>
          </h2>
          <p className="font-sans text-base mt-6" style={{ color: 'var(--muted)' }}>
            {t.contact.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-12 mt-20">
          {/* Contacts list */}
          <div className="col-span-12 md:col-span-7 space-y-1">
            {items.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => handleClick(item)}
                className="w-full flex items-center gap-8 py-6 text-left group border-b transition-all"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono text-[10px] w-12 tracking-[0.2em] uppercase flex-shrink-0" style={{ color: 'var(--muted)' }}>
                  / {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] w-20 tracking-[0.2em] uppercase flex-shrink-0" style={{ color: 'var(--muted)' }}>
                  {item.label}
                </span>
                <span
                  className="font-display text-2xl md:text-3xl flex-1 transition-colors font-medium"
                  style={{
                    color: copied === item.value ? 'var(--accent)' : 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {copied === item.value ? `${t.contact.copied} ✓` : item.value}
                </span>
                <span
                  className="font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.18em] uppercase"
                  style={{ color: 'var(--muted)' }}
                >
                  {item.action === 'copy' ? t.contact.copy : t.contact.sendEmail} →
                </span>
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="col-span-12 md:col-span-5 md:pl-12 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <button
                onClick={() => handleClick(items[1])}
                className="btn-primary w-full justify-center text-base"
                style={{ padding: '20px 32px' }}
              >
                {t.contact.ctaButton}
                <ArrowUpRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
