import useLanguage from '../i18n/useLanguage'
import Reveal from '../motion/Reveal'
import { imageReveal } from '../motion/variants'
import Icon from './Icon'

export default function About() {
  const { t } = useLanguage()
  return <section id="about" className="about-section section container" aria-labelledby="about-title">
    <Reveal className="about-label"><span className="eyebrow">{t("04 / ABOUT SRI BUILDERS")}</span><span className="about-location">{t("SRI BUILDERS")}<br />{t("TIRUPPUR, TAMIL NADU")}</span></Reveal>
    <Reveal className="about-copy"><h2 id="about-title">{t("Your home.")}<br /><em>{t("Our full attention.")}</em></h2><p>{t("Based in Tiruppur, Sri Builders and Developers takes on all types of construction, with a special focus on building homes for families. We bring planning, construction and finishing together around your project.")}</p><p>{t("We start with your land and the way your family lives. Thoughtful layouts, considered materials and care in execution carry that idea through to the finished spaces.")}</p><ul className="about-principles"><li><Icon name="check" />{t("Design shaped around your plot")}</li><li><Icon name="check" />{t("Care from foundation to finish")}</li><li><Icon name="check" />{t("One coordinated journey")}</li></ul><a className="text-link" href="#faq">{t("Questions before you begin?")} <Icon /></a></Reveal>
    <Reveal className="about-visual" variants={imageReveal}><img src="/images/villa-interior.jpg" alt={t("Design inspiration: a sunlit family living room opening to a lush garden")} loading="lazy" width="1672" height="941" /><div className="image-caption"><span>{t("LIGHT. SPACE. A SENSE OF BELONGING.")}</span><span>{t("DESIGN INSPIRATION ↗")}</span></div></Reveal>
  </section>
}
