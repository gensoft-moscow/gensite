import Logo from './Logo'

function Footer({ dark = false, setActiveTab }) {
  return (
    <footer className={dark ? 'footer-dark' : ''}>
      <Logo light={dark} onClick={() => setActiveTab('home')} />
      <p>© 2026 ООО «ГЕНСОФТ»</p>
      <div>
        <a href="mailto:info@gensoft.ru">info@gensoft.ru</a>
        <span>Москва</span>
      </div>
    </footer>
  )
}

export default Footer
