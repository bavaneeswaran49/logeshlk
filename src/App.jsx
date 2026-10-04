import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './components/Home'
import About from './components/About'
import VillaCollection from './components/VillaCollection'
import Service from './components/Service'
import Process from './components/Process'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Careers from './components/Careers'
import Footer from './components/Footer'
import Icon from './components/Icon'
import { whatsappUrl } from './siteContent'
import LanguageProvider from './i18n/LanguageProvider'
import useLanguage from './i18n/useLanguage'

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>
}

function AppContent() {
  const { t } = useLanguage()
  const [preferredStyle, setPreferredStyle] = useState('Let’s explore together')
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <Navbar />
    <main id="main">
      <Home />
      <VillaCollection onEnquire={setPreferredStyle} />
      <Service />
      <Process />
      <About />
      <Faq />
      <Contact preferredStyle={preferredStyle} onStyleChange={setPreferredStyle} />
      <Careers />
    </main>
    <Footer />
    <a className="floating-whatsapp" href={whatsappUrl(t('Hello Sri Builders, I would like to discuss a construction project in Tiruppur.'))} target="_blank" rel="noopener noreferrer" aria-label={t("Chat with Sri Builders on WhatsApp")}><Icon name="message" /><span>{t("Let’s talk")}</span></a>
  </MotionConfig>
}
