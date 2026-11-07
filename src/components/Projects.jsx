import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { projects, socials } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { BrandIcon, Glyph, UiIcon } from '../lib/icons.jsx'
import { CodeLines, SectionHead, ease, useRichMotion } from '../lib/motion.jsx'

const FILTERS = ['all', 'fullstack', 'frontend', 'backend', 'automation']

function Links({ p }) {
  const { t } = usePrefs()
  if (!p.github && !p.live && !p.files) return <p className="proj-nolink mono">{t(ui.projects.noLinks)}</p>
  return (
    <div className="proj-links">
      {p.live && <a className="btn btn--small" href={p.live} target="_blank" rel="noopener noreferrer"><UiIcon name="external" size={16} />{t(ui.projects.live)}</a>}
      {p.github && <a className="btn btn--small btn--ghost" href={p.github} target="_blank" rel="noopener noreferrer"><BrandIcon id="github" size={16} />{t(ui.projects.code)}</a>}
      {p.files && <a className="btn btn--small btn--ghost" href={p.files} target="_blank" rel="noopener noreferrer"><UiIcon name="external" size={16} />{t(ui.projects.files)}</a>}
    </div>
  )
}

function Details({ p }) {
  const { t } = usePrefs()
  return (
    <dl className="proj-details">
      <div><dt>{t(ui.projects.problem)}</dt><dd>{t(p.problem)}</dd></div>
      <div><dt>{t(ui.projects.role)}</dt><dd>{t(p.role)}</dd></div>
      <div>
        <dt>{t(ui.projects.highlights)}</dt>
        <dd><ul className="ticks">{t(p.highlights).map((h) => <li key={h}>{h}</li>)}</ul></dd>
      </div>
    </dl>
  )
}

/* Illustration of NABD's Arabic RTL dashboard, drawn in brand shapes (not a screenshot). */
function DashboardArt() {
  return (
    <div className="dash" dir="rtl" aria-hidden="true">
      <div className="dash__side">
        <span className="dash__logo"><Glyph name="shield" size={22} /></span>
        {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`dash__nav${i === 1 ? ' on' : ''}`} />)}
      </div>
      <div className="dash__main">
        <div className="dash__top"><span className="bar w40" /><span className="pill" /></div>
        <div className="dash__cards">
          {['المرضى', 'الزيارات', 'التطعيمات'].map((l, i) => (
            <div className="dash__card" key={l}>
              <span className="dash__label">{l}</span>
              <span className="bar" style={{ width: `${70 - i * 15}%` }} />
              <span className="dash__spark">{[5, 8, 6, 9, 7, 10].map((h, j) => <i key={j} style={{ height: `${h * (i + 2)}%` }} />)}</span>
            </div>
          ))}
        </div>
        <div className="dash__table">
          {[0, 1, 2, 3].map((r) => (
            <div className="dash__row" key={r}>
              <span className="sq" /><span className="bar" style={{ width: `${45 - r * 6}%` }} /><span className="bar short" /><span className={`badge b${r % 3}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Featured({ p }) {
  const { t } = usePrefs()
  const rich = useRichMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 })
  const onMove = (e) => {
    if (!rich) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { mx.set(0); my.set(0) }
  return (
    <motion.article
      className="tile featured"
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="featured__info">
        <p className="featured__kicker"><span className="badge-featured">{t(ui.projects.featured)}</span><span className="mono">{t(p.kicker)}</span></p>
        <h3 className="featured__title">{t(p.name)}</h3>
        <p className="featured__summary">{t(p.summary)}</p>
        <Details p={p} />
        <ul className="stack">{p.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <Links p={p} />
      </div>
      <div className="featured__art" onPointerMove={onMove} onPointerLeave={reset} data-cursor>
        <CodeLines rows={16} seed={11} opacity={0.7} />
        <motion.div className="featured__screen" style={rich ? { rotateX: rx, rotateY: ry } : undefined}>
          <DashboardArt />
        </motion.div>
      </div>
    </motion.article>
  )
}

function Card({ p, index }) {
  const { t } = usePrefs()
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      layout
      className={`tile proj-card${open ? ' is-open' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.55, ease, delay: index * 0.05 }}
    >
      <motion.div layout="position" className={`proj-cover proj-cover--${p.category}`}>
        <CodeLines rows={9} seed={index + 4} opacity={1} />
        <span className="proj-cover__glyph"><Glyph name={p.icon} size={64} /></span>
        <span className="proj-cover__cat mono">{t(ui.projects[p.category])}</span>
      </motion.div>
      <motion.div layout="position" className="proj-body">
        <p className="proj-kicker mono">{t(p.kicker)}</p>
        <h3 className="proj-title">{t(p.name)}</h3>
        <p className="proj-summary">{t(p.summary)}</p>
        <ul className="stack">{p.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="d" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} style={{ overflow: 'hidden' }}>
              <Details p={p} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="proj-foot">
          <Links p={p} />
          <button className="proj-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            <span className="proj-toggle__icon"><UiIcon name="plus" size={16} /></span>
            {t(open ? ui.projects.hide : ui.projects.details)}
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = usePrefs()
  const [filter, setFilter] = useState('all')
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured && (filter === 'all' || p.category === filter))
  const showFeatured = filter === 'all' || featured.some((p) => p.category === filter)
  const gh = socials.find((s) => s.id === 'github')?.url

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead index={3} eyebrow={ui.sections.projects} title={ui.sections.projectsTitle} id="projects-title" />

        <div className="filters" role="tablist" aria-label={t(ui.sections.projects)}>
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} className={`filter${filter === f ? ' is-on' : ''}`} onClick={() => setFilter(f)}>
              {filter === f && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="filter__label">{t(ui.projects[f])}</span>
            </button>
          ))}
        </div>

        {showFeatured && featured.map((p) => <Featured key={p.id} p={p} />)}

        <motion.div layout className="proj-grid">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => <Card key={p.id} p={p} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {gh && (
          <div className="proj-more">
            <a href={gh} target="_blank" rel="noopener noreferrer" className="link-arrow">{t(ui.projects.more)} <UiIcon name="arrow" size={16} /></a>
          </div>
        )}
      </div>
    </section>
  )
}
