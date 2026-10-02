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
    <Reveal className="section-heading"><div><span className="eyebrow">02 / WHAT WE DO</span><h2 id="services-title">From a possibility<br /><em>to a complete home.</em></h2></div><p>Planning, construction and finishes, brought together around the scope your home needs.</p></Reveal>
    <Motion.div className="service-list" variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{services.map(([title, copy, label], index) => <Motion.article variants={fadeUp} className="service-row" key={title}><span className="service-number">0{index + 1}</span><div><span className="eyebrow">{label}</span><h3>{title}</h3></div><p>{copy}</p></Motion.article>)}</Motion.div>
    <div className="section-next"><p>How does it all come together?</p><a href="#process" className="text-link">See the building process <Icon /></a></div>
  </div></section>
}
