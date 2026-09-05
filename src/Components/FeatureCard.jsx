import { ArrowRight } from 'lucide-react'
import './FeatureCard.css'

export default function FeatureCard({ icon: Icon, title, description, bullets = [], onLearnMore }) {
  return (
    <div className="feature-card">
      <div className="feature-card__icon">
        <Icon size={22} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
      {bullets.length > 0 && (
        <ul className="feature-card__bullets">
          {bullets.map((b) => (
            <li key={b} className="feature-card__bullet">
              <span className="feature-card__bullet-dot" /> {b}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onLearnMore} className="feature-card__link">
        Learn More <ArrowRight size={14} />
      </button>
    </div>
  )
}
