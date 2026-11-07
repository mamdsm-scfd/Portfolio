import { motion } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { skills } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { BrandIcon, LayeredIcon, brandColor } from '../lib/icons.jsx'
import { SectionHead, ease } from '../lib/motion.jsx'

export default function Skills() {
  const { t } = usePrefs()
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead index={2} eyebrow={ui.sections.skills} title={ui.sections.skillsTitle} id="skills-title" />
        <div className="skills__grid">
          {skills.map((group, gi) => (
            <motion.article
              key={group.id}
              className={`tile skill-card is-pressable skill-card--${group.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease, delay: (gi % 3) * 0.08 }}
            >
              <header className="skill-card__head">
                <LayeredIcon name={group.icon} size={50} />
                <div>
                  <span className="mono skill-card__count">{String(group.items.length).padStart(2, '0')}</span>
                  <h3>{t(group.title)}</h3>
                </div>
              </header>
              <motion.ul
                className="skill-card__list"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 + (gi % 3) * 0.08 } } }}
              >
                {group.items.map((s) => (
                  <motion.li key={s.name} className="chip" style={s.icon ? { '--brand': brandColor(s.icon) } : undefined} variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } } }}>
                    {s.icon ? <BrandIcon id={s.icon} size={16} /> : <span className="chip__sq" aria-hidden="true" />}
                    <span className="ltr">{s.name}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
