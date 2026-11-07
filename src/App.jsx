import { MotionConfig } from 'motion/react'
import { PrefsProvider, usePrefs } from './lib/prefs.jsx'
import { ui } from './data/ui.js'
import { Cursor, Intro, Nav, ScrollProgress } from './components/Chrome.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import { Contact, FloatingContact, Journey, Services, Social } from './components/Sections.jsx'
import Footer from './components/Footer.jsx'

function Page() {
  const { t, lang } = usePrefs()
  return (
    <>
      <a href="#main" className="skip-link">{t(ui.nav.skip)}</a>
      <Intro />
      <ScrollProgress />
      <Nav />
      {/* key on lang replays entrance animations when the language flips */}
      <main id="main" key={lang}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <Cursor />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PrefsProvider>
        <Page />
      </PrefsProvider>
    </MotionConfig>
  )
}
