const steps = [
  ['We listen', 'Your ideas, your family, your everyday life. We begin with a conversation about the home you want to create.'],
  ['We design', 'We explore your plot, layout and architectural direction, with the details and scope discussed together.'],
  ['We build', 'Your approved vision moves into construction, with the materials, stages and finishes agreed for your home.'],
  ['You come home', 'The final details come together. We walk through the completed home with you before the handover.'],
]
export default function Process() {
  return <section id="process" className="process-section section container" aria-labelledby="process-title"><div className="section-heading"><div><span className="eyebrow">FROM A THOUGHT TO A HOME</span><h2 id="process-title">A personal journey.<br /><em>A remarkable result.</em></h2></div><p>A clear path from the first conversation to your first step inside. Here’s how we approach your home.</p></div><div className="process-grid">{steps.map(([title, copy], index) => <article key={title}><div className="process-number">0{index + 1}<span /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
}
