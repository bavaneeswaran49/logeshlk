import { useEffect, useRef, useState } from 'react'
import { villas } from '../siteContent'
import Icon from './Icon'
export default function VillaCollection({ onEnquire }) {
  const [filter, setFilter] = useState('All styles')
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!selected) { if (dialog.open) dialog.close(); return }
    dialog.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [selected])
  return <section id="villas" className="villa-section section" aria-labelledby="villa-title"><div className="container">
    <div className="section-heading"><div><span className="eyebrow">THE VILLA COLLECTION</span><h2 id="villa-title">A signature style.<br /><em>A home that’s yours.</em></h2></div><p>Explore a few directions your dream home could take. Each design is a starting point, shaped around your plot and your life.</p></div>
    <div className="collection-toolbar"><div className="collection-filters" role="group" aria-label="Filter villa styles">{['All styles', 'Contemporary', 'Courtyard', 'Classic'].map(style => <button key={style} type="button" aria-pressed={filter === style} className={filter === style ? 'selected' : ''} onClick={() => setFilter(style)}>{style}</button>)}</div><span>DESIGN INSPIRATION · CUSTOM BUILT</span></div>
    <div className="villa-grid" aria-live="polite">{villas.filter(villa => filter === 'All styles' || villa.style === filter).map(villa => <article className="villa-card" key={villa.id}><button type="button" className="villa-image-button" onClick={() => setSelected(villa)} aria-label={`Explore ${villa.title}`}><img src={villa.image} alt={villa.alt} loading="lazy" width="1536" height="1024" /><span className="concept-tag">CONCEPT {String(villas.indexOf(villa) + 1).padStart(2, '0')}</span><span className="image-arrow"><Icon /></span></button><div className="villa-card-copy"><span className="eyebrow">{villa.style} living</span><h3>{villa.title}</h3><div><p>{villa.subtitle}</p><button type="button" onClick={() => setSelected(villa)} aria-label={`View details of ${villa.title}`}><Icon /></button></div></div></article>)}</div>
    <p className="collection-note">Images are architectural concepts for inspiration, not photographs of completed Sri Builders projects.</p>
    <dialog ref={dialogRef} className="villa-dialog" aria-labelledby="villa-dialog-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>{selected && <div className="dialog-content"><button className="dialog-close" type="button" aria-label="Close villa details" onClick={() => setSelected(null)}><Icon name="close" /></button><img src={selected.image} alt={selected.alt} width="1536" height="1024" /><div className="dialog-copy"><span className="eyebrow">ARCHITECTURAL CONCEPT · CUSTOM TO YOUR PLOT</span><h2 id="villa-dialog-title">{selected.title}</h2><p>{selected.description}</p><ul>{selected.features.map(feature => <li key={feature}><Icon name="check" />{feature}</li>)}</ul><p className="villa-vision">{selected.vision}</p><a className="button button-dark" href="#contact" onClick={() => { onEnquire(selected.style); setSelected(null) }}>Discuss a home in this style <Icon /></a><small>Final layout, area, finishes and cost are tailored during consultation.</small></div></div>}</dialog>
  </div></section>
}
