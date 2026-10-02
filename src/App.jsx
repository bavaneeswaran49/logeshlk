import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './components/Home'
import About from './components/About'
import VillaCollection from './components/VillaCollection'
import Service from './components/Service'
import Process from './components/Process'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Icon from './components/Icon'
import { whatsappUrl } from './siteContent'
export default function App() {
  const [preferredStyle, setPreferredStyle] = useState('Let’s explore together')
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main"><Home /><About /><VillaCollection onEnquire={setPreferredStyle} /><Service /><Process />
      <section className="vision-banner" aria-labelledby="vision-title"><img src="/images/villa-courtyard.png" alt="" loading="lazy" width="1536" height="1024" /><div className="container"><span className="eyebrow">SPACE TO LIVE. ROOM TO DREAM.</span><h2 id="vision-title">Not just where you live.<br /><em>How you want to live.</em></h2><a className="button button-light" href="#contact">Let’s imagine your home <Icon /></a></div></section>
      <Faq /><Contact preferredStyle={preferredStyle} onStyleChange={setPreferredStyle} />
    </main><Footer />
    <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sri Builders on WhatsApp"><Icon name="message" /><span>Let’s talk</span></a>
  </>
}
