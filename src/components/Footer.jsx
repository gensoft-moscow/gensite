import Logo from './Logo'

function Footer({ setActiveTab }) {
  return (
    <footer>
      <Logo onClick={() => setActiveTab('home')} />
      <p>© 2026 ООО «СОФТГЕН»</p>
      <div>
        <a href="mailto:info@softgen.ru">info@softgen.ru</a>
        <span>Нижний Новгород</span>
      </div>
    </footer>
  )
}

export default Footer
