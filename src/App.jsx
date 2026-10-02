import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './components/Home'
import About from './components/About'
import VillaCollection from './components/VillaCollection'
import WhyBuilders from './components/WhyBuilders'
import Service from './components/Service'
import Process from './components/Process'
import Philosophy from './components/Philosophy'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Icon from './components/Icon'
import { whatsappUrl } from './siteContent'

export default function App() {
  const [preferredStyle, setPreferredStyle] = useState('Let’s explore together')
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Home /><About /><VillaCollection onEnquire={setPreferredStyle} /><WhyBuilders /><Service /><Process /><Philosophy /><Faq /><Contact preferredStyle={preferredStyle} onStyleChange={setPreferredStyle} /></main>
    <Footer />
    <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sri Builders on WhatsApp"><Icon name="message" /><span>Let’s talk</span></a>
  </MotionConfig>
}
