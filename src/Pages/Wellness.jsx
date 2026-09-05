import { useState } from 'react'
import { Smile, Frown, Moon, AlertTriangle, Sparkles, Phone } from 'lucide-react'
import './Wellness.css'

const SLIDERS = [
  { key: 'mood', label: 'Mood', icon: Smile, lowLabel: 'Low', highLabel: 'Great' },
  { key: 'stress', label: 'Stress', icon: AlertTriangle, lowLabel: 'Calm', highLabel: 'Overwhelmed' },
  { key: 'sleep', label: 'Sleep Quality', icon: Moon, lowLabel: 'Poor', highLabel: 'Excellent' },
  { key: 'anxiety', label: 'Anxiety', icon: Frown, lowLabel: 'None', highLabel: 'Severe' },
]

export default function Wellness() {
  const [values, setValues] = useState({ mood: 5, stress: 5, sleep: 5, anxiety: 5 })
  const [showResults, setShowResults] = useState(false)

  const isSevere = values.stress >= 8 || values.anxiety >= 8 || (values.mood <= 2 && values.stress >= 7)

  function insights() {
    const list = []
    if (values.mood <= 4) list.push('Your mood check-in suggests things feel heavy right now — that\'s worth being gentle with yourself about.')
    if (values.mood >= 7) list.push('Your mood looks bright today — a great time to lock in habits that support it.')
    if (values.stress >= 7) list.push('Stress is running high. Short breathing breaks or a walk can help bring your nervous system down a notch.')
    if (values.sleep <= 4) list.push('Sleep quality seems low — a consistent wind-down routine before bed can make a real difference.')
    if (values.anxiety >= 7) list.push('Anxiety levels are elevated. Grounding techniques, like naming 5 things you can see, can help in the moment.')
    if (list.length === 0) list.push('Your check-in looks balanced today — keep doing what\'s working for you.')
    return list
  }

  return (
    <div className="wellness-page">
      <div className="wellness-page__intro">
        <span className="wellness-page__badge">
          <Sparkles size={14} /> A gentle self check-in
        </span>
        <h1 className="wellness-page__title">Mental Wellness Check</h1>
        <p className="wellness-page__desc">
          This isn't a diagnosis — just a quick reflection to help you notice patterns and take small, supportive steps.
        </p>
      </div>

      <div className="wellness-panel">
        {SLIDERS.map((s) => (
          <div key={s.key} className="wellness-slider">
            <div className="wellness-slider__header">
              <span className="wellness-slider__label">
                <s.icon size={16} className="wellness-slider__icon" /> {s.label}
              </span>
              <span className="wellness-slider__value">{values[s.key]}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values[s.key]}
              onChange={(e) => setValues((v) => ({ ...v, [s.key]: +e.target.value }))}
              className="wellness-slider__range"
              aria-label={s.label}
            />
            <div className="wellness-slider__scale">
              <span>{s.lowLabel}</span>
              <span>{s.highLabel}</span>
            </div>
          </div>
        ))}

        <button onClick={() => setShowResults(true)} className="wellness-submit">
          See My Insights
        </button>
      </div>

      {showResults && (
        <div className="wellness-results animate-fadeInUp">
          {isSevere && (
            <div className="wellness-alert">
              <Phone className="wellness-alert__icon" size={22} />
              <div>
                <h3 className="wellness-alert__title">You don't have to manage this alone</h3>
                <p className="wellness-alert__text">
                  Your responses suggest things feel quite heavy right now. Please consider reaching out to a mental health professional or a trusted person soon.
                </p>
                <p className="wellness-alert__text">
                  In Pakistan, you can contact the <strong>Umang Helpline: 0311-7786264</strong> for free, confidential mental health support.
                </p>
              </div>
            </div>
          )}

          <div className="wellness-insights">
            <h3 className="wellness-insights__title">Your gentle insights</h3>
            <ul className="wellness-insights__list">
              {insights().map((i, idx) => (
                <li key={idx} className="wellness-insights__item">
                  <span className="wellness-insights__bullet">•</span> {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="wellness-tips">
            <div className="wellness-tip wellness-tip--primary">
              <h4 className="wellness-tip__title wellness-tip__title--primary">Relaxation suggestion</h4>
              <p className="wellness-tip__text">
                Try a 4-7-8 breathing cycle: inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times.
              </p>
            </div>
            <div className="wellness-tip wellness-tip--secondary">
              <h4 className="wellness-tip__title wellness-tip__title--secondary">Meditation tip</h4>
              <p className="wellness-tip__text">
                Spend 5 minutes focusing only on your breath. Every time your mind wanders, gently bring it back — no judgment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
