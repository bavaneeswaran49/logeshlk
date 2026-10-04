import { useState } from 'react'
import useLanguage from '../i18n/useLanguage'
import { business, whatsappUrl } from '../siteContent'
import { canShareResume, careerMessage, RESUME_ACCEPT, validateCareerApplication } from '../careerApplication'
import Reveal from '../motion/Reveal'
import Icon from './Icon'

export default function Careers() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [resume, setResume] = useState(null)
  const [error, setError] = useState('')
  const [messageLink, setMessageLink] = useState('')
  const [sharing, setSharing] = useState(false)
  const [shareAvailable, setShareAvailable] = useState(false)

  function resetFeedback() {
    setError('')
    setMessageLink('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validation = validateCareerApplication(name, resume)
    setError(validation)
    if (validation) return
    const link = whatsappUrl(careerMessage(name, resume, t))
    setMessageLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  async function shareResume() {
    const validation = validateCareerApplication(name, resume)
    setError(validation)
    if (validation) return
    if (!canShareResume(resume)) {
      setShareAvailable(false)
      return
    }
    setSharing(true)
    try {
      await navigator.share({ files: [resume], title: t('Career application'), text: `${t('Name')}: ${name.trim()}\n${t('Career application')}` })
    } catch (shareError) {
      if (shareError.name !== 'AbortError') setError('File sharing is unavailable. Attach your résumé in the WhatsApp chat instead.')
    } finally {
      setSharing(false)
    }
  }

  return <section id="careers" className="careers-section section container" aria-labelledby="careers-title">
    <Reveal className="careers-copy">
      <span className="eyebrow">{t("07 / CAREERS")}</span>
      <h2 id="careers-title">{t("Build your future.")}<br /><em>{t("Work with us.")}</em></h2>
      <p>{t("Interested in joining Sri Builders? Share your name and résumé to start a conversation about opportunities with our team.")}</p>
    </Reveal>
    <form className="enquiry-form careers-form" onSubmit={handleSubmit} aria-labelledby="career-form-title">
      <h3 id="career-form-title">{t("Introduce yourself")}</h3>
      <p>{t("Your name and résumé are all you need to begin.")}</p>
      <label htmlFor="career-name">{t("Your name")} <span>*</span>
        <input id="career-name" name="applicantName" required autoComplete="name" maxLength="80" placeholder={t("Full name")} value={name} disabled={sharing} onChange={event => { setName(event.target.value); resetFeedback() }} aria-invalid={error ? true : undefined} aria-describedby={error ? 'career-error' : undefined} />
      </label>
      <label htmlFor="career-resume">{t("Upload your résumé")} <span>*</span>
        <input id="career-resume" name="resume" type="file" required accept={RESUME_ACCEPT} disabled={sharing} onChange={event => { const file = event.target.files?.[0] ?? null; setResume(file); setShareAvailable(canShareResume(file)); resetFeedback() }} aria-invalid={error ? true : undefined} aria-describedby={`career-file-help${error ? ' career-error' : ''}`} />
      </label>
      <p id="career-file-help" className="career-file-help">{t("PDF, DOC or DOCX · Maximum 5 MB")}</p>
      {resume && <p className="career-selected-file"><Icon name="check" /><span>{resume.name} · {(resume.size / 1024 / 1024).toFixed(2)} MB</span></p>}
      <button className="button button-dark" type="submit" disabled={sharing}>{t("Continue in WhatsApp")} <Icon name="message" /></button>
      <small className="form-note">{t("Opens a message to Sri Builders with your name. Attach your résumé in WhatsApp, then review and send. Selecting a file here does not send it.")}</small>
      {error && <p className="form-error" id="career-error" role="alert">{t(error)}</p>}
      {messageLink && <div className="career-handoff">
        <p role="status">{t("Your application message is ready. Attach your résumé in WhatsApp before sending.")}</p>
        <a className="text-link" href={messageLink} target="_blank" rel="noopener noreferrer">{t("Open WhatsApp again")} <Icon /></a>
        {shareAvailable && <>
          <button className="button career-share" type="button" disabled={sharing} onClick={shareResume}>{t(sharing ? 'Opening file sharing…' : 'Share résumé file')} <Icon /></button>
          <small>{t("Choose WhatsApp, then select Sri Builders at")} <a href={`tel:${business.telephone}`}>{business.phone}</a>.</small>
        </>}
      </div>}
    </form>
  </section>
}
