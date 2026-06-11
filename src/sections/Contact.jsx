import { ArrowUpRight, Check } from 'lucide-react'

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="section-kicker">Есть задача?</p>
        <h2>Давайте обсудим,<br />что можно сделать.</h2>
      </div>
      <a href="mailto:hello@gensoft.ru" className="contact-email">
        hello@gensoft.ru
        <ArrowUpRight />
      </a>
      <div className="contact-note">
        <Check size={16} />
        Ответим в течение рабочего дня
      </div>
    </section>
  )
}

export default Contact
