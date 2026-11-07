import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { contact, journey, services, socials } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { BrandIcon, LayeredIcon, UiIcon, brandColor } from '../lib/icons.jsx'
import { Magnetic, SectionHead, ease, fadeUp, stagger } from '../lib/motion.jsx'

const kindLabel = {
  education: { en: 'education', ar: 'تعليم' },
  training: { en: 'training', ar: 'تدريب' },
  cert: { en: 'certificate', ar: 'شهادة' },
  program: { en: 'program', ar: 'برنامج' },
}

/* ── Journey: a git log of learning; the line draws as you scroll ── */
export function Journey() {
  const { t } = usePrefs()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead index={4} eyebrow={ui.sections.journey} title={ui.sections.journeyTitle} id="journey-title" />
        <p className="journey__cmd mono ltr"><span className="k">$</span> git log --journey --oneline</p>
        <ol className="timeline" ref={ref}>
          <span className="timeline__track" aria-hidden="true"><motion.span className="timeline__fill" style={{ scaleY }} /></span>
          {journey.map((j, i) => (
            <motion.li
              key={j.title.en}
              className={`tl-item tl-item--${j.kind}`}
              initial={{ opacity: 0, x: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-date">
                <span className="mono">{t(j.date)}</span>
                <span className="tl-kind">{t(kindLabel[j.kind])}</span>
              </div>
              <div className="tile tl-card is-pressable">
                <span className="tl-hash mono ltr" aria-hidden="true">{(0x1a2f3 + i * 0x9e3).toString(16).slice(0, 7)}</span>
                <h3>{t(j.title)}</h3>
                <p>{t(j.body)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── Services ── */
export function Services() {
  const { t } = usePrefs()
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead index={5} eyebrow={ui.sections.services} title={ui.sections.servicesTitle} id="services-title" />
        <motion.ul className="svc-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={stagger(0.07)}>
          {services.map((s, i) => (
            <motion.li key={s.title.en} className="tile svc-card is-pressable" variants={fadeUp}>
              <span className="svc-card__run" aria-hidden="true" />
              <div className="svc-card__top">
                <LayeredIcon name={s.icon} size={58} />
                <span className="mono svc-card__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{t(s.title)}</h3>
              <p>{t(s.body)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ── Find me across the internet ── */
export function Social() {
  const { t } = usePrefs()
  const live = socials.filter((s) => s.url)
  return (
    <section className="section social" id="social" aria-labelledby="social-title">
      <div className="container">
        <SectionHead index={6} eyebrow={ui.sections.social} title={ui.sections.socialTitle} lead={ui.social.lead} id="social-title" />
        <motion.ul className={`social-grid count-${live.length}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={stagger(0.08)}>
          {live.map((s) => (
            <motion.li key={s.key || s.id} variants={fadeUp}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="tile social-card is-pressable" style={{ '--brand': brandColor(s.id), '--on-brand': brandColor(s.id) === 'var(--ink)' ? 'var(--ground)' : '#fff' }}>
                <span className="social-card__stripe" aria-hidden="true" />
                <span className="social-card__icon"><BrandIcon id={s.id} size={28} /></span>
                <span className="social-card__body">
                  <span className="social-card__name">{t(s.label)}</span>
                  {s.handle && <span className="social-card__handle mono ltr">{s.handle}</span>}
                  <span className="social-card__about">{t(s.about)}</span>
                </span>
                <span className="social-card__cta">{t(ui.social.visit)} <UiIcon name="arrow" size={16} /></span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ── Direct channels shared by Contact and the floating widget ── */
export function useChannels() {
  const list = []
  if (contact.whatsapp) list.push({ id: 'whatsapp', label: ui.contact.whatsapp, value: `+${contact.whatsapp}`, href: `https://wa.me/${contact.whatsapp}` })
  if (contact.email) list.push({ id: 'email', label: { en: 'Email', ar: 'الإيميل' }, value: contact.email, href: `mailto:${contact.email}` })
  if (contact.instagram) list.push({ id: 'instagram', label: { en: 'Instagram', ar: 'إنستغرام' }, value: `@${contact.instagram}`, href: `https://instagram.com/${contact.instagram}` })
  if (contact.telegram) list.push({ id: 'telegram', label: { en: 'Telegram', ar: 'تيليجرام' }, value: `@${contact.telegram}`, href: `https://t.me/${contact.telegram}` })
  if (contact.linkedin) list.push({ id: 'linkedin', label: { en: 'LinkedIn', ar: 'لينكدإن' }, value: contact.linkedin, href: `https://www.linkedin.com/in/${contact.linkedin}` })
  return list
}

/* ── Contact ── */
export function Contact() {
  const { t } = usePrefs()
  const channels = useChannels()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()
    if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) { setError(t(ui.contact.required)); return }
    setError('')
    if (!contact.formEndpoint) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Portfolio — ${name}`)}&body=${body}`
      setStatus('mail')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(contact.formEndpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHead index={7} eyebrow={ui.sections.contact} title={ui.sections.contactTitle} lead={ui.contact.lead} id="contact-title" />
          <p className="contact__direct-label mono">{t(ui.contact.direct)}</p>
          <ul className="channels">
            {channels.map((c) => (
              <li key={c.id}>
                <a href={c.href} target={c.id === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="channel">
                  <span className={`channel__icon channel__icon--${c.id}`} style={{ '--brand': brandColor(c.id) }}><BrandIcon id={c.id} size={22} /></span>
                  <span className="channel__text"><span className="channel__label">{t(c.label)}</span><span className="channel__value ltr">{c.value}</span></span>
                  <UiIcon name="arrow" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form className="tile contact__form" onSubmit={submit} noValidate initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <label className="field">
            <span>{t(ui.contact.name)}</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label className="field">
            <span>{t(ui.contact.email)}</span>
            <input name="email" type="email" autoComplete="email" inputMode="email" dir="ltr" required />
          </label>
          <label className="field">
            <span>{t(ui.contact.message)}</span>
            <textarea name="message" rows="5" required />
          </label>
          <div className="form-foot">
            <Magnetic>
              <button className="btn" type="submit" disabled={status === 'sending'}>
                <UiIcon name="arrow" size={18} />
                {t(status === 'sending' ? ui.contact.sending : ui.contact.send)}
              </button>
            </Magnetic>
            <p className={`form-status${error || status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
              {error || (status === 'sent' && t(ui.contact.sent)) || (status === 'mail' && t(ui.contact.mailOpened)) || (status === 'error' && t(ui.contact.error)) || ''}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

/* ── Floating contact widget ── */
export function FloatingContact() {
  const { t } = usePrefs()
  const channels = useChannels().filter((c) => ['whatsapp', 'instagram', 'telegram', 'email'].includes(c.id))
  const [open, setOpen] = useState(false)
  if (!channels.length) return null
  return (
    <div className="fab">
      <AnimatePresence>
        {open && (
          <motion.ul className="fab__list" initial="hidden" animate="show" exit="hidden" variants={{ hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }, show: { transition: { staggerChildren: 0.05 } } }}>
            {channels.map((c) => (
              <motion.li key={c.id} variants={{ hidden: { opacity: 0, y: 14, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}>
                <a href={c.href} target={c.id === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className={`fab__item fab__item--${c.id}`} aria-label={t(c.label)} title={t(c.label)}>
                  <BrandIcon id={c.id} size={22} />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button className={`fab__btn${open ? ' is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t(ui.contact.floating)}>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease }} style={{ display: 'grid' }}>
          <UiIcon name={open ? 'plus' : 'chat'} size={24} />
        </motion.span>
      </button>
    </div>
  )
}
