import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import './Navbar.css'

const links = [['About us', 'about'], ['Villa collection', 'villas'], ['Our expertise', 'services'], ['Our process', 'process']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
    }
    const closeOnResize = () => { if (window.innerWidth > 900) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnResize)
    return () => { document.removeEventListener('keydown', closeOnEscape); window.removeEventListener('resize', closeOnResize) }
  }, [open])
  return <header className="site-header">
    <div className="announcement"><div className="container announcement-inner"><span>BUILT AROUND YOU. ROOTED IN TIRUPUR.Service all Around Tamil Nadu</span><span className="announcement-location">Tirupur, Tamil Nadu <span aria-hidden="true">↗</span></span></div></div>
    <nav className="navbar container" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="Sri Builders and Developers home" onClick={() => setOpen(false)}><img src={logo} alt="" width="66" height="66" /><span className="brand-type">SRI BUILDERS<span>AND DEVELOPERS</span></span></a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}><span /><span /></button>
      <div id="primary-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s build your home <span aria-hidden="true">↗</span></a>
      </div>
    </nav>
  </header>
}
