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
        <Motion.p variants={fadeUp}>Custom villa design and construction in Tiruppur.<br />From your first idea to a home that feels like you.</Motion.p>
        <Motion.div variants={fadeUp} className="hero-actions"><a className="button button-light" href="#villas">Explore villa styles <Icon /></a><a className="hero-explore" href="#contact">Discuss your home <span aria-hidden="true">↗</span></a></Motion.div>
      </Motion.div>
      <div className="hero-bottom container"><a href="#villas"><Motion.span className="scroll-line" aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ ...transitions.cinematic, delay: 0.8 }} />FIND YOUR INSPIRATION</a><span>ARCHITECTURAL CONCEPT · A HOME, DISTINCTLY YOURS</span></div>
      <span className="hero-side-note" aria-hidden="true">DESIGNED WITH PURPOSE. BUILT WITH CARE.</span>
    </section>
    <nav className="journey-strip" aria-label="Plan your home"><div className="container journey-inner">
      <a href="#villas"><span className="journey-number">01</span><span>Find your style<small>Explore the possibilities</small></span><Icon /></a>
      <a href="#process"><span className="journey-number">02</span><span>Understand the journey<small>See how your home takes shape</small></span><Icon /></a>
      <a href="#contact"><span className="journey-number">03</span><span>Talk about your home<small>Share your idea with us</small></span><Icon /></a>
    </div></nav>
  </>
}
