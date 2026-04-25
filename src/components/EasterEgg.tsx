import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function EasterEgg() {
  const [visible, setVisible] = useState(false)
  const [, setSequence] = useState<string[]>([])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setSequence(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join() === KONAMI.join()) {
          setVisible(true)
          return []
        }
        return next
      })
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setVisible(false) }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="max-w-lg w-full mx-8 rounded-2xl p-10"
            style={{ background: '#0E0E0C', border: '1px solid #F0C040' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="font-mono text-xs mb-6" style={{ color: '#F0C040' }}>
              // you found the easter egg
            </div>

            <div className="font-mono text-sm space-y-3 mb-8" style={{ color: '#F0EDE8', lineHeight: 1.8 }}>
              <p>{'>'} 这个网站用了 Claude Sonnet 4.6 写的。</p>
              <p>{'>'} 整个构建过程没有手写一行样式。</p>
              <p>{'>'} Konami Code 永远是对的答案。</p>
              <p>{'>'} 如果你找到了这里，说明你很认真。</p>
              <p style={{ color: '#F0C040' }}>
                {'>'} 那就发个消息吧 → acaimaomao@gmail.com
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setVisible(false)}
                className="font-mono text-xs px-6 py-2 rounded-full border"
                style={{ borderColor: '#F0C040', color: '#F0C040' }}
              >
                ESC to close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
