import { motion as Motion, useReducedMotion } from 'framer-motion'
import { fadeUp, viewport } from './variants'
export default function Reveal({ children, className = '', variants = fadeUp }) {
  const reduced = useReducedMotion()
  return <Motion.div className={className} variants={variants} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={viewport}>{children}</Motion.div>
}
