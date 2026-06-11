import { Sparkles } from 'lucide-react'

const values = [
  ['01', 'Ясность', 'Говорим о сложном понятно и принимаем решения на основе фактов.'],
  ['02', 'Ответственность', 'Смотрим дальше релиза и отвечаем за то, как решение работает в жизни.'],
  ['03', 'Партнерство', 'Работаем открыто, делимся экспертизой и растем вместе с клиентом.'],
]

function About() {
  return (
    <section className="about-page page-section">
      <p className="eyebrow"><Sparkles size={14} /> Команда GenSoft</p>
      <h1>Инженерная культура с человеческим лицом.</h1>
      <div className="about-layout">
        <div className="about-lead">
          <p>
            Мы собираем команды вокруг бизнес-задачи: аналитики, дизайнеры,
            разработчики и инженеры данных работают как единое целое.
          </p>
        </div>
        <div className="values">
          {values.map(([number, title, text]) => (
            <div className="value-item" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="stats-row">
        <div><strong>12+</strong><span>лет создаем продукты</span></div>
        <div><strong>48</strong><span>специалистов в команде</span></div>
        <div><strong>60+</strong><span>запущенных систем</span></div>
        <div><strong>7</strong><span>лет средний опыт эксперта</span></div>
      </div>
    </section>
  )
}

export default About
