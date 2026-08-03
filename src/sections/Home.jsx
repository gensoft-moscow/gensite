import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, ChevronRight, Sparkles } from 'lucide-react'
import DynamicHeroGraph from '../components/DynamicHeroGraph'
import HeroGraph from '../components/HeroGraph'
import { sectionVisibility } from '../config/sectionVisibility'
import Cases from './Cases'
import CompanyDetails from './CompanyDetails'
import Services from './Services'
import Technologies from './Technologies'

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
  const heroRef = useRef(null)
  const heroVisualRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const heroVisual = heroVisualRef.current
    if (!hero || !heroVisual) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    const updateGraphOffset = () => {
      animationFrame = 0

      if (reduceMotion) {
        heroVisual.style.transform = ''
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const scrolledPastHeroTop = Math.max(0, -heroRect.top)
      const parallaxOffset = Math.min(scrolledPastHeroTop, heroRect.height) * 0.5
      heroVisual.style.transform = `translate3d(0, ${parallaxOffset.toFixed(2)}px, 0)`
    }

    const requestUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateGraphOffset)
    }

    updateGraphOffset()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.cancelAnimationFrame(animationFrame)
      heroVisual.style.transform = ''
    }
  }, [])

  return (
    <>
      {sectionVisibility.hero && <section className="hero" ref={heroRef}>
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
            <button className="text-button" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
              Наши решения <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-visual" ref={heroVisualRef}>
          <div className="legacy-hero-graph">
            <HeroGraph />
          </div>
          <DynamicHeroGraph />
        </div>
        <div className="hero-footnote">
          <span>Москва</span>
        </div>
      </section>}

      {sectionVisibility.approach && <section className="statement-section">
        <p>Наш подход</p>
        <h2>
          Не просто пишем код.
          <br />
          <span>Разбираемся в задаче,</span> проектируем опыт
          <br />
          и отвечаем за результат.
        </h2>
      </section>}

      {sectionVisibility.services && <Services />}
      {sectionVisibility.cases && <Cases setActiveTab={setActiveTab} />}
      {sectionVisibility.technologies && <Technologies />}
      {sectionVisibility.companyDetails && <CompanyDetails />}
    </>
  )
}

export default Home
