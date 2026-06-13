const details = [
  ['Полное наименование', 'Общество с ограниченной ответственностью «СОФТГЕН»'],
  ['Сокращённое наименование', 'ООО «СОФТГЕН»'],
  ['ИНН / КПП', '5258140478 / 525801001'],
  ['ОГРН', '1185275032270'],
  ['Юридический адрес', '603140, Нижегородская обл., г. Нижний Новгород, пр-т Ленина, д. 11, помещ. П5, офис 2'],
]

function CompanyDetails() {
  return (
    <section className="details-section">
      <div className="details-heading">
        <p className="section-kicker">Реквизиты организации</p>
        <h2>Открыто говорим,<br />с кем вы работаете.</h2>
      </div>
      <dl className="details-list">
        {details.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default CompanyDetails
