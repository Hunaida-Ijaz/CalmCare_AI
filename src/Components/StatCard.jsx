import StatusBadge from './StatusBadge.jsx'
import './StatCard.css'

const COLOR_CLASS = {
  primary: 'stat-card__icon--primary',
  secondary: 'stat-card__icon--secondary',
  accent: 'stat-card__icon--accent',
  success: 'stat-card__icon--success',
  warning: 'stat-card__icon--warning',
  danger: 'stat-card__icon--danger',
}

export default function StatCard({ icon: Icon, label, value, sub, color = 'primary', status }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div className={`stat-card__icon ${COLOR_CLASS[color]}`}>
          <Icon size={18} />
        </div>
        {status && <StatusBadge level={status} compact />}
      </div>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
  )
}
