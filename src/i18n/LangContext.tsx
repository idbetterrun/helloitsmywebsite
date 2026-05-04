import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang, type TranslationDict } from './translations'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: TranslationDict
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'zh'
    return (localStorage.getItem('lang') as Lang) || 'zh'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const toggleLang = () => setLang(l => (l === 'zh' ? 'en' : 'zh'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] as unknown as TranslationDict }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be inside LangProvider')
  return ctx
}
