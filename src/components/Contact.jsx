import { useState } from 'react'
import { business, whatsappUrl } from '../siteContent'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function Contact({ preferredStyle, onStyleChange }) {
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
    const message = `Hello Sri Builders, I would like to discuss a premium villa.\n\nName: ${name}\nPhone: ${phone}\nLocation: ${String(fields.get('location')).trim() || 'To be discussed'}\nPlot: ${fields.get('plot')}\nPreferred style: ${fields.get('style')}\nMy vision: ${String(fields.get('vision')).trim() || 'I would love to explore the possibilities.'}`
    const link = whatsappUrl(message)
    setError('')
    setMessageLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }
  return <section id="contact" className="contact-section section" aria-labelledby="contact-title">
    <div className="container contact-grid">
      <Reveal className="contact-copy">
        <span className="eyebrow">06 / LET’S BEGIN</span>
        <h2 id="contact-title">Let’s build<br /><em>something personal.</em></h2>
        <p>A vision, a plot, or simply an idea for a home.<br />We’d love to hear where you want to begin.</p>
        <a className="contact-phone" href={`tel:${business.telephone}`}><Icon name="phone" /><span><small>LET’S TALK</small>{business.phone}</span><Icon /></a>
        <div className="contact-location"><Icon name="pin" /><span>Based in Tiruppur.<br /><small>Building homes with a sense of place.</small></span></div>
        <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Start a conversation on WhatsApp <Icon /></a>
      </Reveal>
      <form className="enquiry-form" onSubmit={handleSubmit} onChange={() => { setMessageLink(''); setError('') }} aria-labelledby="enquiry-title">
        <h3 id="enquiry-title">Tell us about your home</h3>
        <p>Start with your name and number. Share more if you’re ready.</p>
        <div className="form-grid">
          <label>Your name <span>*</span><input name="name" required autoComplete="name" maxLength="80" placeholder="Full name" aria-invalid={error ? true : undefined} aria-describedby={error ? 'enquiry-error' : undefined} /></label>
          <label>Phone number <span>*</span><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength="18" pattern="[+0-9 \(\)\-]{10,18}" placeholder="Your contact number" aria-invalid={error ? true : undefined} aria-describedby={error ? 'enquiry-error' : undefined} /></label>
          <label>Project location<input name="location" autoComplete="address-level2" maxLength="100" placeholder="Tiruppur or nearby" /></label>
          <label>Do you have a plot?<select name="plot" defaultValue="I own a plot"><option>I own a plot</option><option>I’m looking for a plot</option><option>I’d like guidance</option></select></label>
        </div>
        <label>Preferred villa style<select name="style" value={preferredStyle} onChange={event => onStyleChange(event.target.value)}><option>Let’s explore together</option><option>Contemporary</option><option>Courtyard</option><option>Classic</option></select></label>
        <label>Your vision<textarea name="vision" rows="3" maxLength="1500" placeholder="The spaces, details or ideas you have in mind…" /></label>
        <button className="button button-dark" type="submit">Continue in WhatsApp <Icon name="message" /></button>
        <small className="form-note">Opens WhatsApp with your details. You review and send the message there.</small>
        {error && <p className="form-error" id="enquiry-error" role="alert">{error}</p>}
        {messageLink && <p className="form-success" role="status">Your enquiry is ready. <a href={messageLink} target="_blank" rel="noopener noreferrer">Continue in WhatsApp ↗</a> to send it.</p>}
      </form>
    </div>
  </section>
}
