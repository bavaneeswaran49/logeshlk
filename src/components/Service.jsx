import Icon from './Icon'
const services = [
  { icon: 'home', title: 'Premium villa construction', copy: 'Your home, brought to life. A considered approach to building, from the structure to the smallest finishing detail.', detail: 'FROM FOUNDATION TO FINISH' },
  { icon: 'compass', title: 'Architecture & planning', copy: 'Spaces shaped around you. A personal design conversation about how you live, what you love and what your plot can become.', detail: 'A VISION WITH PURPOSE' },
  { icon: 'layers', title: 'Interiors & finishes', copy: 'Materials you can feel. An intentional palette of textures, finishes and details that brings warmth and character to your home.', detail: 'THE DETAILS MAKE THE DIFFERENCE' },
]
export default function Service() {
  return <section id="services" className="services-section section" aria-labelledby="services-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">OUR EXPERTISE</span><h2 id="services-title">One vision.<br /><em>Every detail considered.</em></h2></div><a href="#contact" className="text-link">Let’s discuss your home <Icon /></a></div><div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title}><div className="service-top"><Icon name={service.icon} /><span>0{index + 1}</span></div><h3>{service.title}</h3><p>{service.copy}</p><a href="#contact">{service.detail}<Icon /></a></article>)}</div></div></section>
}
