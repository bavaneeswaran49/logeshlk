import { motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { fadeUp, lineReveal, stagger, viewport } from '../motion/variants'

const steps = [
  ['Listen', 'Your ideas, your family, your everyday life. We begin with a conversation about the home you want to create.'],
  ['Design', 'Your plot, layout and architectural direction. We define the details and scope together.'],
  ['Build', 'Your approved vision takes shape, with materials, construction stages and finishes agreed for your home.'],
  ['Welcome home', 'The final details come together. A walkthrough of your completed home before handover.'],
]
export default function Process() {
  const reduced = useReducedMotion()
  return <section id="process" className="process-section section container" aria-labelledby="process-title">
    <Reveal className="section-heading"><div><span className="eyebrow">05 / FROM IDEA TO ADDRESS</span><h2 id="process-title">A clear journey.<br /><em>A personal destination.</em></h2></div><p>From the first conversation to the first step inside. Here’s how we approach your home.</p></Reveal>
    <Motion.div className="process-grid" variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{steps.map(([title, copy], index) => <Motion.article variants={fadeUp} key={title}><div className="process-number">0{index + 1}<Motion.span variants={lineReveal} /></div><h3>{title}</h3><p>{copy}</p></Motion.article>)}</Motion.div>
  </section>
}
