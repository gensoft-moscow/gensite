function Logo({ onClick, light = false }) {
  return (
    <button className="logo" onClick={onClick} aria-label="GenSoft, на главную">
      <span className={`logo-mark ${light ? 'is-light' : ''}`} aria-hidden="true">
        <img
          className="logo-mark-image logo-mark-dark"
          src={`${import.meta.env.BASE_URL}images/Logo.svg`}
          alt=""
        />
        <img
          className="logo-mark-image logo-mark-light"
          src={`${import.meta.env.BASE_URL}images/Logo_light.svg`}
          alt=""
        />
      </span>
      <img
        className="logo-wordmark"
        src={`${import.meta.env.BASE_URL}images/Gensoft.svg`}
        alt="GenSoft"
      />
    </button>
  )
}

export default Logo
