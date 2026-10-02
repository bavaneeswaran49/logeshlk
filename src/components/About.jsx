import Reveal from '../motion/Reveal'
import { imageReveal } from '../motion/variants'
import Icon from './Icon'

export default function About() {
  return <section id="about" className="about-section section container" aria-labelledby="about-title">
    <Reveal className="about-label"><span className="eyebrow">01 / THE IDEA</span><span className="about-location">SRI BUILDERS<br />TIRUPPUR, TAMIL NADU</span></Reveal>
    <Reveal className="about-copy"><h2 id="about-title">A home should<br />feel <em>personal.</em></h2><p>We approach every villa as a reflection of the people who live in it — balancing architecture, functionality and the quiet beauty of detail.</p><p>From the way morning light enters a room to the spaces where your family comes together, your life is our starting point.</p><a className="text-link" href="#process">The way we work <Icon /></a></Reveal>
    <Reveal className="about-visual" variants={imageReveal}><img src="/images/villa-interior.jpg" alt="Design inspiration: a sunlit villa living room opening to a lush garden" loading="lazy" width="1672" height="941" /><div className="image-caption"><span>LIGHT. SPACE. A SENSE OF BELONGING.</span><span>DESIGN INSPIRATION ↗</span></div></Reveal>
    <Reveal className="about-aside"><span className="about-detail-number">01.</span><p>Considered spaces.<br />Honest materials.<br />Everyday moments.</p><span className="fine-line" /></Reveal>
  </section>
}
