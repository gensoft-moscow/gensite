import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './sections/About'
import Cases from './sections/Cases'
import Contact from './sections/Contact'
import Home from './sections/Home'
import Services from './sections/Services'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const changeTab = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header activeTab={activeTab} setActiveTab={changeTab} />
      <main key={activeTab} className="page-enter">
        {activeTab === 'home' && <Home setActiveTab={changeTab} />}
        {activeTab === 'services' && <Services expanded setActiveTab={changeTab} />}
        {activeTab === 'cases' && <Cases expanded setActiveTab={changeTab} />}
        {activeTab === 'about' && <About />}
        <Contact />
      </main>
      <Footer setActiveTab={changeTab} />
    </div>
  )
}

export default App
