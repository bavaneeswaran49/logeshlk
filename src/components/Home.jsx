import Icon from './Icon'
export default function Home() {
  return <>
    <section id="home" className="hero" aria-labelledby="hero-title">
      <img className="hero-image" src="/images/villa-hero.png" alt="Architectural concept of a contemporary villa with tropical landscaping" width="1824" height="1024" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content container"><span className="hero-eyebrow"><span /> PREMIUM VILLAS. PERSONAL BY DESIGN.</span><h1 id="hero-title">Extraordinary homes.<br /><em>Thoughtfully built.</em></h1><p>A home that reflects who you are.<br />Beautifully designed and carefully built in Tirupur.</p><div className="hero-actions"><a className="button button-light" href="#villas">Explore our villa collection <Icon /></a><a className="button button-outline" href="#contact">Bring your vision to life <Icon /></a></div></div>
      <div className="hero-bottom container"><a href="#about">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a><span>ARCHITECTURAL CONCEPT · TIRUPUR</span></div>
    </section>
    <div className="values-strip"><div className="container values-inner"><span><span className="value-mark">01</span> Bespoke by design</span><span><span className="value-mark">02</span> Considered in every detail</span><span><span className="value-mark">03</span> Built for generations</span></div></div>
  </>
}
