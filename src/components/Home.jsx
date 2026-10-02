import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '../motion/variants'
import { transitions } from '../motion/transitions'
import Icon from './Icon'

export default function Home() {
  const heroRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  return <>
    <section ref={heroRef} id="home" className="hero" aria-labelledby="hero-title">
      <Motion.div className="hero-image-wrap" style={reduced ? undefined : { y }}>
        <Motion.img className="hero-image" src="/images/villa-hero.jpg" alt="Design inspiration: a contemporary stone and timber villa at dusk" width="1672" height="940" fetchPriority="high" initial={reduced ? false : { scale: 1.07 }} animate={{ scale: 1 }} transition={transitions.cinematic} />
      </Motion.div>
      <Motion.div className="hero-shade" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={transitions.cinematic} />
      <Motion.div className="hero-content container" variants={stagger} initial={reduced ? false : 'hidden'} animate="visible">
        <Motion.span variants={fadeUp} className="hero-eyebrow"><span /> PREMIUM VILLA CONSTRUCTION · TIRUPPUR</Motion.span>
        <h1 id="hero-title"><Motion.span variants={fadeUp}>Villas, crafted</Motion.span><Motion.span variants={fadeUp}>around <em>your life.</em></Motion.span></h1>
        <Motion.p variants={fadeUp}>Thoughtful design. Precise construction.<br />Homes made for the way you live.</Motion.p>
        <Motion.div variants={fadeUp} className="hero-actions"><a className="button button-light" href="#contact">Start your villa <Icon /></a><a className="hero-explore" href="#villas">Explore villa styles <span aria-hidden="true">↗</span></a></Motion.div>
      </Motion.div>
      <div className="hero-bottom container"><a href="#about"><Motion.span className="scroll-line" aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ ...transitions.cinematic, delay: 0.8 }} />SCROLL TO DISCOVER</a><span>ARCHITECTURAL CONCEPT · A HOME, DISTINCTLY YOURS</span></div>
      <span className="hero-side-note" aria-hidden="true">DESIGNED WITH PURPOSE. BUILT WITH CARE.</span>
    </section>
    <div className="values-strip"><div className="container values-inner"><span><span className="value-mark">01 /</span> Personal by design</span><span><span className="value-mark">02 /</span> Precise in every detail</span><span><span className="value-mark">03 /</span> Rooted in Tiruppur</span></div></div>
  </>
}
