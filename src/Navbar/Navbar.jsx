import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { menuReveal } from '../motion/variants'
import Icon from '../components/Icon'
import Brand from '../components/Brand'
import './Navbar.css'

const links = [['Villas', 'villas'], ['Services', 'services'], ['Process', 'process'], ['About', 'about'], ['FAQ', 'faq']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    let frame = 0
    const updatePosition = () => {
      setScrolled(window.scrollY > 48)
      const sections = ['home', ...links.map(([, id]) => id), 'contact']
      const current = sections.filter(id => document.getElementById(id)?.getBoundingClientRect().top <= 150).at(-1)
      setActiveSection(current || 'home')
      frame = 0
    }
    const handleScroll = () => { if (!frame) frame = requestAnimationFrame(updatePosition) }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a')?.focus()
    const handleKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
      if (event.key === 'Tab') {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
        const first = items[0], last = items.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const handleResize = () => { if (window.innerWidth > 900) setOpen(false) }
    document.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])
  const closeMenu = () => setOpen(false)
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
    <nav className="navbar container" aria-label="Main navigation">
      <Brand onClick={closeMenu} />
      <div className="desktop-links">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}</div>
      <a href="#contact" className="nav-contact desktop-contact" aria-current={activeSection === 'contact' ? 'location' : undefined}>Discuss your home <Icon /></a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(value => !value)}><span /><span /></button>
    </nav>
    <div id="mobile-navigation"><AnimatePresence>{open && <Motion.nav ref={menuRef} className="mobile-navigation" aria-label="Mobile navigation" variants={menuReveal} initial={reduced ? false : 'hidden'} animate="visible" exit="exit">
      <span className="eyebrow">EXPLORE YOUR NEXT HOME</span>{links.map(([label, id], index) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={closeMenu}><span>0{index + 1}</span>{label}<Icon /></a>)}
      <a href="#contact" className="button button-dark" onClick={closeMenu}>Discuss your home <Icon /></a><p>Tiruppur, Tamil Nadu</p>
    </Motion.nav>}</AnimatePresence></div>
  </header>
}
