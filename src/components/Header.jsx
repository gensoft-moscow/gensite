import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { tabs } from '../data/siteData'
import Logo from './Logo'

function AcrylicTabs({ activeTab, setActiveTab }) {
  return (
    <div className="acrylic-tabs-shell">
      <nav className="tab-list" aria-label="Основная навигация">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

function Header({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)

  useEffect(() => {
    const updateHeaderTheme = () => {
      const elementBelowHeader = document.elementFromPoint(window.innerWidth / 2 - 100, 96)
      setIsOverDark(Boolean(elementBelowHeader?.closest('.cases-section')))
    }

    updateHeaderTheme()
    window.addEventListener('scroll', updateHeaderTheme, { passive: true })
    window.addEventListener('resize', updateHeaderTheme)

    return () => {
      window.removeEventListener('scroll', updateHeaderTheme)
      window.removeEventListener('resize', updateHeaderTheme)
    }
  }, [activeTab])

  return (
    <header className={`site-header ${isOverDark ? 'dark-context' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-acrylic header-brand">
        <Logo light={isOverDark} onClick={() => setActiveTab('home')} />
      </div>
      <div className="desktop-nav">
        <AcrylicTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="header-acrylic header-contact">
        <button
          className="contact-link"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Обсудить проект
          <ArrowUpRight size={17} strokeWidth={2} />
        </button>
      </div>
      <div className="header-acrylic mobile-menu-shell">
        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <Menu className="menu-icon menu-icon-open" />
          <X className="menu-icon menu-icon-close" />
        </button>
        <nav className="mobile-menu" aria-label="Мобильная навигация">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => {
                setActiveTab(tab.id)
                setMenuOpen(false)
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
