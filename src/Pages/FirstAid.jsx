import { useState } from 'react'
import { Sparkles, Search, HeartPulse } from 'lucide-react'
import { FIRST_AID_TOPICS } from '../data/firstAid.js'
import './FirstAid.css'

export default function FirstAid() {
  const [query, setQuery] = useState('')
  const filtered = FIRST_AID_TOPICS.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="first-aid-page">
      <div className="first-aid-page__intro">
        <span className="first-aid-page__badge">
          <Sparkles size={14} /> Quick reference
        </span>
        <h1 className="first-aid-page__title">First Aid Guide</h1>
        <p className="first-aid-page__desc">
          Step-by-step basics for common emergencies — for immediate, practical help while
          you get proper medical care.
        </p>
      </div>

      <a href="tel:1122" className="first-aid-emergency-banner">
        <HeartPulse size={18} />
        In a real emergency, call <strong>1122</strong> first — these steps support that call, they don't replace it.
      </a>

      <div className="first-aid-search">
        <Search size={16} className="first-aid-search__icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search, e.g. burns, choking, CPR..."
          aria-label="Search first aid topics"
          className="first-aid-search__input"
        />
      </div>

      {query && filtered.length === 0 && (
        <p className="first-aid-empty">No matching topic found.</p>
      )}

      <div className="first-aid-grid">
        {filtered.map((topic) => (
          <div key={topic.title} className="first-aid-card">
            <div className="first-aid-card__icon">
              <topic.icon size={20} />
            </div>
            <h3 className="first-aid-card__title">{topic.title}</h3>
            <ol className="first-aid-card__steps">
              {topic.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
