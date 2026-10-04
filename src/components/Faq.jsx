import useLanguage from '../i18n/useLanguage'
import { useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import Reveal from '../motion/Reveal'
import { transitions } from '../motion/transitions'

const questions = [
  ['What types of construction do you undertake?', 'We undertake all types of construction, including homes and commercial buildings. Our main focus is creating homes around the way families live. Share your project idea so we can discuss the scope.'],
  ['Can you build a house on my own plot?', 'Start by sharing your plot location and the kind of home you have in mind. We can discuss a design and construction scope suited to your property.'],
  ['Can I customise the home styles shown here?', 'The collection is design inspiration, rather than a fixed catalogue. Your layout, size, materials and finishes are discussed around your plot, preferences and budget.'],
  ['How do I get a cost estimate?', 'Share your plot details, approximate built-up area and expectations for finishes. A useful estimate starts with a clear scope; pricing is discussed for your individual project.'],
  ['How long will my project take to build?', 'The programme depends on the design, approvals, project size and agreed scope. We discuss an expected schedule during consultation rather than promise the same timeline for every project.'],
  ['Where do we begin?', 'A conversation is all it takes to start. Use the enquiry form below or call us to discuss your ideas, plot and priorities.'],
]

export default function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return <section id="faq" className="faq-section section container" aria-labelledby="faq-title">
    <Reveal>
      <span className="eyebrow">{t("05 / YOUR QUESTIONS")}</span>
      <h2 id="faq-title">{t("Before")}<br /><em>{t("we begin.")}</em></h2>
      <p>{t("Good questions.")}<br />{t("Thoughtful conversations.")}</p>
      <a className="text-link" href="#contact">{t("Ask us something")} <span aria-hidden="true">↗</span></a>
    </Reveal>
    <Reveal className="faq-list">
      {questions.map(([question, answer], index) => <div className="faq-item" key={question}>
        <h3>
          <button id={`faq-question-${index}`} type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>
            <span className="faq-number">0{index + 1}</span>{t(question)}
            <span className="faq-symbol" aria-hidden="true">{open === index ? '−' : '+'}</span>
          </button>
        </h3>
        <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={open !== index}>
          <AnimatePresence initial={false}>
            {open === index && <Motion.div initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={transitions.ui}><p>{t(answer)}</p></Motion.div>}
          </AnimatePresence>
        </div>
      </div>)}
    </Reveal>
  </section>
}
