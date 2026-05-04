import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import {
  InstagramIcon, GithubIcon, LinkedInIcon, DouyinIcon, RedBookIcon,
} from './Icons'

const SOCIALS = [
  { name: '抖音', en: 'Douyin', href: 'https://v.douyin.com/9Ga_apWjjQg/', Icon: DouyinIcon },
  { name: 'Instagram', en: 'Instagram', href: 'https://www.instagram.com/idbetterrun?igsh=MTNzZ2xkZWh3dzU1eA%3D%3D&utm_source=qr', Icon: InstagramIcon },
  { name: 'GitHub', en: 'GitHub', href: 'https://github.com/idbetterrun', Icon: GithubIcon },
  { name: 'LinkedIn', en: 'LinkedIn', href: 'https://cn.linkedin.com/in/%E6%B8%85%E8%8F%AF-%E8%AD%9A-b73110278', Icon: LinkedInIcon },
  { name: '小红书', en: 'RED', href: 'https://xhslink.com/m/xy3yXF6OmK', Icon: RedBookIcon },
]

const QUICK_LINKS_KEYS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const

export default function Footer() {
  const { t, lang, toggleLang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer ref={ref} className="relative pt-16 md:pt-24 pb-8 overflow-hidden border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 max-w-3xl"
        >
          <div className="font-mono text-[10px] mb-4 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
            // OUTRO
          </div>
          <p className="font-display text-3xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--ink)', letterSpacing: 0 }}>
            {t.footer.cta}
          </p>
        </motion.div>

        {/* Links + Socials grid */}
        <div className="grid grid-cols-12 gap-8 pb-12 md:pb-20">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-6 md:col-span-3"
          >
            <p className="font-mono text-[10px] mb-5 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
              / {t.footer.links}
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS_KEYS.map(key => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(key === 'home' ? 'hero' : key)}
                    className="font-sans text-sm link-underline transition-colors"
                    style={{ color: 'var(--ink)' }}
                  >
                    {t.nav[key as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-6 md:col-span-4"
          >
            <p className="font-mono text-[10px] mb-5 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
              / {t.footer.socials}
            </p>
            <ul className="space-y-2">
              {SOCIALS.map(({ name, en, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 font-sans text-sm transition-colors"
                    style={{ color: 'var(--ink)' }}
                  >
                    <span style={{ color: 'var(--muted)' }} className="group-hover:text-[var(--accent)] transition-colors">
                      <Icon size={16} />
                    </span>
                    <span className="link-underline">{lang === 'zh' ? name : en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="col-span-12 md:col-span-5"
          >
            <p className="font-mono text-[10px] mb-5 tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
              / DIRECT
            </p>
            <a
              href="mailto:acaimaomao@gmail.com"
              className="font-display text-xl sm:text-2xl md:text-3xl font-medium link-underline block break-all"
              style={{ color: 'var(--ink)', letterSpacing: 0 }}
            >
              acaimaomao@gmail.com
            </a>
            <p className="font-mono text-xs mt-3" style={{ color: 'var(--muted)' }}>
              +86 191 6487 3028
            </p>
          </motion.div>
        </div>

        {/* Big name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="overflow-hidden"
        >
          <h2 className="watermark-name">
            TAN&nbsp;QINGHUA<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-8 mt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
            {t.footer.year}
          </p>
          <button
            onClick={toggleLang}
            className="font-mono text-[10px] tracking-[0.2em] uppercase link-underline"
            style={{ color: 'var(--muted)' }}
          >
            {t.footer.lang}
          </button>
        </div>
      </div>
    </footer>
  )
}
