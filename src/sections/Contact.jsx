import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

const contacts = [
  {
    icon: Mail,
    label: 'Электронная почта',
    value: 'info@softgen.ru',
    href: 'mailto:info@softgen.ru',
  },
  {
    icon: Phone,
    label: 'Телефон',
    value: '+7 (499) 490-22-90',
    href: 'tel:+74994902290',
  },
  {
    icon: MapPin,
    label: 'Офис',
    value: 'Нижний Новгород, проспект Ленина, 11',
    href: 'https://yandex.ru/maps/?text=Нижний%20Новгород%2C%20проспект%20Ленина%2C%2011',
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
