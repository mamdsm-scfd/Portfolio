import { useState } from 'react'
import { motion } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { contact, person, socials } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { BrandIcon, NabniMark, UiIcon, brandColor } from '../lib/icons.jsx'
import { CodeLines, ease } from '../lib/motion.jsx'
import { SECTIONS } from './Chrome.jsx'

/* Giant name: letters (or Arabic words) rise in one after another; each lifts on hover */
function GiantName() {
  const { t, lang } = usePrefs()
  const name = t(person.name)
  const parts = lang === 'ar' ? name.split(' ') : Array.from(name)
  return (
    <motion.p className="fx-giant" aria-hidden="true" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: lang === 'ar' ? 0.15 : 0.045 } } }}>
      {parts.map((ch, i) => (
        <span className="fx-giant__mask" key={`${lang}-${i}`}>
          <motion.span className="fx-giant__ch" variants={{ hidden: { y: '105%', rotate: 8 }, show: { y: 0, rotate: 0, transition: { duration: 0.9, ease } } }}>
            {ch === ' ' ? ' ' : ch}
          </motion.span>
          {lang === 'ar' && i < parts.length - 1 && ' '}
        </span>
      ))}
    </motion.p>
  )
}

export default function Footer() {
  const { t } = usePrefs()
  // main accounts + direct messaging; brand side-accounts (e.g. Rabtana) stay in "Find me"
  const live = [
    ...socials.filter((s) => s.url && !s.key),
    contact.whatsapp && { id: 'whatsapp', label: ui.contact.whatsapp, handle: `+${contact.whatsapp}`, url: `https://wa.me/${contact.whatsapp}` },
    contact.telegram && { id: 'telegram', label: { en: 'Telegram', ar: 'تيليجرام' }, handle: `@${contact.telegram}`, url: `https://t.me/${contact.telegram}` },
  ].filter(Boolean)
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <footer className="fx">
      <div className="fx__slab">
        <CodeLines rows={22} seed={9} opacity={1} />
        <div className="container fx__inner">
          {/* ── call to action ── */}
          <div className="fx__cta">
            <div>
              <p className="fx__prompt mono ltr"><span className="k">$</span> echo "{t(ui.footer.prompt)}"<span className="caret" /></p>
              <h2 className="fx__title">
                <span>{t(ui.footer.title)[0]}</span>
                <span className="is-accent">{t(ui.footer.title)[1]}</span>
              </h2>
              <div className="fx__actions">
                <button className="fx__mail" onClick={copy} data-cursor>
                  <span className="ltr">{contact.email}</span>
                  <span className={`fx__copy${copied ? ' is-done' : ''}`}>{t(copied ? ui.footer.copied : ui.footer.copy)}</span>
                </button>
                {contact.whatsapp && (
                  <a className="btn" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <BrandIcon id="whatsapp" size={18} /> {t(ui.contact.whatsapp)}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── columns ── */}
          <div className="fx__cols">
            <div className="fx__brand">
              <span className="brand"><NabniMark size={48} /><span className="fx__name">{t(person.name)}</span></span>
              <p className="fx__line">{t(ui.footer.line)}</p>
              <p className="fx__time"><span className="pulse" aria-hidden="true" /> {t(person.location)}</p>
            </div>
            <nav aria-label="Footer">
              <p className="fx__label mono">{t(ui.footer.navigate)}</p>
              <ul className="fx__nav">
                {SECTIONS.map((id, i) => (
                  <li key={id}>
                    <a href={`#${id}`}><span className="mono fx__num">{String(i + 1).padStart(2, '0')}</span><span className="fx__navtext">{t(ui.nav[id])}</span></a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="fx__label mono">{t(ui.footer.connect)}</p>
              <ul className="fx__socials">
                {live.map((s) => (
                  <li key={s.key || s.id}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="fx__social" style={{ '--brand': brandColor(s.id) }}>
                      <span className="fx__social-icon"><BrandIcon id={s.id} size={18} /></span>
                      <span className="fx__social-text">
                        <span>{t(s.label)}</span>
                        <span className="mono ltr">{s.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <GiantName />

          <div className="fx__bottom">
            <p className="mono">© {year} {t(person.name)} · {t(ui.footer.rights)}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
