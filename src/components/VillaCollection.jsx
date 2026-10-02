import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { villas } from '../siteContent'
import { cardHover, modalReveal, viewport } from '../motion/variants'
import { transitions } from '../motion/transitions'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function VillaCollection({ onEnquire }) {
  const [filter, setFilter] = useState('All styles')
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const dialog = dialogRef.current
    if (!selected) { if (dialog.open) dialog.close(); return }
    if (!dialog.open) dialog.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])
  function explore(villa, event) {
    triggerRef.current = event.currentTarget
    setSelected(villa)
  }
  function close() {
    setSelected(null)
    triggerRef.current?.focus()
  }
  return <section id="villas" className="villa-section section" aria-labelledby="villa-title"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow">02 / VILLA STYLES</span><h2 id="villa-title">Different expressions.<br /><em>Distinctly yours.</em></h2></div><p>A little inspiration for a home of your own. Every direction is tailored to your plot, your priorities and your way of living.</p></Reveal>
    <div className="collection-toolbar"><div className="collection-filters" role="group" aria-label="Filter villa styles">{['All styles', 'Contemporary', 'Courtyard', 'Classic'].map(style => <button key={style} type="button" aria-pressed={filter === style} className={filter === style ? 'selected' : ''} onClick={() => setFilter(style)}>{style}</button>)}</div><span>DESIGN INSPIRATION / CUSTOM BUILT</span></div>
    <div className="villa-grid" aria-live="polite">{villas.filter(villa => filter === 'All styles' || villa.style === filter).map(villa => <Motion.article className="villa-card" key={villa.id} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={transitions.reveal} whileHover="hover" animate="rest">
      <button type="button" className="villa-image-button" onClick={event => explore(villa, event)} aria-label={`Explore ${villa.title}`}>
        <Motion.img variants={reduced ? undefined : cardHover} src={villa.image} alt={villa.alt} loading="lazy" width="1672" height="941" />
        <span className="concept-tag">DESIGN DIRECTION / 0{villas.indexOf(villa) + 1}</span>
        <Motion.span className="image-arrow" variants={reduced ? undefined : { rest: { x: 0 }, hover: { x: 3, transition: transitions.micro } }}><Icon /></Motion.span>
      </button>
      <Motion.div className="villa-card-copy" variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -3, transition: transitions.ui } }}><span className="eyebrow">{villa.style} / villa design</span><h3>{villa.title}</h3><div><p>{villa.subtitle}</p><button type="button" onClick={event => explore(villa, event)} aria-label={`View details of ${villa.title}`}><Icon /></button></div></Motion.div>
    </Motion.article>)}</div>
    <p className="collection-note"><span aria-hidden="true">↳</span> Architectural concepts for inspiration. These images do not represent completed Sri Builders projects.</p>
    <dialog ref={dialogRef} className="villa-dialog" aria-labelledby="villa-dialog-title" onCancel={event => { event.preventDefault(); close() }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) close() }}>
      {selected && <Motion.div className="dialog-content" variants={modalReveal} initial={reduced ? false : 'hidden'} animate="visible"><button className="dialog-close" type="button" aria-label="Close villa details" onClick={close} autoFocus><Icon name="close" /></button><img src={selected.image} alt={selected.alt} width="1672" height="941" /><div className="dialog-copy"><span className="eyebrow">DESIGN INSPIRATION / CUSTOM TO YOUR PLOT</span><h2 id="villa-dialog-title">{selected.title}</h2><p>{selected.description}</p><ul>{selected.features.map(feature => <li key={feature}><Icon name="check" />{feature}</li>)}</ul><p className="villa-vision">{selected.vision}</p><a className="button button-dark" href="#contact" onClick={() => { onEnquire(selected.style); close(); requestAnimationFrame(() => document.querySelector('#contact input')?.focus({ preventScroll: true })) }}>Discuss this direction <Icon /></a><small>Layout, finishes and cost are tailored during consultation.</small></div></Motion.div>}
    </dialog>
  </div></section>
}
