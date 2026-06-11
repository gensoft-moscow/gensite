function Logo({ onClick }) {
  return (
    <button className="logo" onClick={onClick} aria-label="GenSoft, на главную">
      {/* <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </span> */}
      <img
        className="logo-mark"
        src={`${import.meta.env.BASE_URL}images/Logo.svg`}
        alt="GenSoft"
      />
      <img
        className="logo-wordmark"
        src={`${import.meta.env.BASE_URL}images/Gensoft.svg`}
        alt="GenSoft"
      />
    </button>
  )
}

export default Logo
