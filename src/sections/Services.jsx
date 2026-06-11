import { ArrowUpRight, Bot, Code2, Database } from 'lucide-react'

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Цифровые продукты',
    text: 'Проектируем веб-сервисы и мобильные приложения, которыми удобно пользоваться каждый день.',
    tags: ['Product design', 'Web & Mobile'],
  },
  {
    icon: Database,
    number: '02',
    title: 'Бизнес-системы',
    text: 'Автоматизируем процессы и объединяем разрозненные инструменты в прозрачную экосистему.',
    tags: ['ERP / CRM', 'Интеграции'],
  },
  {
    icon: Bot,
    number: '03',
    title: 'AI и аналитика',
    text: 'Встраиваем прикладной ИИ в продукты и превращаем массивы данных в понятные решения.',
    tags: ['AI agents', 'Data platforms'],
  },
]

const processSteps = [
  ['Исследуем', 'Контекст, пользователи, метрики'],
  ['Проектируем', 'Архитектура и интерфейсы'],
  ['Разрабатываем', 'Код, тесты и запуск'],
  ['Развиваем', 'Данные и новые сценарии'],
]

function Services({ setActiveTab, expanded = false }) {
  return (
    <section className={`services-section ${expanded ? 'page-section' : ''}`}>
      <div className="section-heading">
        <div>
          <p className="section-kicker">Что мы делаем</p>
          <h2>
            {expanded
              ? 'Технологии под задачу, а не наоборот.'
              : 'От идеи до работающей системы.'}
          </h2>
        </div>
        {!expanded && (
          <button
            className="round-link"
            onClick={() => setActiveTab('services')}
            aria-label="Все решения"
          >
            <ArrowUpRight />
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
