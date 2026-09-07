import { Link, useSearchParams } from 'react-router-dom'
import './InfoCenter.css'

const sections = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'help', label: 'Help Center' },
  { id: 'emergency', label: 'Emergency Resources' },
  { id: 'report', label: 'Report an Issue' },
]

export default function InfoCenter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('section') || 'privacy'

  return (
    <div className="info">
      <div className="info__container">
        <Link to="/" className="info__back">← Back to Home</Link>

        <h1 className="info__title">Support & Legal</h1>

        <div className="info__tabs">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSearchParams({ section: s.id })}
              className={`info__tab ${active === s.id ? 'info__tab--active' : ''}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="info__panel">
          {active === 'privacy' && <PrivacySection />}
          {active === 'terms' && <TermsSection />}
          {active === 'help' && <HelpSection />}
          {active === 'emergency' && <EmergencySection />}
          {active === 'report' && <ReportSection />}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Sections ---------------- */

function PrivacySection() {
  return (
    <div className="info__section">
      <h2 className="info__section-title">Privacy Policy</h2>

      <div className="info__block">
        <h3 className="info__block-title">Information We Collect</h3>
        <p>
          We collect information you provide directly, such as your name,
          email, and any content you share while using CalmCare, in order to
          personalize and improve your experience.
        </p>
      </div>

      <div className="info__block">
        <h3 className="info__block-title">How We Use Your Information</h3>
        <p>
          Your data is used solely to provide, maintain, and improve
          CalmCare's services. We never sell your personal information to
          third parties.
        </p>
      </div>

      <div className="info__block">
        <h3 className="info__block-title">Data Security</h3>
        <p>
          We take reasonable technical and organizational measures to protect
          your information from unauthorized access, alteration, or
          disclosure.
        </p>
      </div>
    </div>
  )
}

function TermsSection() {
  return (
    <div className="info__section">
      <h2 className="info__section-title">Terms of Service</h2>

      <div className="info__block">
        <h3 className="info__block-title">Acceptance of Terms</h3>
        <p>
          By using CalmCare, you agree to be bound by these Terms of Service.
          If you do not agree, please discontinue use of the app.
        </p>
      </div>

      <div className="info__block">
        <h3 className="info__block-title">Use of Service</h3>
        <p>
          CalmCare is intended to support your wellbeing but is not a
          substitute for professional medical advice, diagnosis, or
          treatment.
        </p>
      </div>

      <div className="info__block">
        <h3 className="info__block-title">User Responsibilities</h3>
        <p>
          You agree to use CalmCare respectfully and not to misuse the
          platform in any way that could harm other users or the service.
        </p>
      </div>
    </div>
  )
}

function HelpSection() {
  const faqs = [
    {
      q: 'How does the AI Chat work?',
      a: 'The AI Chat lets you describe your symptoms or health concerns in your own language, and CalmCare responds with guidance and risk insights based on what you share.',
    },
    {
      q: 'What are Health Tools?',
      a: 'Health Tools are a set of features to help you track and understand your health — such as symptom checkers, risk predictors, and other assessment tools available on the platform.',
    },
    {
      q: 'What can I see on my Dashboard?',
      a: 'Your Dashboard gives you an overview of your health activity, past AI Chat interactions, and any insights or recommendations generated for you.',
    },
    {
      q: 'Is CalmCare a replacement for a doctor?',
      a: 'No. CalmCare is designed to support your understanding of your health, not replace professional medical advice, diagnosis, or treatment.',
    },
    {
      q: 'How do I report a problem?',
      a: "Use the 'Report an Issue' tab above to let us know about any bugs or issues you've encountered.",
    },
  ]

  return (
    <div className="info__section">
      <h2 className="info__section-title">Help Center</h2>
      <div className="info__faq-list">
        {faqs.map((item, i) => (
          <details key={i} className="info__faq">
            <summary className="info__faq-q">{item.q}</summary>
            <p className="info__faq-a">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

function EmergencySection() {
  const resources = [
    {
      name: 'Umang Helpline (Pakistan)',
      number: '0311-7786264',
      desc: 'Free mental health support and counseling.',
    },
    {
      name: 'Rozan Helpline',
      number: '0304-111-1741',
      desc: 'Psychosocial support and counseling services.',
    },
    {
      name: 'Emergency Services',
      number: '1122',
      desc: 'For immediate medical or life-threatening emergencies.',
    },
  ]

  return (
    <div className="info__section">
      <h2 className="info__section-title info__section-title--alert">
        Emergency Resources
      </h2>
      <p className="info__section-desc">
        If you are in crisis or need immediate support, please reach out to
        one of the resources below. You are not alone.
      </p>
      <div className="info__resource-list">
        {resources.map((r, i) => (
          <div key={i} className="info__resource">
            <h3 className="info__resource-name">{r.name}</h3>
            <p className="info__resource-desc">{r.desc}</p>
            <a href={`tel:${r.number}`} className="info__resource-number">
              📞 {r.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to your backend / email service / form endpoint
    alert('Thank you! Your report has been received.')
  }

  return (
    <div className="info__section">
      <h2 className="info__section-title">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="info__form">
        <div className="info__field">
          <label className="info__label">Your Email</label>
          <input type="email" required className="info__input" placeholder="you@example.com" />
        </div>
        <div className="info__field">
          <label className="info__label">Describe the Issue</label>
          <textarea required rows={4} className="info__textarea" placeholder="Tell us what went wrong..." />
        </div>
        <button type="submit" className="info__submit">Submit Report</button>
      </form>
    </div>
  )
}