import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LangContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIAssistant() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: t.ai.welcome }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastAssistantMsg = messages[messages.length - 1]?.role === 'assistant'
    ? messages[messages.length - 1].content
    : null

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMessages([{ role: 'assistant', content: t.ai.welcome }])
    }, 0)
    return () => window.clearTimeout(id)
  }, [t.ai.welcome])

  useEffect(() => {
    if (!lastAssistantMsg) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= lastAssistantMsg.length) {
        setDisplayedText(lastAssistantMsg.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 22)
    return () => clearInterval(interval)
  }, [lastAssistantMsg])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedText, messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, lang }),
      })
      const data = await res.json()
      if (!res.ok) {
        const errorMessage = [data.error, data.details].filter(Boolean).join(' - ')
        throw new Error(errorMessage || 'Request failed')
      }
      const reply = data.choices?.[0]?.message?.content || t.ai.defaultReply
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : t.ai.networkError
      setMessages(prev => [...prev, { role: 'assistant', content: message }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <AnimatePresence>
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase mr-3 whitespace-nowrap"
              style={{ color: 'var(--muted)' }}
            >
              {t.ai.bubble} →
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(o => !o)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ background: 'var(--ink)', color: 'var(--bg)' }}
        >
          {open ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 10C2 5.58 5.58 2 10 2s8 3.58 8 8-3.58 8-8 8c-1.42 0-2.76-.37-3.92-1.02L2 18l1.02-4.08C2.37 12.76 2 11.42 2 10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '76px',
              right: '16px',
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(500px, calc(100dvh - 104px))',
              zIndex: 50,
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              transformOrigin: 'bottom right',
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="font-display text-base font-semibold" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {t.ai.title}
                </div>
                <div className="font-mono text-[10px] mt-0.5 tracking-[0.15em] uppercase" style={{ color: 'var(--muted)' }}>
                  {t.ai.subtitle}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                X
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1
                const content = isLast && msg.role === 'assistant' ? displayedText : msg.content
                return (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[80%] px-3.5 py-2.5 font-sans text-sm"
                      style={{
                        background: msg.role === 'user' ? 'var(--ink)' : 'var(--bg-alt)',
                        color: msg.role === 'user' ? 'var(--bg)' : 'var(--ink)',
                        lineHeight: 1.6,
                        borderRadius: '4px',
                      }}
                    >
                      {content}
                    </div>
                  </div>
                )
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 font-mono text-sm" style={{ background: 'var(--bg-alt)', color: 'var(--muted)', borderRadius: '4px' }}>
                    <span className="animate-pulse">···</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-5 pb-5">
              <div
                className="flex gap-2 p-2"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '4px' }}
              >
                <input
                  className="flex-1 bg-transparent font-sans text-sm outline-none px-2"
                  style={{ color: 'var(--ink)' }}
                  placeholder={t.ai.placeholder}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 flex items-center justify-center transition-opacity"
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--bg)',
                    opacity: loading || !input.trim() ? 0.3 : 1,
                    borderRadius: '2px',
                  }}
                >
                  ^
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
