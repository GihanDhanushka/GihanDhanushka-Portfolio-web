import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowDownToLine, ArrowUp, ArrowUpRight, BadgeCheck,
  ClipboardList, Code2, PenTool, GitFork, Globe, GraduationCap, BriefcaseBusiness,
  Mail, MapPin, Menu, Moon, Palette, Search, Sparkle, Sun, X,
} from 'lucide-react'
import { email, github, linkedin, projects, skills } from './data'
import portrait from './assets/portrait.png'

const nav = [
  ['hero', 'Home'], ['about', 'About'], ['portfolio', 'Projects'],
  ['skills', 'Skills'], ['experience', 'Experience'], ['contact', 'Contact'],
]
const contactLinks = [
  { name: 'GitHub', detail: 'github.com/GihanDhanushka', url: github, icon: GitFork },
  { name: 'LinkedIn', detail: 'Gihan Dhanushka', url: linkedin, icon: BriefcaseBusiness },
  { name: 'Email', detail: email, url: 'mailto:' + email, icon: Mail },
]
const process = [
  [Search, 'Discover', 'Research and requirement analysis.'],
  [ClipboardList, 'Plan', 'Project planning and wireframing.'],
  [PenTool, 'Design', 'High-fidelity UI/UX design.'],
  [Code2, 'Develop', 'Frontend and backend implementation.'],
  [BadgeCheck, 'Test', 'Testing and performance improvements.'],
  [Globe, 'Deliver', 'Deployment and final optimization.'],
]
const services = [
  ['Web development', 'Build websites and web applications around real requirements.'],
  ['Frontend development', 'Create accessible, interactive interfaces.'],
  ['Backend development', 'Develop application logic and integrate APIs.'],
  ['Responsive design', 'Adapt interfaces to different screens and devices.'],
  ['Database design', 'Model and organize application data.'],
  ['Maintenance & support', 'Troubleshoot issues and maintain web applications.'],
]
const palettes = { 'color-1': 'Blue', 'color-2': 'Navy', 'color-3': 'Teal', 'color-4': 'Indigo', 'color-5': 'Slate', red: 'Red' }
const cv = import.meta.env.BASE_URL + 'gihan-dhanushka-cv.html'

function ExternalLink({ href, ...props }) {
  const external = href.startsWith('https://')
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props} />
}

function Reveal({ children, className, delay = 0 }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.42, delay }}>{children}</motion.div>
}

function Navbar({ theme, setTheme, palette, setPalette }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [colorsOpen, setColorsOpen] = useState(false)
  const toggle = useRef(null)
  const header = useRef(null)

  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id))
      .sort((a, b) => a.offsetTop - b.offsetTop)
    function onScroll() {
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= 120)
      const bottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      setActive(bottom ? 'contact' : current?.id ?? 'hero')
    }
    function onEscape(event) {
      if (event.key === 'Escape' && toggle.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false)
        toggle.current.focus()
      }
      if (event.key === 'Escape') setColorsOpen(false)
    }
    function onOutside(event) {
      if (!header.current?.contains(event.target)) {
        setOpen(false)
        setColorsOpen(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    document.addEventListener('keydown', onEscape)
    document.addEventListener('pointerdown', onOutside)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('keydown', onEscape)
      document.removeEventListener('pointerdown', onOutside)
    }
  }, [])

  return <header className="header" ref={header}>
    <div className="shell masthead">
      <a className="brand" href="#hero" aria-label="Gihan Dhanushka, home"><span>GD<span>.</span></span><span>GIHAN<br />DHANUSHKA</span></a>
      <nav aria-label="Main navigation" id="navigation" className={open ? 'navigation is-open' : 'navigation'}>
        {nav.map(([id, title]) => <a key={id} href={'#' + id}
          aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>
          {title}
          {active === id && <motion.span className="nav-line" layoutId="nav-line" />}
        </a>)}
      </nav>
      <div className="header-actions flex items-center">
        <a className="availability" href="#contact"><i /> Available for projects</a>
        <div className="appearance">
          <button className="icon-button" aria-label="Accent colors" aria-expanded={colorsOpen} onClick={() => setColorsOpen(!colorsOpen)}><Palette size={16} /></button>
          {colorsOpen && <div className="swatches" role="group" aria-label="Accent colors">{Object.entries(palettes).map(([id, name]) =>
            <button key={id} className={'swatch ' + id} aria-label={name} aria-pressed={palette === id} onClick={() => setPalette(id)} />)}</div>}
        </div>
        <button className="icon-button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="icon-button menu-toggle" ref={toggle} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
          aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>
}

function Socials() {
  return <div className="socials flex items-center">
    {contactLinks.map(({ name, url, icon: Icon }) => <ExternalLink key={name} href={url} aria-label={name} title={name}><Icon size={17} /></ExternalLink>)}
  </div>
}

function Hero() {
  const reduced = useReducedMotion()
  return <section className="hero" id="hero" aria-labelledby="hero-name">
    <div className="shell hero-stage">
      <div className="hero-word" aria-hidden="true">PORTFOLIO</div>
      <motion.img className="portrait" src={portrait} alt="Illustrated portrait of Gihan Dhanushka"
        fetchPriority="high" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} />
      <div className="hero-shade" aria-hidden="true" />
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
        <p className="signature">Hello, I’m</p>
        <h1 id="hero-name">Gihan Dhanushka</h1>
        <p className="hero-role">Software Developer<br /><span>UI/UX Designer</span></p>
        <p className="hero-description">Passionate Information Systems undergraduate focused on creating modern digital experiences, intuitive user interfaces, and innovative software solutions.</p>
        <div className="hero-buttons flex flex-wrap">
          <a className="button primary" href="#portfolio">View my projects <ArrowUpRight size={16} /></a>
          <a className="button outline" download href={cv}>Download CV <ArrowDownToLine size={15} /></a>
        </div>
        <Socials />
      </motion.div>
      <aside className="hero-aside">
        <Sparkle className="hero-spark" size={33} strokeWidth={1} aria-hidden="true" />
        <ul>
          <li>Software Development</li>
          <li>Interface Design</li>
          <li>System Analysis</li>
        </ul>
        <p><MapPin size={14} /> Based in Sri Lanka</p>
      </aside>
      <a href="#portfolio" className="scroll-link" aria-label="Scroll to selected projects"><ArrowDown size={16} /></a>
    </div>
  </section>
}

function ProjectCard({ project, index }) {
  const { name, type, image, repo, demo, description, tags } = project
  return <Reveal delay={0.045 * (index % 4)} className="project-entry">
    <article className="project">
      <div className="project-preview">
        <img src={image} width={1152} height={648} loading="lazy" decoding="async" alt="" />
      </div>
      <div className="project-body">
        <div className="project-title">
          <h3>{name}</h3>
          <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <p className="project-type">{type}</p>
        <p className="project-description">{description}</p>
        <ul className="tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        {(repo || demo) && <div className="project-links">
          {repo && <ExternalLink href={repo} aria-label={name + ' on GitHub'}>View on GitHub <ArrowUpRight size={15} /></ExternalLink>}
          {demo && <ExternalLink href={demo}>Live demo <ArrowUpRight size={15} /></ExternalLink>}
        </div>}
      </div>
    </article>
  </Reveal>
}

function Projects() {
  return <section className="shell section projects" id="portfolio">
    <div className="section-heading"><h2>Selected Projects</h2></div>
    <div className="project-grid">
      {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
    </div>
  </section>
}

function About() {
  return <section className="section shell about" id="about">
    <Reveal className="about-layout">
      <div><h2 className="eyebrow">About Me</h2><p className="display about-display">Curious by nature.<br /><em>Practical by design.</em></p></div>
      <div className="about-copy">
        <p>I’m an Information Systems undergraduate at Sabaragamuwa University of Sri Lanka. I’m interested in software development, database management, and system analysis, especially how they come together to solve real problems.</p>
        <p>I bring UI/UX design into my development work, using wireframes and prototypes to explore how an interface should work before I build it.</p>
        <details id="services"><summary>Development & design services</summary>
          <dl className="services">{services.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl>
        </details>
      </div>
    </Reveal>
  </section>
}

function Practice() {
  return <div className="practice">
    <div className="shell practice-grid">
      <section className="skills section" id="skills">
        <Reveal>
          <h2 className="eyebrow">Education & Technical Skills</h2>
          <div className="education"><GraduationCap size={24} /><div><h3>BSc in Information Systems</h3><p>Sabaragamuwa University of Sri Lanka</p></div></div>
          <div className="skill-groups">{Object.entries(skills).map(([category, items]) => <div key={category}>
            <h3>{category}</h3><ul className="tags">{items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </div>)}</div>
        </Reveal>
      </section>
      <section className="process section" id="experience">
        <Reveal><h2 className="eyebrow">My Work Process</h2>
          <ol>{process.map(([Icon, title, detail]) => <li key={title}>
            <span className="process-icon"><Icon size={17} /></span><div><h3>{title}</h3><p>{detail}</p></div>
          </li>)}</ol>
        </Reveal>
      </section>
      <aside className="quote section" aria-label="Design quote">
        <Reveal>
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>Great design is not just how it looks, but how it works.</blockquote>
          <p className="signature">Gihan Dhanushka</p>
          <Sparkle size={24} strokeWidth={1} aria-hidden="true" />
        </Reveal>
      </aside>
    </div>
  </div>
}

function Laptop() {
  return <div className="laptop" aria-hidden="true">
    <div className="laptop-screen">
      <div className="laptop-page">
        <div className="mini-nav"><b>GD.</b><span>AVAILABLE FOR PROJECTS</span></div>
        <div className="mini-word">PORTFOLIO</div>
        <img src={portrait} alt="" loading="lazy" />
        <div className="mini-copy"><span>Hello, I’m</span><strong>GIHAN DHANUSHKA</strong><small>SOFTWARE DEVELOPER / UI/UX DESIGNER</small></div>
      </div>
    </div>
    <div className="laptop-base"><span /></div>
  </div>
}

function Contact() {
  const [draftOpened, setDraftOpened] = useState(false)

  function composeEmail(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(data.get('subject'))
    const body = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email'))
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body
    setDraftOpened(true)
  }

  return <footer id="contact" className="contact">
    <div className="shell section">
      <Reveal className="contact-layout">
        <div><h2 className="display">Let’s Work<br />Together<span>.</span></h2>
          <p>I’m always interested in exciting projects, creative collaborations, and new opportunities. Let’s build something amazing together.</p>
          <div className="hero-buttons flex flex-wrap">
            <a className="button primary" href={'mailto:' + email}>Contact me <ArrowUpRight size={15} /></a>
            <a className="button outline" href={cv} download>Download CV <ArrowDownToLine size={15} /></a>
          </div>
        </div>
        <address>
          {[contactLinks[2], ...contactLinks.slice(0, 2)].map(({ name, detail, url, icon: Icon }) =>
            <ExternalLink key={name} href={url}><span><Icon size={17} /></span><div><small>{name}</small>{detail}</div></ExternalLink>)}
          <div><span><MapPin size={17} /></span><div><small>Location</small>Sri Lanka</div></div>
        </address>
        <Laptop />
      </Reveal>
      <details className="contact-details">
        <summary>Write a message</summary>
        <form onSubmit={composeEmail} className="contact-form">
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Email<input type="email" name="email" autoComplete="email" required /></label>
          <label>Subject<input name="subject" required /></label>
          <label>Message<textarea name="message" rows="4" required /></label>
          <button type="submit" className="button primary">Open email draft <ArrowUpRight size={15} /></button>
          {draftOpened && <p role="status">Send the draft from your email app when it opens.</p>}
        </form>
      </details>
      <div className="footer-bar"><span>© {new Date().getFullYear()} Gihan Dhanushka</span><a href="#hero">Back to top <ArrowUp size={16} /></a></div>
    </div>
  </footer>
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark')
  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem('selectedColor')
    return Object.hasOwn(palettes, saved) ? saved : 'red'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.palette = palette
    localStorage.setItem('portfolio-theme', theme)
    localStorage.setItem('selectedColor', palette)
  }, [theme, palette])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar theme={theme} setTheme={setTheme} palette={palette} setPalette={setPalette} />
    <main id="main"><Hero /><Projects /><About /><Practice /></main>
    <Contact />
  </>
}
