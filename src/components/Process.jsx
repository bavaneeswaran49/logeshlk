import { motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { fadeUp, lineReveal, stagger, viewport } from '../motion/variants'
import Icon from './Icon'

const steps = [
  ['Listen', 'Your ideas, your family, your everyday life. We begin with a conversation about the home you want to create.'],
  ['Design', 'Your plot, layout and architectural direction. We define the details and scope together.'],
  ['Build', 'Your approved vision takes shape, with materials, construction stages and finishes agreed for your home.'],
  ['Welcome home', 'The final details come together. A walkthrough of your completed home before handover.'],
]
export default function Process() {
  const reduced = useReducedMotion()
  return <section id="process" className="process-section section container" aria-labelledby="process-title">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / HOW IT WORKS</span><h2 id="process-title">A clear journey.<br /><em>From idea to address.</em></h2></div><p>You don’t need all the answers to begin. We start with your ideas and work through the next steps together.</p></Reveal>
    <Motion.div className="process-grid" variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{steps.map(([title, copy], index) => <Motion.article variants={fadeUp} key={title}><div className="process-number">0{index + 1}<Motion.span variants={lineReveal} /></div><h3>{title}</h3><p>{copy}</p></Motion.article>)}</Motion.div>
    <div className="section-next"><p>Meet the people behind the approach.</p><a className="text-link" href="#about">About Sri Builders <Icon /></a></div>
  </section>
}
