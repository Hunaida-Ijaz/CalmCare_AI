import { getStatus } from '../utils/trafficLight.js'
import './StatusBadge.css'

// Small colored pill: 🟢🟡🟠🔴 + label.
// Pass either a `level` ('green' | 'yellow' | 'orange' | 'red') or a
// pre-resolved status object with { emoji, label, order }.
export default function StatusBadge({ level, label, compact = false }) {
  const status = getStatus(level)
  const text = label || status.label

  return (
    <span className={`status-badge status-badge--${level} ${compact ? 'status-badge--compact' : ''}`}>
      <span aria-hidden="true">{status.emoji}</span>
      {!compact && <span>{text}</span>}
    </span>
  )
}
