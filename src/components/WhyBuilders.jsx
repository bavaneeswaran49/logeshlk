import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { transitions } from '../motion/transitions'

const principles = [
  { title: 'Thoughtful design', copy: 'Architecture that responds to your land, your lifestyle and your aspirations.', image: '/images/villa-courtyard.jpg', alt: 'Courtyard design concept with shaded spaces and tropical planting', detail: 'Spaces with a sense of place.' },
  { title: 'Precise execution', copy: 'A considered approach to structure, materials and every stage of construction.', image: '/images/villa-hero.jpg', alt: 'Contemporary villa design concept showing carefully aligned stone and timber details', detail: 'Care, from foundation to finish.' },
  { title: 'A complete experience', copy: 'From the first idea to the finished home, a journey that stays clear and personal.', image: '/images/villa-interior.jpg', alt: 'Finished interior design concept with warm natural materials', detail: 'One vision. Every detail.' },
]
export default function WhyBuilders() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  return <section className="why-section section" aria-labelledby="why-title"><div className="container">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / THE SRI BUILDERS APPROACH</span><h2 id="why-title">Considered by design.<br /><em>Crafted with care.</em></h2></div><p>The difference lives in the decisions.<br />The large ones. And the little ones.</p></Reveal>
    <div className="why-grid"><div className="why-visual"><div className="why-image-frame"><AnimatePresence initial={false}><Motion.img key={active} src={principles[active].image} alt={principles[active].alt} loading="lazy" width="1672" height="941" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transitions.ui} /></AnimatePresence></div><div className="why-caption"><span>0{active + 1} / 03</span><span>{principles[active].detail}</span></div></div>
      <div className="principle-list">{principles.map((item, index) => <Motion.article key={item.title} className={`principle ${active === index ? 'active' : ''}`} onViewportEnter={() => setActive(index)} viewport={{ amount: 0.8, margin: '-20% 0px -20% 0px' }}><button type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span className="principle-number">0{index + 1}</span><span><span className="principle-title">{item.title}</span><span className="principle-copy">{item.copy}</span></span><span className="principle-arrow" aria-hidden="true">↗</span></button></Motion.article>)}</div>
    </div>
  </div></section>
}
