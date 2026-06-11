import Logo from './Logo'

function Footer({ setActiveTab }) {
  return (
    <footer>
      <Logo onClick={() => setActiveTab('home')} />
      <p>© 2026 ООО «Ген Софт»</p>
      <div>
        <a href="mailto:hello@gensoft.ru">hello@gensoft.ru</a>
        <span>Москва</span>
      </div>
    </footer>
  )
}

export default Footer
