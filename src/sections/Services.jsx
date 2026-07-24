import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Blocks,
  Code2,
  Headphones,
  RefreshCw,
  SearchCheck,
  Users,
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Разработка ПО',
    text: 'Создаём программные продукты под конкретные процессы компании: от исследования задачи и прототипа до запуска готовой системы.',
    tags: ['Web', 'Mobile', 'Desktop'],
  },
  {
    icon: Users,
    number: '02',
    title: 'Усиление команды',
    text: 'Подключаем отдельных инженеров или собранную команду, когда проекту нужны дополнительные компетенции и скорость.',
    tags: ['Outstaff', 'Dedicated team'],
  },
  {
    icon: RefreshCw,
    number: '03',
    title: 'Развитие систем',
    text: 'Обновляем устаревшие решения, улучшаем архитектуру и добавляем новые возможности без остановки рабочих процессов.',
    tags: ['Modernization', 'Refactoring'],
  },
  {
    icon: Headphones,
    number: '04',
    title: 'Поддержка',
    text: 'Следим за стабильностью продукта после релиза, устраняем сбои и планомерно развиваем систему вместе с бизнесом.',
    tags: ['SLA', 'Monitoring'],
  },
  {
    icon: SearchCheck,
    number: '05',
    title: 'Тестирование',
    text: 'Проверяем функциональность, нагрузку и безопасность, чтобы пользователи получали предсказуемый и надёжный продукт.',
    tags: ['QA', 'Automation'],
  },
  {
    icon: Blocks,
    number: '06',
    title: 'IT-консалтинг',
    text: 'Помогаем выбрать технологический путь, оценить риски и превратить бизнес-требования в реалистичный план разработки.',
    tags: ['Audit', 'Architecture'],
  },
]

const processSteps = [
  ['Исследуем', 'Контекст, пользователи и ограничения'],
  ['Проектируем', 'Архитектура, сценарии и интерфейсы'],
  ['Разрабатываем', 'Код, тесты и запуск продукта'],
  ['Развиваем', 'Метрики, поддержка и новые функции'],
]

function ServiceStack() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [exitDirection, setExitDirection] = useState(null)
  const [isReturning, setIsReturning] = useState(false)
  const stackRef = useRef(null)
  const startYRef = useRef(0)
  const dragOffsetRef = useRef(0)
  const draggingRef = useRef(false)

  const orderedServices = services.slice(activeIndex)
  const canAdvance = activeIndex < services.length - 1
  const canReturn = activeIndex > 0
  const isLeaving = exitDirection !== null
  const isAnimating = isLeaving || isReturning

  const finishSwipeUp = useCallback(() => {
    if (!canAdvance) return

    setExitDirection('up')
    setDragOffset(0)
  }, [canAdvance])

  const finishSwipeDown = useCallback(() => {
    if (!canReturn) return

    setIsReturning(true)
    setActiveIndex((index) => Math.max(index - 1, 0))
    setDragOffset(0)
  }, [canReturn])

  const resetSwipe = useCallback(() => {
    draggingRef.current = false
    dragOffsetRef.current = 0
    setDragOffset(0)
  }, [])

  const updateDragOffset = useCallback((offset) => {
    dragOffsetRef.current = offset
    setDragOffset(offset)
  }, [])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return undefined

    const handleTouchStart = (event) => {
      if (isLeaving || (!canAdvance && !canReturn)) return
      if (!event.target.closest('.service-stack-card.is-active')) return

      draggingRef.current = true
      startYRef.current = event.touches[0].clientY
    }

    const handleTouchMove = (event) => {
      if (isAnimating) {
        event.preventDefault()
        return
      }

      if (!draggingRef.current || isLeaving) return

      const offset = event.touches[0].clientY - startYRef.current
      const isActionableSwipe = (offset < 0 && canAdvance) || (offset > 0 && canReturn)

      if (!isActionableSwipe) {
        resetSwipe()
        return
      }

      event.preventDefault()
      updateDragOffset(Math.min(110, Math.max(offset, -150)))
    }

    const handleTouchEnd = () => {
      if (!draggingRef.current || isLeaving) return

      const offset = dragOffsetRef.current
      if (offset < -72) {
        finishSwipeUp()
        return
      }

      if (offset > 72) {
        finishSwipeDown()
        return
      }

      resetSwipe()
    }

    stack.addEventListener('touchstart', handleTouchStart, { passive: true })
    stack.addEventListener('touchmove', handleTouchMove, { passive: false })
    stack.addEventListener('touchend', handleTouchEnd)
    stack.addEventListener('touchcancel', resetSwipe)

    return () => {
      stack.removeEventListener('touchstart', handleTouchStart)
      stack.removeEventListener('touchmove', handleTouchMove)
      stack.removeEventListener('touchend', handleTouchEnd)
      stack.removeEventListener('touchcancel', resetSwipe)
    }
  }, [activeIndex, canAdvance, canReturn, finishSwipeDown, finishSwipeUp, isAnimating, isLeaving, resetSwipe, updateDragOffset])

  const handleTransitionEnd = (event) => {
    if (!isLeaving || event.target !== event.currentTarget) return
    if (event.propertyName !== 'transform') return

    setActiveIndex((index) => Math.min(index + 1, services.length - 1))
    setExitDirection(null)
    resetSwipe()
  }

  const handleAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return
    setIsReturning(false)
    resetSwipe()
  }

  return (
    <div className={`service-stack ${isAnimating ? 'is-animating' : ''}`} aria-label="Услуги" ref={stackRef}>
      {orderedServices.map((service, stackIndex) => {
        const ServiceIcon = service.icon
        const isActive = stackIndex === 0

        return (
          <article
            className={`service-stack-card ${isActive ? 'is-active' : ''} ${isActive && !canAdvance ? 'is-terminal' : ''} ${isActive && isReturning ? 'is-entering-down' : ''} ${isActive && isLeaving ? `is-leaving-${exitDirection}` : ''}`}
            key={service.number}
            onAnimationEnd={isActive ? handleAnimationEnd : undefined}
            onTransitionEnd={isActive ? handleTransitionEnd : undefined}
            style={{
              '--stack-index': stackIndex,
              '--stack-depth': stackIndex,
              '--stack-offset': `${stackIndex * 24}px`,
              '--stack-scale': Math.max(0.84, 1 - stackIndex * 0.032).toFixed(3),
              zIndex: orderedServices.length - stackIndex,
              transform: isActive && dragOffset
                ? `translate3d(0, ${dragOffset}px, 0) rotate(${dragOffset * 0.018}deg)`
                : undefined,
            }}
          >
            <div className="service-card-top">
              <span>{service.number}</span>
              <ServiceIcon size={26} strokeWidth={1.5} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className="tag-list">
              {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function Services({ setActiveTab, expanded = false }) {
  return (
    <section className={`services-section ${expanded ? 'page-section' : ''}`}>
      <div className="section-heading has-cta">
        <div>
          <p className="section-kicker">Наши услуги</p>
          <h2>
            {expanded
              ? 'Берём на себя разработку и развитие цифровых продуктов.'
              : 'Подключаемся там, где технологии должны приносить результат.'}
          </h2>
        </div>
        {!expanded && (
          <button
            className="section-cta"
            onClick={() => setActiveTab('services')}
            aria-label="Все услуги"
          >
            <span>Все услуги</span>
            <span className="section-cta-icon">
              <ArrowUpRight />
            </span>
          </button>
        )}
      </div>
      <div className="service-grid">
        {services.map((service) => {
          const ServiceIcon = service.icon

          return (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <ServiceIcon size={26} strokeWidth={1.5} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="tag-list">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          )
        })}
      </div>
      <ServiceStack />
      {expanded && (
        <div className="process-row">
          {processSteps.map(([title, text], index) => (
            <div className="process-step" key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Services
