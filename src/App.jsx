import { useLayoutEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { sectionVisibility } from './config/sectionVisibility'
import About from './sections/About'
import Cases from './sections/Cases'
import Contact from './sections/Contact'
import Home from './sections/Home'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const projectsTheme = activeTab === 'cases'

  useLayoutEffect(() => {
    const themeColor = projectsTheme ? '#15191f' : '#f2f1ed'
    const metaTheme = document.querySelector('meta[name="theme-color"]')

    document.documentElement.style.backgroundColor = themeColor
    document.body.style.backgroundColor = themeColor
    metaTheme?.setAttribute('content', themeColor)

    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
    }
  }, [projectsTheme])

  const changeTab = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app ${projectsTheme ? 'projects-theme' : ''}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header activeTab={activeTab} setActiveTab={changeTab} />
      <main key={activeTab} className="page-enter">
        {activeTab === 'home' && <Home setActiveTab={changeTab} />}
        {activeTab === 'cases' && <Cases expanded setActiveTab={changeTab} />}
        {activeTab === 'about' && <About />}
        {sectionVisibility.contact && !projectsTheme && <Contact />}
      </main>
      {sectionVisibility.footer && (
        <Footer dark={projectsTheme} setActiveTab={changeTab} />
      )}
    </div>
  )
}

export default App
