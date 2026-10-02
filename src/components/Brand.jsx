export default function Brand({ onClick }) {
  return <a className="brand" href="#home" aria-label="Sri Builders home" onClick={onClick}>
    <span className="brand-monogram" aria-hidden="true">SB<span /></span>
    <span className="brand-type">SRI BUILDERS<span>AND DEVELOPERS</span></span>
  </a>
}
