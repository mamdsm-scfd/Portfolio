import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { usePrefs } from './prefs.jsx'

export const ease = [0.22, 1, 0.36, 1]

/** true on a desktop mouse/trackpad, false on touch devices */
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

/** Rich effects only for fine pointers on users who did not ask for reduced motion. */
export function useRichMotion() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  return fine && !reduce
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export function Reveal({ as = 'div', children, delay = 0, y = 28, className, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.75, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Section header: numbered eyebrow + two-line title, second line in clay-deep (Nabni title rule). */
export function SectionHead({ index, eyebrow, title, lead, id }) {
  const { t } = usePrefs()
  const lines = t(title)
  return (
    <motion.header className="section-head" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -15% 0px' }} variants={stagger(0.1)}>
      <motion.p className="eyebrow" variants={fadeUp}>
        <span className="sq" aria-hidden="true" />
        <span className="num">{String(index).padStart(2, '0')} ·</span>
        <span>{t(eyebrow)}</span>
      </motion.p>
      <h2 className="section-title" id={id}>
        {lines.map((line, i) => (
          <span className="line" key={i}>
            <motion.span variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}>{line}</motion.span>
          </span>
        ))}
      </h2>
      {lead && <motion.p className="lead" variants={fadeUp}>{t(lead)}</motion.p>}
    </motion.header>
  )
}

/** Pulls its child toward the pointer a little. Desktop only. */
export function Magnetic({ children, strength = 0.28 }) {
  const rich = useRichMotion()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  if (!rich) return children
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} style={{ x, y, display: 'inline-flex' }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}

/** Counts up once when visible. */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setShown(value); return }
    const controls = animate(mv, value, { duration: 1.6, ease, onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value, reduce, mv])
  return <span ref={ref} className="ltr">{shown}{suffix}</span>
}

/** Decorative "code lines" — the identity's only pattern. Deterministic widths. */
export function CodeLines({ rows = 18, seed = 3, opacity = 1 }) {
  const lines = []
  let s = seed
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < rows; i++) {
    let x = 4 + Math.floor(rand() * 3) * 6
    const segs = 1 + Math.floor(rand() * 3)
    for (let j = 0; j < segs; j++) {
      const w = 8 + rand() * 26
      if (x + w > 96) break
      lines.push({ x, y: 4 + i * (92 / rows), w })
      x += w + 3
    }
  }
  return (
    <div className="code-lines" aria-hidden="true" style={{ opacity }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((l, i) => <rect key={i} x={l.x} y={l.y} width={l.w} height="1.4" rx="0.7" fill="currentColor" />)}
      </svg>
    </div>
  )
}
