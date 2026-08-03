import { Sparkles } from 'lucide-react'
import { companyDetails } from '../data/companyDetails'

const statements = [
  ['01', 'Делаем сложное управляемым', 'Разбираем задачу до сути, проектируем понятную архитектуру и не прячем риски за красивыми словами.'],
  ['02', 'Работаем как часть команды', 'Встраиваемся в процессы клиента, держим короткую связь и сохраняем фокус на результате, а не на формальной сдаче этапов.'],
  ['03', 'Отвечаем за живой продукт', 'Думаем о поддержке, развитии и реальной эксплуатации ещё до первого релиза.'],
]

const stats = [
  ['7', 'человек в штате'],
  ['3-5', 'лет опыт сотрудников'],
  ['15', 'крупных проектов запущено сотрудниками'],
]

function updateValueTilts(event) {
  const cards = event.currentTarget.querySelectorAll('.value-item')

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = event.clientX - centerX
    const distanceY = event.clientY - centerY
    const distance = Math.hypot(distanceX, distanceY)
    const influence = Math.max(0, 1 - distance / 520)
    const tiltY = Math.max(-7, Math.min(7, (distanceX / rect.width) * 12 * influence))
    const tiltX = Math.max(-6, Math.min(6, (distanceY / rect.height) * -10 * influence))

    card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
    card.style.setProperty('--tilt-lift', influence > 0 ? `${(influence * -6).toFixed(2)}px` : '0px')
  })
}

function resetValueTilts(event) {
  event.currentTarget.querySelectorAll('.value-item').forEach((card) => {
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
    card.style.setProperty('--tilt-lift', '0px')
  })
}

function About() {
  return (
    <section className="about-page page-section">
      <p className="eyebrow"><Sparkles size={14} /> Команда GenSoft</p>
      <h1 className="about-title">
        <span className="about-title-line">Команда, которая</span>
        <span className="about-title-line about-title-indent">
          <em>превращает</em> <span className="about-title-accent">сложные задачи</span>
        </span>
        <span className="about-title-line about-title-underline">в работающие цифровые продукты.</span>
      </h1>
      <div className="about-layout">
        <div className="about-lead">
          <p>
            Мы не продаём абстрактную разработку. Мы вникаем в бизнес-контекст,
            собираем понятный план и доводим решения до состояния, в котором ими
            удобно пользоваться каждый день.
          </p>
        </div>
        <div className="values" onMouseMove={updateValueTilts} onMouseLeave={resetValueTilts}>
          {statements.map(([number, title, text]) => (
            <div className="value-item" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="stats-row">
        {stats.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </div>
      <div className="about-legal">
        <div className="about-legal-heading">
          <p className="section-kicker">Организация</p>
          <h2>Реквизиты и документы</h2>
        </div>
        <dl className="about-details-list">
          {companyDetails.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
        <div className="documents-panel">
          <span>Документы</span>
          <p>Документы будут добавлены после публикации.</p>
        </div>
      </div>
    </section>
  )
}

export default About
