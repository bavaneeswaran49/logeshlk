import useLanguage from '../i18n/useLanguage'
import { useEffect, useRef, useState } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { villas } from '../siteContent'
import { cardHover, modalReveal, viewport } from '../motion/variants'
import { transitions } from '../motion/transitions'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function VillaCollection({ onEnquire }) {
  const { t } = useLanguage()
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
    <Reveal className="section-heading"><div><span className="eyebrow">{t("01 / FIND YOUR STYLE")}</span><h2 id="villa-title">{t("A place to start.")}<br /><em>{t("A home to make yours.")}</em></h2></div><p>{t("Explore three design directions. Find what feels like you, then tailor the layout, materials and finishes around your plot.")}</p></Reveal>
    <div className="villa-grid">{villas.map(villa => <Motion.article className="villa-card" key={villa.id} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={transitions.reveal} whileHover="hover" animate="rest">
      <button type="button" className="villa-image-button" onClick={event => explore(villa, event)} aria-label={`${t('Explore')} ${t(villa.title)}`}>
        <Motion.img variants={reduced ? undefined : cardHover} src={villa.image} alt={t(villa.alt)} loading="lazy" width="1672" height="941" />
        <span className="concept-tag">{t("DESIGN DIRECTION / 0")}{villas.indexOf(villa) + 1}</span>
        <Motion.span className="image-arrow" variants={reduced ? undefined : { rest: { x: 0 }, hover: { x: 3, transition: transitions.micro } }}><Icon /></Motion.span>
      </button>
      <Motion.div className="villa-card-copy" variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -3, transition: transitions.ui } }}><span className="eyebrow">{t(villa.style)} {t("/ home design")}</span><h3>{t(villa.title)}</h3><p>{t(villa.subtitle)}</p><button className="villa-detail-link" type="button" onClick={event => explore(villa, event)} aria-label={`${t('Explore')} ${t(villa.title)} ${t('details')}`}>{t("Explore this style")} <Icon /></button></Motion.div>
    </Motion.article>)}</div>
    <p className="collection-note"><span aria-hidden="true">↳</span> {t("Architectural concepts for inspiration. These images do not represent completed Sri Builders projects.")}</p>
    <div className="section-next"><p>{t("Every style starts with the right plan.")}</p><a className="text-link" href="#services">{t("Explore our services")} <Icon /></a></div>
    <dialog ref={dialogRef} className="villa-dialog" aria-labelledby="villa-dialog-title" onCancel={event => { event.preventDefault(); close() }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) close() }}>
      {selected && <Motion.div className="dialog-content" variants={modalReveal} initial={reduced ? false : 'hidden'} animate="visible"><button className="dialog-close" type="button" aria-label={t("Close home design details")} onClick={close} autoFocus><Icon name="close" /></button><img src={selected.image} alt={t(selected.alt)} width="1672" height="941" /><div className="dialog-copy"><span className="eyebrow">{t("DESIGN INSPIRATION / CUSTOM TO YOUR PLOT")}</span><h2 id="villa-dialog-title">{t(selected.title)}</h2><p>{t(selected.description)}</p><ul>{selected.features.map(feature => <li key={feature}><Icon name="check" />{t(feature)}</li>)}</ul><p className="villa-vision">{t(selected.vision)}</p><a className="button button-dark" href="#contact" onClick={() => { onEnquire(selected.style); close(); requestAnimationFrame(() => document.querySelector('#contact input')?.focus({ preventScroll: true })) }}>{t("Discuss this direction")} <Icon /></a><small>{t("Layout, finishes and cost are tailored during consultation.")}</small></div></Motion.div>}
    </dialog>
  </div></section>
}
