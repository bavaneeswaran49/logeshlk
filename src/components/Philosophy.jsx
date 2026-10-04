import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function Philosophy() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  return <section ref={sectionRef} className="vision-banner" aria-labelledby="vision-title">
    <Motion.img style={reduced ? undefined : { y }} src="/images/villa-courtyard.jpg" alt="Design inspiration: sunlight across a shaded home courtyard" loading="lazy" width="1672" height="941" />
    <div className="vision-overlay" />
    <div className="container"><Reveal><span className="eyebrow">06 / OUR DESIGN PHILOSOPHY</span><h2 id="vision-title">Luxury is a home<br />that feels <em>like you.</em></h2><p>Light that moves through the day. Materials that age gracefully.<br />Spaces that make room for the things that matter.</p><a className="text-link" href="#contact">Let’s imagine your home <Icon /></a></Reveal></div>
    <div className="vision-bottom container"><span>LIGHT / MATERIAL / PROPORTION</span><span>DESIGN INSPIRATION</span></div>
  </section>
}
