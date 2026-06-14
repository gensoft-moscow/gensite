import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Building2,
  ExternalLink,
  Handshake,
  X,
} from 'lucide-react'
import { cases } from '../data/siteData'

function ProjectScreen({ slide }) {
  return (
    <div className={`project-screen project-screen-${slide.layout}`} style={{ '--project-accent': slide.accent }}>
      <div className="project-screen-bar">
        <span />
        <span />
        <span />
        <strong>GenSoft / {slide.title}</strong>
      </div>
      <div className="project-screen-body">
        <aside>
          <span className="is-active" />
          <span />
          <span />
          <span />
        </aside>
        <div className="project-screen-content">
          <div className="project-screen-heading">
            <div>
              <small>{slide.subtitle}</small>
              <strong>{slide.title}</strong>
            </div>
            <span />
          </div>
          <div className="project-screen-ui">
            <div className="screen-panel screen-panel-main" />
            <div className="screen-panel" />
            <div className="screen-panel" />
            <div className="screen-panel screen-panel-wide" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCarousel({ project, slideIndex, setSlideIndex }) {
  const slide = project.slides[slideIndex]

  const changeSlide = (direction) => {
    setSlideIndex((current) => (
      (current + direction + project.slides.length) % project.slides.length
    ))
  }

  return (
    <div className="project-carousel">
      <ProjectScreen slide={slide} />
      <div className="project-carousel-controls">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            changeSlide(-1)
          }}
          aria-label="Предыдущий скриншот"
        >
          <ArrowLeft />
        </button>
        <span>{String(slideIndex + 1).padStart(2, '0')} / {String(project.slides.length).padStart(2, '0')}</span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            changeSlide(1)
          }}
          aria-label="Следующий скриншот"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

function ProjectOverlay({ project, projectIndex, origin, slideIndex, setSlideIndex, onClosed }) {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const onClosedRef = useRef(onClosed)
  const closingRef = useRef(false)

  useEffect(() => {
    onClosedRef.current = onClosed
  }, [onClosed])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => setOpen(true))
    const readyTimer = window.setTimeout(() => setReady(true), 470)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        window.setTimeout(() => onClosedRef.current(), 460)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(readyTimer)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setReady(false)
    setOpen(false)
    window.setTimeout(() => onClosedRef.current(), 460)
  }

  return createPortal(
    <div className={`project-overlay ${open ? 'is-open' : ''} ${ready ? 'is-ready' : ''}`} role="presentation">
      <button
        className="project-overlay-backdrop"
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          close()
        }}
        onPointerDown={(event) => {
          event.preventDefault()
          event.stopPropagation()
          close()
        }}
        aria-label="Закрыть проект"
      />
      <article
        className="project-overlay-card"
        style={{
          '--origin-left': `${origin.left}px`,
          '--origin-top': `${origin.top}px`,
          '--origin-width': `${origin.width}px`,
          '--origin-height': `${origin.height}px`,
        }}
      >
        <button
          className="project-close"
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            close()
          }}
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            close()
          }}
          aria-label="Закрыть проект"
        >
          <X />
        </button>

        <div className="project-overlay-scroll">
          <ProjectCarousel
            project={project}
            slideIndex={slideIndex}
            setSlideIndex={setSlideIndex}
          />

          <div className="project-gallery-summary">
            <span>0{projectIndex + 1} · {project.category}</span>
            <h2>{project.title}</h2>
          </div>

          <div className="project-details">
            <section className="project-description">
              <p className="project-detail-label">О проекте</p>
              <p>{project.description}</p>
            </section>

            <section className="project-technologies">
              <p className="project-detail-label">Технологии</p>
              <div>
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>

            <div className="project-meta">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  <span><small>Ссылка</small><strong>Открыть проект</strong></span>
                </a>
              )}
              {project.customer && (
                <div>
                  <Building2 />
                  <span><small>Заказчик</small><strong>{project.customer}</strong></span>
                </div>
              )}
              {project.partner && (
                <div>
                  <Handshake />
                  <span><small>Партнёр</small><strong>{project.partner}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  )
}

function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [slideIndexes, setSlideIndexes] = useState({})

  const setProjectSlide = (projectId, updater) => {
    setSlideIndexes((current) => {
      const currentIndex = current[projectId] ?? 0
      const nextIndex = typeof updater === 'function' ? updater(currentIndex) : updater
      return { ...current, [projectId]: nextIndex }
    })
  }

  return (
    <div className="project-gallery">
      {cases.map((project, index) => {
        const slideIndex = slideIndexes[project.id] ?? 0

        return (
          <article
            className="project-gallery-card"
            key={project.id}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              setSelectedProject({
                project,
                projectIndex: index,
                origin: {
                  left: rect.left,
                  top: rect.top,
                  width: rect.width,
                  height: rect.height,
                },
              })
            }}
          >
            <ProjectCarousel
              project={project}
              slideIndex={slideIndex}
              setSlideIndex={(updater) => setProjectSlide(project.id, updater)}
            />

            <div className="project-gallery-summary">
              <span>0{index + 1} · {project.category}</span>
              <h2>{project.title}</h2>
              <button type="button">
                Подробнее <ArrowUpRight />
              </button>
            </div>
          </article>
        )
      })}
      {selectedProject && (
        <ProjectOverlay
          {...selectedProject}
          slideIndex={slideIndexes[selectedProject.project.id] ?? 0}
          setSlideIndex={(updater) => setProjectSlide(selectedProject.project.id, updater)}
          onClosed={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

function FeaturedCases({ setActiveTab }) {
  return (
    <>
      <div className="section-heading light has-cta">
        <div>
          <p className="section-kicker">Избранные проекты</p>
          <h2>Изменения, которые заметны.</h2>
        </div>
        <button className="section-cta section-cta-light" onClick={() => setActiveTab('cases')}>
          <span>Все проекты</span>
          <span className="section-cta-icon">
            <ArrowUpRight />
          </span>
        </button>
      </div>
      <div className="case-grid">
        {cases.map((item, index) => (
          <article className={`case-card ${item.color}`} key={item.id}>
            <div className="case-index">0{index + 1}</div>
            <div className="case-orbit">
              <Blocks size={34} strokeWidth={1.2} />
            </div>
            <div>
              <p>{item.category}</p>
              <h3>{item.title}</h3>
              <div className="case-result">
                <strong>{item.result}</strong>
                <span>{item.resultLabel}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function Cases({ setActiveTab, expanded = false }) {
  return (
    <section className={`cases-section ${expanded ? 'projects-page' : ''}`}>
      {expanded ? (
        <>
          <div className="projects-page-heading">
            <p className="section-kicker">Галерея проектов</p>
            <h1>Продукты, которые работают в реальном бизнесе.</h1>
            <p>Откройте карточку, чтобы посмотреть интерфейсы, описание и детали проекта.</p>
          </div>
          <ProjectGallery />
        </>
      ) : (
        <FeaturedCases setActiveTab={setActiveTab} />
      )}
    </section>
  )
}

export default Cases
