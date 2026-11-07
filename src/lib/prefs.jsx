import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ui } from '../data/ui.js'

const PrefsContext = createContext(null)

const read = (key) => {
  try { return localStorage.getItem(key) } catch { return null }
}
const write = (key, value) => {
  try { localStorage.setItem(key, value) } catch { /* storage blocked: preference lives for this visit only */ }
}

const initialLang = () => {
  const saved = read('lang')
  if (saved === 'ar' || saved === 'en') return saved
  return (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en'
}
const initialTheme = () => {
  const saved = read('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function PrefsProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = ui.meta.title[lang]
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui.meta.description[lang])
    write('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1C1915' : '#EDE6D6')
    write('theme', theme)
  }, [theme])

  const toggleLang = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  /** pick the current language from a { en, ar } object */
  const t = useCallback((v) => (v && typeof v === 'object' && 'en' in v ? v[lang] : v), [lang])

  const value = useMemo(() => ({ lang, theme, toggleLang, toggleTheme, t, isRtl: lang === 'ar' }), [lang, theme, toggleLang, toggleTheme, t])
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export const usePrefs = () => useContext(PrefsContext)
