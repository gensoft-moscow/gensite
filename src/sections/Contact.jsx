import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

const contacts = [
  {
    icon: Mail,
    label: 'Электронная почта',
    value: 'info@gensoft.ru',
    href: 'mailto:info@gensoft.ru',
  },
  {
    icon: Phone,
    label: 'Телефон',
    value: '+7 (916) 699-33-67',
    href: 'tel:+79166993367',
  },
  {
    icon: MapPin,
    label: 'Офис',
    value: 'Москва, Локомотивный проезд, 21, стр. 5',
    href: 'https://yandex.ru/maps/?text=Москва%2C%20Локомотивный%20проезд%2C%2021%2C%20стр.%205',
  },
]

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-heading">
        <p className="section-kicker">Контакты</p>
        <h2>Расскажите о задаче.<br />Мы предложим следующий шаг.</h2>
        <p>
          Обсудим продукт, разберём вводные и подскажем,
          с чего разумнее начать работу.
        </p>
      </div>
      <div className="contact-list">
        {contacts.map((contact) => {
          const ContactIcon = contact.icon

          return (
            <a
              href={contact.href}
              className="contact-item"
              key={contact.label}
              target={contact.label === 'Офис' ? '_blank' : undefined}
              rel={contact.label === 'Офис' ? 'noreferrer' : undefined}
            >
              <div className="contact-item-heading">
                <ContactIcon size={18} />
                <small>{contact.label}</small>
              </div>
              <strong>{contact.value}</strong>
              <ArrowUpRight className="contact-item-arrow" size={20} />
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Contact
