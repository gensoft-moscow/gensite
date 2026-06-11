import { ArrowUpRight, Blocks } from 'lucide-react'
import { cases } from '../data/siteData'

function Cases({ setActiveTab, expanded = false }) {
  return (
    <section className={`cases-section ${expanded ? 'page-section' : ''}`}>
      <div className="section-heading light">
        <div>
          <p className="section-kicker">Избранные проекты</p>
          <h2>
            {expanded
              ? 'Результаты, которые можно посчитать.'
              : 'Изменения, которые заметны.'}
          </h2>
        </div>
        {!expanded && (
          <button className="all-cases" onClick={() => setActiveTab('cases')}>
            Все проекты <ArrowUpRight size={18} />
          </button>
        )}
      </div>
      <div className="case-grid">
        {cases.map((item, index) => (
          <article className={`case-card ${item.color}`} key={item.title}>
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
    </section>
  )
}

export default Cases
