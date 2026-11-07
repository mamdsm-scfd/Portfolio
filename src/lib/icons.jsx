import {
  siReact, siJavascript, siHtml5, siCss, siTailwindcss, siFigma, siNodedotjs, siExpress, siJsonwebtokens,
  siLaravel, siPostgresql, siMongodb, siMysql, siTypescript, siPython, siGithub, siGooglecloud, siVercel,
  siClaude, siN8n, siJira, siYoutube, siInstagram, siTelegram, siFacebook, siTiktok, siX, siWhatsapp, siGmail,
} from 'simple-icons/icons'

/* ── Brand icons (Simple Icons, official marks) ── */
const linkedin = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const vscode = {
  title: 'Visual Studio Code',
  hex: '007ACC',
  path: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z',
}

const brands = {
  react: siReact, javascript: siJavascript, html5: siHtml5, css: siCss, tailwindcss: siTailwindcss, figma: siFigma,
  nodedotjs: siNodedotjs, express: siExpress, jsonwebtokens: siJsonwebtokens, laravel: siLaravel,
  postgresql: siPostgresql, mongodb: siMongodb, mysql: siMysql, typescript: siTypescript, python: siPython,
  github: siGithub, googlecloud: siGooglecloud, vercel: siVercel, claude: siClaude, n8n: siN8n,
  youtube: siYoutube, instagram: siInstagram, telegram: siTelegram, facebook: siFacebook, tiktok: siTiktok,
  x: siX, whatsapp: siWhatsapp, email: siGmail, linkedin, vscode, jira: siJira,
}

export const brandHex = (id) => (brands[id] ? `#${brands[id].hex}` : null)

/** Official brand colour for hover states. Near-black marks (GitHub, X, Vercel…) use the ink
 *  colour instead so they stay visible in dark mode. */
export const brandColor = (id) => {
  const hex = brands[id]?.hex
  if (!hex) return 'var(--clay)'
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum < 0.12 ? 'var(--ink)' : `#${hex}`
}

export function BrandIcon({ id, size = 20, title, ...rest }) {
  const icon = brands[id]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} {...rest}>
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  )
}

/* ── Nabni layered icons: 64 grid, 4px rounded stroke, clay-tint shadow under the clay glyph ── */
const glyphs = {
  ai: <path d="M32 15c1 11 6 16 17 17-11 1-16 6-17 17-1-11-6-16-17-17 11-1 16-6 17-17Z" fill="currentColor" stroke="none" />,
  api: <path d="M25 15v10M39 15v10M19 25h26v7a13 13 0 0 1-26 0zM32 45v5" />,
  automation: <><circle cx="20" cy="22" r="5.5" /><circle cx="44" cy="42" r="5.5" /><path d="M26 22h10a8 8 0 0 1 8 8v6" /></>,
  chart: <path d="M16 47h32M18 40l9-10 7 6 12-14M38 22h8v8" />,
  code: <path d="M26 22 16 32l10 10M38 22l10 10-10 10" />,
  database: <><ellipse cx="32" cy="20" rx="14" ry="5.5" /><path d="M18 20v24c0 3 6 5.5 14 5.5s14-2.5 14-5.5V20M18 32c0 3 6 5.5 14 5.5s14-2.5 14-5.5" /></>,
  folder: <path d="M15 23a4 4 0 0 1 4-4h8l5 6h13a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z" />,
  git: <><circle cx="22" cy="18" r="5" /><circle cx="22" cy="46" r="5" /><circle cx="42" cy="26" r="5" /><path d="M22 23v18M42 31c0 7-8 8-18 11" /></>,
  pen: <path d="M39 17l8 8-21 21-10 2 2-10zM34 22l8 8" />,
  play: <path d="M25 19.5v25L46 32z" fill="currentColor" />,
  profile: <><circle cx="28" cy="28" r="4.5" /><path d="M19 18h26a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4zM36 28h8M36 35h6M21 40c1.5-4 4-5.5 7-5.5s5.5 1.5 7 5.5" /></>,
  send: <path d="M47 17 16 29l13 6 6 13zM29 35l18-18" />,
  shield: <path d="M32 15l14 5v11c0 9-6 15-14 18-8-3-14-9-14-18V20zM26 32l4.5 4.5L39 28" />,
  target: <><circle cx="32" cy="32" r="15" /><circle cx="32" cy="32" r="7.5" /><circle cx="32" cy="32" r="2.5" fill="currentColor" /></>,
  terminal: <path d="M18 24l10 8-10 8M32 42h14" />,
  web: <><circle cx="32" cy="32" r="15" /><ellipse cx="32" cy="32" rx="6.5" ry="15" /><path d="M17 32h30" /></>,
  chat: <path d="M15 21a6 6 0 0 1 6-6h22a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H31l-9 8v-8h-1a6 6 0 0 1-6-6z" />,
  book: <path d="M32 21c-4-3-9-4-15-4v26c6 0 11 1 15 4 4-3 9-4 15-4V17c-6 0-11 1-15 4zM32 21v26" />,
  flag: <path d="M21 49V15M21 18h22l-5 8 5 8H21" />,
  calendar: <path d="M19 20h26a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4zM15 30h34M25 15v9M39 15v9" />,
}

const glyphProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' }

/** The glyph alone, in two layers (tint shadow + clay). */
export function Glyph({ name, size = 28 }) {
  const g = glyphs[name]
  if (!g) return null
  return (
    <svg viewBox="0 0 64 66" width={size} height={size} aria-hidden="true" className="glyph">
      <g {...glyphProps} transform="translate(0 2)" className="glyph-shadow">{g}</g>
      <g {...glyphProps} className="glyph-main">{g}</g>
    </svg>
  )
}

/** Full Nabni tile: surface square on an edge layer, glyph inside. */
export function LayeredIcon({ name, size = 56 }) {
  return (
    <span className="layered-icon" style={{ '--s': `${size}px` }} aria-hidden="true">
      <Glyph name={name} size={size * 0.78} />
    </span>
  )
}

/** Personal mark: the letter م (Mahmoud) built in Nabni layers.
 *  Its head is the rounded square of the editor cursor; the tail drops like the letter's stem. */
const MIM_TAIL = 'M30.5 31 C23.5 36 21.5 45 21.5 55'
export function NabniMark({ size = 40, bare = false, animate = false }) {
  return (
    <svg viewBox="0 0 72 76" width={size} height={size * (76 / 72)} aria-hidden="true" className={`nabni-mark${animate ? ' is-animated' : ''}`}>
      {!bare && <rect className="mk-edge" x="4" y="8" width="64" height="64" rx="18" />}
      {!bare && <rect className="mk-face" x="4" y="3" width="64" height="64" rx="18" />}
      <g className="mk-shadow" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 2)">
        <rect x="30.5" y="16" width="21" height="21" rx="6.8" />
        <path d={MIM_TAIL} />
      </g>
      <path className="mk-tail" d={MIM_TAIL} fill="none" strokeWidth="9" strokeLinecap="round" pathLength="1" />
      <rect className="mk-head" x="30.5" y="16" width="21" height="21" rx="6.8" fill="none" strokeWidth="9" />
    </svg>
  )
}

/* Small UI icons (Lucide-style strokes) */
const ui = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
}
export function UiIcon({ name, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`ui-icon ui-icon--${name}`}>
      {ui[name]}
    </svg>
  )
}
