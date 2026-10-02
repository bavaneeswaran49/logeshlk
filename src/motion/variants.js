import { transitions } from './transitions'
export const viewport = { once: true, amount: 0.2 }
export const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: transitions.reveal } }
export const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } }
export const imageReveal = { hidden: { opacity: 0, scale: 1.035 }, visible: { opacity: 1, scale: 1, transition: transitions.reveal } }
export const lineReveal = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: transitions.reveal } }
export const menuReveal = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: transitions.ui },
  exit: { opacity: 0, y: -8, transition: transitions.micro },
}
export const modalReveal = { hidden: { opacity: 0, y: 12, scale: 0.985 }, visible: { opacity: 1, y: 0, scale: 1, transition: transitions.ui } }
export const cardHover = { rest: { scale: 1 }, hover: { scale: 1.04, transition: transitions.reveal } }
