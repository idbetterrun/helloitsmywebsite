import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SkillMap from './components/SkillMap'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import AIAssistant from './components/AIAssistant'
import EasterEgg from './components/EasterEgg'
import { useDeviceProfile } from './hooks/useDeviceProfile'
import './styles/globals.css'

export default function App() {
  useDeviceProfile()

  const [darkMode, setDarkMode] = useState(false)
  const [flashVisible, setFlashVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleDark = () => {
    setFlashVisible(true)
    setTimeout(() => {
      setDarkMode(d => !d)
      setFlashVisible(false)
    }, 150)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined
    import('lenis').then(({ default: Lenis }) => {
      const instance = new Lenis({ lerp: 0.1 })
      lenis = instance
      const raf = (time: number) => {
        instance.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>


      <div className="scroll-progress">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      <AnimatePresence>
        {flashVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[150] pointer-events-none"
            style={{ background: darkMode ? '#ffffff' : '#000000' }}
          />
        )}
      </AnimatePresence>

      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
      <Hero />
      <About />
      <SkillMap />
      <Projects />
      <Experience />
      <Contact />
      <AIAssistant />
      <EasterEgg />
      <Footer />
    </div>
  )
}
