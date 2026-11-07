import { motion } from 'motion/react'
import { usePrefs } from '../lib/prefs.jsx'
import { about, stats } from '../data/profile.js'
import { ui } from '../data/ui.js'
import { Glyph, LayeredIcon } from '../lib/icons.jsx'
import { Counter, SectionHead, fadeUp, stagger } from '../lib/motion.jsx'

const steps = {
  en: ['Understand the data', 'Sketch the flow', 'Ship the smallest version', 'Improve it'],
  ar: ['أفهم البيانات', 'أرسم المسار', 'أبني أصغر نسخة شغّالة', 'أحسّنها'],
}

export default function About() {
  const { t } = usePrefs()
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index={1} eyebrow={ui.sections.about} title={ui.sections.aboutTitle} id="about-title" />

        <motion.div className="bento" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={stagger(0.08)}>
          <motion.article className="tile bento__story" variants={fadeUp}>
            <h3 className="tile-label">{t(ui.sections.story)}</h3>
            <p className="story-text">{t(about.story)}</p>
          </motion.article>

          <motion.article className="tile bento__edu is-pressable" variants={fadeUp}>
            <LayeredIcon name="book" size={52} />
            <h3 className="tile-label">{t(ui.sections.education)}</h3>
            <p className="edu-school">{t(about.education.school)}</p>
            <p className="edu-degree">{t(about.education.degree)}</p>
            <p className="tag">{about.education.years}</p>
          </motion.article>

          <motion.article className="tile bento__stats" variants={fadeUp}>
            {stats.map((s) => (
              <div className="stat" key={s.label.en}>
                <span className="stat__num"><Counter value={s.value} suffix={s.suffix} /></span>
                <span className="stat__label">{t(s.label)}</span>
              </div>
            ))}
          </motion.article>

          <motion.article className="tile bento__think" variants={fadeUp}>
            <h3 className="tile-label">{t(ui.sections.thinking)}</h3>
            <p className="muted">{t(about.thinking)}</p>
            <ol className="flow">
              {t(steps).map((s, i) => (
                <li key={s}><span className="flow__n mono">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </motion.article>

          <motion.article className="bento__loop" variants={fadeUp}>
            <div className="code-window">
              <div className="code-window__bar"><i /><i /><i /><span>routine.js</span></div>
              <pre>
                <span className="k">while</span> (<span className="k">true</span>) {'{\n'}
                {'  '}learn();{'\n'}
                <span className="hl">{'  '}build();</span>
                {'  '}share(<span className="s">'@nabni28'</span>);{'\n'}
                {'}'}
              </pre>
            </div>
          </motion.article>

          <motion.article className="tile bento__interests" variants={fadeUp}>
            <h3 className="tile-label">{t(ui.sections.interests)}</h3>
            <ul className="interest-list">
              {about.interests.map((it) => (
                <li key={it.en} className="chip"><Glyph name="ai" size={14} />{t(it)}</li>
              ))}
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
