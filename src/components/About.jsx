import Icon from './Icon'
export default function About() {
  return <section id="about" className="about-section section container" aria-labelledby="about-title">
    <div className="about-visual"><img src="/images/villa-interior.png" alt="Design inspiration: a sunlit villa living room with warm wood and natural finishes" loading="lazy" width="1536" height="1024" /><span className="image-caption">THE ART OF FEELING AT HOME</span><div className="about-seal"><span>DESIGNED<br />WITH PURPOSE.</span><span className="seal-star" aria-hidden="true">✳</span><span>BUILT<br />WITH CARE.</span></div></div>
    <div className="about-copy"><span className="eyebrow">THE SRI BUILDERS PHILOSOPHY</span><h2 id="about-title">More than a villa.<br /><em>Your way of living.</em></h2><p>Some homes are built to be seen. The best ones are built to be lived in.</p><p>At Sri Builders and Developers, our focus is creating premium villas in Tirupur that feel distinctly yours. From the first conversation to the finishing touches, your lifestyle is the starting point.</p><p>Thoughtful spaces. Honest materials. Details that make everyday living a little more extraordinary.</p><div className="about-signature"><span>Sri Builders</span><small>YOUR VISION. OUR CRAFT.</small></div><a className="text-link" href="#process">Discover how we build <Icon /></a></div>
  </section>
}
