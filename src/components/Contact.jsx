import useLanguage from '../i18n/useLanguage'
import { useState } from 'react'
import { business, whatsappUrl } from '../siteContent'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function Contact({ preferredStyle, onStyleChange }) {
  const { t } = useLanguage()
  const [messageLink, setMessageLink] = useState('')
  const [error, setError] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const name = String(fields.get('name')).trim()
    const phone = String(fields.get('phone')).trim()
    const digits = phone.replace(/\D/g, '')
    if (!name || !/^\+?[\d\s()-]{10,18}$/.test(phone) || digits.length < 10 || digits.length > 15) {
      setError('Please enter your name and a valid phone number.')
      return
    }
    const message = `${t('Hello Sri Builders, I would like to discuss a construction project.')}\n\n${t('Name')}: ${name}\n${t('Phone')}: ${phone}\n${t('Location')}: ${String(fields.get('location')).trim() || t('To be discussed')}\n${t('Project type')}: ${t(fields.get('projectType'))}\n${t('Plot')}: ${t(fields.get('plot'))}\n${t('Preferred style')}: ${t(fields.get('style'))}\n${t('My vision')}: ${String(fields.get('vision')).trim() || t('I would love to explore the possibilities.')}`
    const link = whatsappUrl(message)
    setError('')
    setMessageLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }
  return <section id="contact" className="contact-section section" aria-labelledby="contact-title">
    <div className="container contact-grid">
      <Reveal className="contact-copy">
        <span className="eyebrow">{t("06 / LET’S BEGIN")}</span>
        <h2 id="contact-title">{t("Let’s build")}<br /><em>{t("something personal.")}</em></h2>
        <p>{t("A family home, a commercial space, or another building project.")}<br />{t("We’d love to hear where you want to begin.")}</p>
        <a className="contact-phone" href={`tel:${business.telephone}`}><Icon name="phone" /><span><small>{t("LET’S TALK")}</small>{business.phone}</span><Icon /></a>
        <div className="contact-location"><Icon name="pin" /><span>{t("Based in Tiruppur.")}<br /><small>{t("Building homes with a sense of place.")}</small></span></div>
        <a className="text-link" href={whatsappUrl(t('Hello Sri Builders, I would like to discuss a construction project in Tiruppur.'))} target="_blank" rel="noopener noreferrer">{t("Start a conversation on WhatsApp")} <Icon /></a>
      </Reveal>
      <form className="enquiry-form" onSubmit={handleSubmit} onChange={() => { setMessageLink(''); setError('') }} aria-labelledby="enquiry-title">
        <h3 id="enquiry-title">{t("Tell us about your project")}</h3>
        <p>{t("Start with your name and number. Share more if you’re ready.")}</p>
        <div className="form-grid">
          <label>{t("Your name")} <span>*</span><input name="name" required autoComplete="name" maxLength="80" placeholder={t("Full name")} aria-invalid={error ? true : undefined} aria-describedby={error ? 'enquiry-error' : undefined} /></label>
          <label>{t("Phone number")} <span>*</span><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength="18" pattern="[+0-9 \(\)\-]{10,18}" placeholder={t("Your contact number")} aria-invalid={error ? true : undefined} aria-describedby={error ? 'enquiry-error' : undefined} /></label>
          <label>{t("Project location")}<input name="location" autoComplete="address-level2" maxLength="100" placeholder={t("Tiruppur or nearby")} /></label>
          <label>{t("Do you have a plot?")}<select name="plot" defaultValue="I own a plot"><option value="I own a plot">{t("I own a plot")}</option><option value="I’m looking for a plot">{t("I’m looking for a plot")}</option><option value="I’d like guidance">{t("I’d like guidance")}</option><option value="Not applicable">{t("Not applicable")}</option></select></label>
        </div>
        <label>{t("Project type")}<select name="projectType" defaultValue="Family home"><option value="Family home">{t("Family home")}</option><option value="Commercial building">{t("Commercial building")}</option><option value="Other construction">{t("Other construction")}</option></select></label>
        <label>{t("Preferred design style")}<select name="style" value={preferredStyle} onChange={event => onStyleChange(event.target.value)}><option value="Let’s explore together">{t("Let’s explore together")}</option><option value="Contemporary">{t("Contemporary")}</option><option value="Courtyard">{t("Courtyard")}</option><option value="Classic">{t("Classic")}</option><option value="Not applicable">{t("Not applicable")}</option></select></label>
        <label>{t("Your vision")}<textarea name="vision" rows="3" maxLength="1500" placeholder={t("The spaces, details or ideas you have in mind…")} /></label>
        <button className="button button-dark" type="submit">{t("Continue in WhatsApp")} <Icon name="message" /></button>
        <small className="form-note">{t("Opens WhatsApp with your details. You review and send the message there.")}</small>
        {error && <p className="form-error" id="enquiry-error" role="alert">{t(error)}</p>}
        {messageLink && <p className="form-success" role="status">{t("Your enquiry is ready.")} <a href={messageLink} target="_blank" rel="noopener noreferrer">{t("Continue in WhatsApp ↗")}</a> {t("to send it.")}</p>}
      </form>
    </div>
  </section>
}
