const technologyGroups = [
  {
    number: '01',
    title: 'Языки программирования',
    items: ['Java', 'C#', 'C++', 'Python', 'Node.js', 'JavaScript', 'TypeScript', 'PHP', 'Go'],
  },
  {
    number: '02',
    title: 'Backend и базы данных',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Oracle', 'Elasticsearch'],
  },
  {
    number: '03',
    title: 'DevOps и инфраструктура',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Linux', 'Ansible'],
  },
  {
    number: '04',
    title: 'Специализации',
    items: ['Системный анализ', 'Бизнес-анализ', 'Data Science', 'Product Management', 'UI/UX Design', 'QA и тестирование'],
  },
]

function Technologies() {
  return (
    <section className="technologies-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Используемые технологии</p>
          <h2>Подбираем стек под продукт, команду и будущую нагрузку.</h2>
        </div>
        <p className="technologies-intro">
          Не привязываем задачу к одному инструменту. Выбираем зрелые технологии,
          которые удобно поддерживать и развивать.
        </p>
      </div>
      <div className="technology-grid">
        {technologyGroups.map((group) => (
          <article className="technology-card" key={group.number}>
            <span>{group.number}</span>
            <h3>{group.title}</h3>
            <div>
              {group.items.map((item) => <p key={item}>{item}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Technologies
