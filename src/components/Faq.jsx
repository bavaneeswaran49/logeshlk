const questions = [
  ['Can you build a villa on my own plot?', 'Yes. Start by sharing your plot location and the kind of home you have in mind. We can discuss a design and construction scope suited to your property.'],
  ['Can I customise the villa designs shown here?', 'Absolutely. The collection is design inspiration, rather than a fixed catalogue. Your layout, size, materials and finishes are discussed around your plot, preferences and budget.'],
  ['How do I get a cost estimate?', 'Contact us with your plot details, approximate built-up area and expectations for finishes. A useful estimate starts with a clear scope; pricing is discussed for your individual project.'],
  ['How long will my villa take to build?', 'The programme depends on the design, approvals, project size and agreed scope. We discuss an expected schedule during consultation rather than promise the same timeline for every home.'],
]
export default function Faq() {
  return <section className="faq-section section container" aria-labelledby="faq-title"><div><span className="eyebrow">A LITTLE MORE CLARITY</span><h2 id="faq-title">Before we<br /><em>begin.</em></h2><p>Questions are a good place to start.</p></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}
