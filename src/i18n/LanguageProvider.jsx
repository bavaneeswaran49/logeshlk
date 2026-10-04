import { useEffect, useRef, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { isLanguage, LANGUAGE_STORAGE_KEY, readLanguage, saveLanguage, translate } from './language'

export default function LanguageProvider({ children }) {
  const [preference, setPreference] = useState(() => {
    const language = readLanguage()
    return { language: language ?? 'en', modalOpen: !language }
  })
  const dialogRef = useRef(null)
  const { language, modalOpen } = preference
  const t = text => translate(language, text)

  useEffect(() => {
    document.documentElement.lang = language === 'ta' ? 'ta-IN' : 'en-IN'
  }, [language])

  useEffect(() => {
    const handleStorage = event => {
      if (event.key !== LANGUAGE_STORAGE_KEY && event.key !== null) return
      if (isLanguage(event.newValue)) {
        setPreference({ language: event.newValue, modalOpen: false })
      } else {
        setPreference(current => ({ ...current, modalOpen: true }))
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      document.getElementById('language-switcher')?.focus({ preventScroll: true })
    }
  }, [modalOpen])

  function closeModal() {
    setPreference(current => ({ ...current, modalOpen: false }))
  }

  function selectLanguage(nextLanguage) {
    saveLanguage(nextLanguage)
    setPreference({ language: nextLanguage, modalOpen: false })
  }

  return <LanguageContext.Provider value={{ language, t, openLanguageModal: () => setPreference(current => ({ ...current, modalOpen: true })) }}>
    {children}
    <dialog id="language-dialog" ref={dialogRef} className="language-dialog" aria-labelledby="language-title" aria-describedby="language-description" onCancel={event => { event.preventDefault(); closeModal() }}>
      <button type="button" className="dialog-close" aria-label={t('Close language selection')} onClick={closeModal}>×</button>
      <span className="eyebrow">SRI BUILDERS</span>
      <h2 id="language-title"><span lang="en">Choose your language</span><span lang="ta">உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</span></h2>
      <p id="language-description"><span lang="en">Make yourself at home. Choose the language you prefer.</span><span lang="ta">உங்களுக்கு விருப்பமான மொழியில் எங்கள் தளத்தைப் பார்வையிடுங்கள்.</span></p>
      <div className="language-options">
        <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => selectLanguage('en')} autoFocus><strong>English</strong><span>Continue in English</span></button>
        <button type="button" lang="ta" aria-pressed={language === 'ta'} onClick={() => selectLanguage('ta')}><strong>தமிழ்</strong><span>தமிழில் தொடரவும்</span></button>
      </div>
      <small><span lang="en">We’ll remember your choice on this browser.</span><span lang="ta">இந்த உலாவியில் உங்கள் தேர்வு சேமிக்கப்படும்.</span></small>
    </dialog>
  </LanguageContext.Provider>
}
