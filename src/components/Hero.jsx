import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { person, socials } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { BrandIcon, Glyph, LayeredIcon, UiIcon, brandColor } from '../lib/icons.jsx'
import { CodeLines, Magnetic, ease, useRichMotion } from '../lib/motion.jsx'

/* Typed line with the square cursor of the Nabni mark */
function Typed({ phrases }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => { setI(0); setText(''); setDeleting(false) }, [phrases])
  useEffect(() => {
    if (reduce) { setText(phrases[0]); return }
    const full = phrases[i % phrases.length]
    let delay = deleting ? 28 : 55
    if (!deleting && text === full) delay = 1900
    if (deleting && text === '') delay = 250
    const id = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') { setDeleting(false); setI((n) => n + 1) }
      else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, i, phrases, reduce])
  return (
    <p className="hero__typed" aria-label={phrases.join(' ')}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}

/* Name reveal: letters for Latin, whole words for Arabic (keeps letters joined) */
function NameReveal({ text, delay = 0, className }) {
  const { lang } = usePrefs()
  const parts = lang === 'ar' ? [text] : Array.from(text)
  return (
    <span className={`name-line ${className || ''}`} aria-hidden="true">
      {parts.map((ch, i) => (
        <span className="name-mask" key={`${lang}-${i}`}>
          <motion.span
            className="name-char"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Portrait() {
  const { t } = usePrefs()
  const rich = useRichMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 18 })
  const sy = useSpring(py, { stiffness: 90, damping: 18 })
  const photoX = useTransform(sx, (v) => v * 6)
  const photoY = useTransform(sy, (v) => v * 4)
  const dotX = useTransform(sx, (v) => v * -18)
  const dotY = useTransform(sy, (v) => v * -14)
  const farX = useTransform(sx, (v) => v * 22)
  const farY = useTransform(sy, (v) => v * 16)
  const [imgOk, setImgOk] = useState(true)

  useEffect(() => {
    if (!rich) return
    const move = (e) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [rich, px, py])

  return (
    <div className="portrait" data-cursor>
      {/* floating Nabni tiles */}
      <motion.div className="float float--1" style={{ x: farX, y: farY }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 0.6, ease }}>
        <div className="bob"><LayeredIcon name="code" size={64} /></div>
      </motion.div>
      <motion.div className="float float--2" style={{ x: farX, y: farY }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.6, ease }}>
        <div className="bob bob--slow"><LayeredIcon name="database" size={56} /></div>
      </motion.div>
      <motion.div className="float float--3" style={{ x: farX, y: farY }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.6, ease }}>
        <div className="bob"><LayeredIcon name="automation" size={52} /></div>
      </motion.div>

      <div className="portrait__stage">
        {/* the bowl of the ن: a surface plate on an edge layer */}
        <motion.div className="portrait__plate" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, ease, delay: 0.35 }} />
        <CodeLines rows={14} seed={7} opacity={0.9} />

        <motion.div className="portrait__photo" style={{ x: photoX, y: photoY }} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease, delay: 0.55 }}>
          {imgOk ? (
            <img src={person.photo} alt={t(person.photoAlt)} width="414" height="664" fetchPriority="high" decoding="async" onError={() => setImgOk(false)} />
          ) : (
            <div className="portrait__placeholder">{t({ en: 'Your photo goes here', ar: 'مكان صورتك' })}</div>
          )}
        </motion.div>

        {/* the clay stroke of the ن drawn around the bowl */}
        <svg className="portrait__ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path d="M3 38 A47 60 0 0 0 97 38" className="ring-shadow" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease, delay: 0.5 }} vectorEffect="non-scaling-stroke" />
          <motion.path d="M3 36 A47 60 0 0 0 97 36" className="ring-main" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease, delay: 0.45 }} vectorEffect="non-scaling-stroke" />
        </svg>

        {/* the square dot: the cursor */}
        <motion.div className="portrait__dot" style={{ x: dotX, y: dotY }} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.05 }}>
          <span className="blink"><Glyph name="terminal" size={38} /></span>
        </motion.div>
      </div>

      <motion.div className="hero__code" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.7, ease }}>
        <div className="code-window">
          <div className="code-window__bar"><i /><i /><i /><span>mahmoud.js</span></div>
          <pre>
            <span className="k">const</span> mahmoud = {'{\n'}
            {'  '}role: <span className="s">'Junior Full Stack'</span>,{'\n'}
            <span className="hl">{'  '}stack: [<span className="s">'Node.js'</span>, <span className="s">'React'</span>, <span className="s">'PostgreSQL'</span>],</span>
            {'  '}automates: <span className="s">'n8n'</span>,{'\n'}
            {'}'}
          </pre>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const { t, lang } = usePrefs()
  const [first, ...rest] = t(person.name).split(' ')
  const live = socials.filter((s) => s.url && !s.key)
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <CodeLines rows={26} seed={2} opacity={0.45} />
      <div className="hero__inner container">
        <div className="hero__text">
          <motion.p className="hero__badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }}>
            <span className="pulse" aria-hidden="true" />
            {t(ui.hero.available)}
          </motion.p>

          <h1 className="hero__title" id="hero-title">
            <motion.span className="hero__hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{t(ui.hero.hello)}</motion.span>
            <span className="sr-only">{t(person.name)}</span>
            <NameReveal key={`a-${lang}`} text={first} delay={0.35} />
            <NameReveal key={`b-${lang}`} text={rest.join(' ')} delay={0.55} className="is-clay" />
          </h1>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.85 }}>
            <p className="hero__role">
              <span className="mono-tag">{'<'}</span>
              {t(person.role)} <span className="hero__role-tag">{t(person.roleTag)}</span>
              <span className="mono-tag">{'/>'}</span>
            </p>
            <Typed phrases={t(person.typed)} />
            <p className="hero__intro">{t(person.intro)}</p>
          </motion.div>

          <motion.div className="hero__ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 1 }}>
            <Magnetic>
              <a href="#projects" className="btn">{t(ui.hero.projects)} <UiIcon name="arrow" size={18} /><span className="sr-only"> </span></a>
            </Magnetic>
            <a href={person.cv} className="btn btn--ghost" download>
              <UiIcon name="download" size={18} /> {t(ui.hero.cv)}
            </a>
            <a href="#contact" className="link-arrow">{t(ui.hero.contact)} <UiIcon name="arrow" size={16} /></a>
          </motion.div>

          <motion.div className="hero__meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}>
            <ul className="hero__socials" aria-label={t(ui.nav.social)}>
              {live.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="icon-btn brand-hover" style={{ '--brand': brandColor(s.id) }} aria-label={t(s.label)}>
                    <BrandIcon id={s.id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <span className="hero__loc"><UiIcon name="pin" size={16} /> {t(person.location)}</span>
          </motion.div>
        </div>

        <div className="hero__art">
          <Portrait />
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label={t(ui.hero.scroll)}>
        <span className="mono">{t(ui.hero.scroll)}</span>
        <span className="hero__scroll-track"><span /></span>
      </a>
    </section>
  )
}
