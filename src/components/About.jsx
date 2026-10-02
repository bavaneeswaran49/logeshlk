import Reveal from '../motion/Reveal'
import { imageReveal } from '../motion/variants'
import Icon from './Icon'

export default function About() {
  return <section id="about" className="about-section section container" aria-labelledby="about-title">
    <Reveal className="about-label"><span className="eyebrow">04 / ABOUT SRI BUILDERS</span><span className="about-location">SRI BUILDERS<br />TIRUPPUR, TAMIL NADU</span></Reveal>
    <Reveal className="about-copy"><h2 id="about-title">Your home.<br /><em>Our full attention.</em></h2><p>Based in Tiruppur, Sri Builders and Developers brings architectural planning, villa construction and finishing direction together around your home.</p><p>We start with your land and the way your family lives. Thoughtful layouts, considered materials and care in execution carry that idea through to the finished spaces.</p><ul className="about-principles"><li><Icon name="check" />Design shaped around your plot</li><li><Icon name="check" />Care from foundation to finish</li><li><Icon name="check" />One coordinated journey</li></ul><a className="text-link" href="#faq">Questions before you begin? <Icon /></a></Reveal>
    <Reveal className="about-visual" variants={imageReveal}><img src="/images/villa-interior.jpg" alt="Design inspiration: a sunlit villa living room opening to a lush garden" loading="lazy" width="1672" height="941" /><div className="image-caption"><span>LIGHT. SPACE. A SENSE OF BELONGING.</span><span>DESIGN INSPIRATION ↗</span></div></Reveal>
  </section>
}
