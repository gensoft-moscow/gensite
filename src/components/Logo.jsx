function Logo({ onClick }) {
  return (
    <button className="logo" onClick={onClick} aria-label="GenSoft, на главную">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <img className="logo-wordmark" src="/images/Gensoft.svg" alt="GenSoft" />
    </button>
  )
}

export default Logo
