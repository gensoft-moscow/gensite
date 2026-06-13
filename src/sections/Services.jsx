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
