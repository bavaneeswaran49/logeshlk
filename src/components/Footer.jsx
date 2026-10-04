import useLanguage from '../i18n/useLanguage'
import Brand from './Brand'
import { business, whatsappUrl } from '../siteContent'
import Icon from './Icon'
const discoverLinks = [['Home styles', 'villas'], ['Our services', 'services'], ['Our process', 'process'], ['About Sri Builders', 'about'], ['Your questions', 'faq'], ['Careers', 'careers']]
export default function Footer() {
  const { t } = useLanguage()
  return <footer className="site-footer"><div className="container"><div className="footer-top"><Brand /><p>{t("All types of construction.")}<br />{t("Family homes at heart. Rooted in Tiruppur.")}</p><a className="footer-back" href="#home">{t("BACK TO TOP")} <span aria-hidden="true">↑</span></a></div><div className="footer-grid"><div><span className="eyebrow">{t("A HOME, DISTINCTLY YOURS.")}</span><h3>{t("Your vision.")}<br /><em>{t("Our craft.")}</em></h3></div><div><h4>{t("Discover")}</h4>{discoverLinks.map(([label, id]) => <a key={id} href={`#${id}`}>{t(label)}</a>)}</div><div><h4>{t("Start a conversation")}</h4><a href={`tel:${business.telephone}`}>{business.phone}</a><a href={whatsappUrl(t('Hello Sri Builders, I would like to discuss a construction project in Tiruppur.'))} target="_blank" rel="noopener noreferrer">{t("WhatsApp")} <Icon /></a><a href="#contact">{t("Plan your project")} <Icon /></a></div><div><h4>{t("Find us")}</h4><p>{t("Tiruppur, Tamil Nadu")}<br />{t("India")}</p><a href="https://www.google.com/maps/search/?api=1&query=Tiruppur%2C%20Tamil%20Nadu" target="_blank" rel="noopener noreferrer">{t("Explore Tiruppur")} <Icon /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {t("Sri Builders and Developers. All rights reserved.")}</span><span>{t("CRAFTED AROUND THE WAY YOU LIVE.")}</span></div></div></footer>
}
