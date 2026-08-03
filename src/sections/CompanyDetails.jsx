import { companyDetails } from '../data/companyDetails'

function CompanyDetails() {
  return (
    <section className="details-section">
      <div className="details-heading">
        <p className="section-kicker">Реквизиты организации</p>
        <h2>Открыто говорим,<br />с кем вы работаете.</h2>
      </div>
      <dl className="details-list">
        {companyDetails.map(([term, description]) => (
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
