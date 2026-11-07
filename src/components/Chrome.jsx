import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { ui } from '../data/ui.js'
import { person } from '../data/profile.js'
import { NabniMark, UiIcon } from '../lib/icons.jsx'
import { ease, useRichMotion } from '../lib/motion.jsx'

export const SECTIONS = ['about', 'skills', 'projects', 'journey', 'services', 'social', 'contact']

/* ── Intro: the Nabni mark builds itself, layer by layer. Once per session. ── */
export function Intro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('intro-seen') } catch { return true }
  })
  useEffect(() => {
    if (!show) return
    if (reduce) { setShow(false); return }
    try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ }
    const id = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(id)
  }, [show, reduce])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="intro" aria-hidden="true" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease }}>
            <NabniMark size={112} animate />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Scroll progress: thin clay bar with the square cursor at its head ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 })
  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress__bar" style={{ scaleX }} />
    </div>
  )
}

/* ── Cursor: the square from the logo follows the pointer (desktop only) ── */
export function Cursor() {
  const rich = useRichMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (!rich) return
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      setHover(!!e.target.closest?.('a, button, input, textarea, [data-cursor]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [rich, x, y])
  if (!rich) return null
  return <motion.div className={`cursor${hover ? ' is-hover' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true" />
}

/* ── Navigation ── */
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const top = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', top) }
  }, [])
  return active
}

function Toggles() {
  const { t, lang, theme, toggleLang, toggleTheme } = usePrefs()
  return (
    <div className="toggles">
      <button className="icon-btn lang-btn" onClick={toggleLang} aria-label={t(ui.nav.langSwitch)} title={t(ui.nav.langSwitch)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={lang} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
            {lang === 'ar' ? 'EN' : 'ع'}
          </motion.span>
        </AnimatePresence>
      </button>
      <button className="icon-btn" onClick={toggleTheme} aria-label={t(theme === 'dark' ? ui.nav.themeLight : ui.nav.themeDark)} title={t(theme === 'dark' ? ui.nav.themeLight : ui.nav.themeDark)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
            <UiIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}

export function Nav() {
  const { t } = usePrefs()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    // browsers restore the scroll position after first paint on reload
    const late = setTimeout(onScroll, 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(late); window.removeEventListener('scroll', onScroll) }
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav__inner container">
          <a href="#top" className="brand" aria-label={t(person.name)}>
            <NabniMark size={34} />
            <span className="brand__name">{t(person.name)}</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            <ul>
              {SECTIONS.filter((s) => s !== 'contact').map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined}>
                    {active === id && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="nav__sq" aria-hidden="true" /><span className="nav__label">{t(ui.nav[id])}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__end">
            <Toggles />
            <a href="#contact" className="btn btn--small nav__cta">{t(ui.nav.contact)}</a>
            <button className="icon-btn nav__menu" onClick={() => setOpen(true)} aria-label={t(ui.nav.menu)} aria-expanded={open} aria-controls="mobile-menu">
              <span className="burger" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu" className="sheet" role="dialog" aria-modal="true" aria-label={t(ui.nav.menu)}
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="sheet__top container">
              <span className="brand"><NabniMark size={34} /><span className="brand__name">{t(person.name)}</span></span>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label={t(ui.nav.close)} autoFocus><UiIcon name="close" /></button>
            </div>
            <motion.ul className="sheet__links container" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}>
              {SECTIONS.map((id, i) => (
                <motion.li key={id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                  <a href={`#${id}`} onClick={() => setOpen(false)}>
                    <span className="mono sheet__num">{String(i + 1).padStart(2, '0')}</span>
                    {t(ui.nav[id])}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="sheet__foot container"><Toggles /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
