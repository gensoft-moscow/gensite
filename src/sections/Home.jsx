import { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, ChevronRight, Sparkles } from 'lucide-react'
import HeroGraph from '../components/HeroGraph'
import Cases from './Cases'
import Services from './Services'

function FittedTitleLine({ className, children }) {
  const lineRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const line = lineRef.current
    const text = textRef.current

    const fitLine = () => {
      if (!line || !text || window.innerWidth > 620) return

      text.style.setProperty('--line-scale', '1')
      const scale = line.clientWidth / text.scrollWidth
      text.style.setProperty('--line-scale', scale.toFixed(4))
    }

    const observer = new ResizeObserver(fitLine)
    observer.observe(line)
    document.fonts?.ready.then(fitLine)
    fitLine()

    return () => observer.disconnect()
  }, [])

  return (
    <span className={`hero-title-line ${className}`} ref={lineRef}>
      <span className="hero-title-text" ref={textRef}>{children}</span>
    </span>
  )
}

function Home({ setActiveTab }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={14} /> Разработка цифровых решений
          </p>
          <h1 className="hero-title">
            <FittedTitleLine className="hero-title-dark hero-title-complex">Сложные</FittedTitleLine>
            <FittedTitleLine className="hero-title-dark hero-title-systems">системы.</FittedTitleLine>
            <FittedTitleLine className="hero-title-blue hero-title-simple">Простые</FittedTitleLine>
            <FittedTitleLine className="hero-title-blue hero-title-solutions">решения.</FittedTitleLine>
          </h1>
          <p className="hero-description">
            Создаем цифровые продукты, которые помогают бизнесу двигаться быстрее,
            а людям — работать легче.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setActiveTab('cases')}>
              Смотреть проекты <ArrowDownRight size={20} />
            </button>
            <button className="text-button" onClick={() => setActiveTab('services')}>
              Наши решения <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <HeroGraph />
        </div>
        <div className="hero-footnote">
          <span>Москва · Работаем по всему миру</span>
          <span className="line" />
          <span>С 2014 года</span>
        </div>
      </section>

      <section className="statement-section">
        <p>Наш подход</p>
        <h2>
          Не просто пишем код.
          <br />
          <span>Разбираемся в задаче,</span> проектируем опыт
          <br />
          и отвечаем за результат.
        </h2>
      </section>

      <Services setActiveTab={setActiveTab} />
      <Cases setActiveTab={setActiveTab} />
    </>
  )
}

export default Home
