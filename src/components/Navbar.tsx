import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { SunIcon, MoonIcon } from './Icons'

interface NavbarProps {
  darkMode: boolean
  toggleDark: () => void
}

export default function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const { t, lang, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  const sections = [
    { id: 'hero', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
    const update = () => {
      // "active" = topmost section whose top edge has passed 40 % down the viewport
      const threshold = window.scrollY + window.innerHeight * 0.4
      let current = 'hero'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= threshold) {
          current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', update, { passive: true })
    update() // set correct state on mount without waiting for a scroll event
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="font-grotesk text-base font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
          tanqinghua<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-sans text-sm px-4 py-2 rounded-full transition-colors duration-200"
              style={{
                color: active === id ? 'var(--ink)' : 'var(--muted)',
                fontWeight: active === id ? 500 : 400,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = active === id ? 'var(--ink)' : 'var(--muted)')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right toggles */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="font-mono text-xs px-3 py-2 rounded-full border transition-all duration-200 flex items-center gap-1.5"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
            aria-label="Toggle language"
          >
            <span style={{ color: lang === 'zh' ? 'var(--ink)' : 'var(--muted)', fontWeight: lang === 'zh' ? 500 : 400 }}>中</span>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ color: lang === 'en' ? 'var(--ink)' : 'var(--muted)', fontWeight: lang === 'en' ? 500 : 400 }}>EN</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: 'var(--border)', color: 'var(--ink)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon size={15} /> : <MoonIcon size={15} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
