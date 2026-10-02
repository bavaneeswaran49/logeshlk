import { motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { fadeUp, stagger, viewport } from '../motion/variants'
import Icon from './Icon'

const services = [
  ['Architecture & planning', 'Planning and architectural direction for a villa shaped around your plot and the way you live.', 'DESIGN'],
  ['Villa construction', 'Structural and finishing execution, with attention to the details that bring your approved design to life.', 'BUILD'],
  ['Interiors & finishes', 'Interior coordination and finishing direction, connecting materials, textures and spaces.', 'DETAIL'],
  ['Concept to completion', 'A coordinated journey from the initial idea to the final walkthrough of your home.', 'COORDINATE'],
]
export default function Service() {
  const reduced = useReducedMotion()
  return <section id="services" className="services-section section" aria-labelledby="services-title"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow">04 / WHAT WE DO</span><h2 id="services-title">One home.<br /><em>A complete perspective.</em></h2></div><a href="#contact" className="text-link">Discuss your requirements <Icon /></a></Reveal>
    <Motion.div className="service-list" variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{services.map(([title, copy, label], index) => <Motion.a variants={fadeUp} className="service-row" href="#contact" key={title}><span className="service-number">0{index + 1}</span><div><span className="eyebrow">{label}</span><h3>{title}</h3></div><p>{copy}</p><Icon /></Motion.a>)}</Motion.div>
  </div></section>
}
