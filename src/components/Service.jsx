import useLanguage from '../i18n/useLanguage'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { fadeUp, stagger, viewport } from '../motion/variants'
import Icon from './Icon'

const services = [
  ['Architecture & planning', 'Planning and architectural direction shaped around your site, purpose and everyday needs.', 'DESIGN'],
  ['Building construction', 'Construction for homes, commercial spaces and other building projects, with care from structure to finish.', 'BUILD'],
  ['Interiors & finishes', 'Interior coordination and finishing direction, connecting materials, textures and spaces.', 'DETAIL'],
  ['Concept to completion', 'A coordinated journey from the initial idea to the final walkthrough of your completed project.', 'COORDINATE'],
]
export default function Service() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  return <section id="services" className="services-section section" aria-labelledby="services-title"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow">{t("02 / WHAT WE DO")}</span><h2 id="services-title">{t("From a possibility")}<br /><em>{t("to a complete home.")}</em></h2></div><p>{t("We take on all types of construction, with family homes at the heart of what we do. Planning, building and finishes come together around your project.")}</p></Reveal>
    <Motion.div className="service-list" variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{services.map(([title, copy, label], index) => <Motion.article variants={fadeUp} className="service-row" key={title}><span className="service-number">0{index + 1}</span><div><span className="eyebrow">{t(label)}</span><h3>{t(title)}</h3></div><p>{t(copy)}</p></Motion.article>)}</Motion.div>
    <div className="section-next"><p>{t("How does it all come together?")}</p><a href="#process" className="text-link">{t("See the building process")} <Icon /></a></div>
  </div></section>
}
