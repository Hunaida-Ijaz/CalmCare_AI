import { useNavigate } from 'react-router-dom'
import {
  MessageSquareText, Stethoscope, GlassWater, Flame,
  BedDouble, Pill, Salad, Brain, LayoutDashboard, HeartPulse,
  Activity, ShieldCheck, ArrowRight,
} from 'lucide-react'
import FeatureCard from '../Components/FeatureCard.jsx'
import './Home.css'

const FEATURES = [
  {
    icon: MessageSquareText,
    title: 'AI Health Chatbot',
    description: 'Smart medical conversations that understand your symptoms in plain language.',
    bullets: ['Emergency symptom detection', 'Specialist recommendations'],
    to: '/chatbot',
  },
  {
    icon: GlassWater,
    title: 'Water Intake Calculator',
    description: 'Get a daily hydration target based on your age, weight, and activity level.',
    to: '/tools?tab=water',
  },
  {
    icon: Flame,
    title: 'Calorie Calculator',
    description: 'Know your maintenance, weight-loss, and weight-gain calorie targets.',
    to: '/tools?tab=calorie',
  },
  {
    icon: BedDouble,
    title: 'Sleep Analyzer',
    description: 'Track sleep duration and quality with suggestions to sleep better.',
    to: '/tools?tab=sleep',
  },
  {
    icon: Pill,
    title: 'Medicine Information',
    description: 'Search common medicines for uses, dosage, side effects, and precautions.',
    to: '/tools?tab=medicine',
  },
  {
    icon: Salad,
    title: 'Personalized Diet Tips',
    description: 'Diet plans generated from your age, weight, goals, and health conditions.',
    to: '/tools?tab=diet',
  },
  {
    icon: Brain,
    title: 'Mental Wellness Check',
    description: 'A gentle self check-in for mood, stress, sleep, and anxiety.',
    to: '/wellness',
  },
  {
    icon: LayoutDashboard,
    title: 'Health Dashboard',
    description: 'All your health stats and trends in one beautifully visualized place.',
    to: '/dashboard',
  },
]

const STATS = [
  { label: 'Symptom checks / month', value: '18k' },
  { label: 'User satisfaction', value: '4.8★' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__inner">
          <div className="hero__content animate-fadeInUp">
            <span className="hero__badge">
              <ShieldCheck size={14} /> Secure · Private · AI-Powered
            </span>
            <h1 className="hero__title">
              Your AI-Powered <span className="hero__title-accent">Personal Healthcare</span> Assistant
            </h1>
            <p className="hero__subtitle">
              Predict health risks, understand medical reports, receive personalized recommendations, and connect with healthcare professionals — all in one secure platform.
            </p>
            <div className="hero__buttons">
              <button onClick={() => navigate('/dashboard')} className="home-btn home-btn--primary">
                Get Started
              </button>
              <button onClick={() => navigate('/chatbot')} className="home-btn home-btn--secondary">
                Try AI Chat
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="home-btn home-btn--ghost"
              >
                Explore Features <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero__stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="hero__stat-value">{s.value}</div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="hero__illustration animate-fadeInUp hero__illustration--delay">
            <div className="hero__illustration-frame">
              <div className="hero__illustration-glow" />
              <div className="hero__illustration-card glass">
                <div className="hero__illustration-top">
                  <div className="hero__illustration-assistant">
                    <span className="hero__illustration-avatar">
                      <HeartPulse size={16} className="animate-heartbeat" />
                    </span>
                    AI Assistant
                  </div>
                  <span className="hero__illustration-status">Online</span>
                </div>

                <div className="hero__chat-bubbles">
                  <div className="hero__bubble hero__bubble--ai">How are you feeling today?</div>
                  <div className="hero__bubble hero__bubble--user">I've had a mild headache since morning.</div>
                  <div className="hero__bubble hero__bubble--ai">Got it — let's check a few things and see if you need to see a specialist.</div>
                </div>

                <div className="hero__mini-cards">
                  <div className="hero__mini-card animate-float">
                    <Activity size={16} className="hero__mini-icon hero__mini-icon--secondary" />
                    <div className="hero__mini-label">Heart Rate</div>
                    <div className="hero__mini-value">72 bpm</div>
                  </div>
                  <div className="hero__mini-card animate-float-delay">
                    <Stethoscope size={16} className="hero__mini-icon hero__mini-icon--accent" />
                    <div className="hero__mini-label">Next Step</div>
                    <div className="hero__mini-value">See GP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="features__intro">
          <span className="features__eyebrow">Everything in one place</span>
          <h2 className="features__heading">Features built for real healthcare needs</h2>
          <p className="features__desc">
            From symptom checks to appointment booking, CalmCare AI brings modern healthcare tools together in one calm, trustworthy space.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} onLearnMore={() => navigate(f.to)} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-section">
        <div className="cta-banner">
          <h2 className="cta-banner__title">Ready to take charge of your health?</h2>
          <p className="cta-banner__desc">
            Start a conversation with our AI assistant, or explore your personal health dashboard in seconds.
          </p>
          <div className="cta-banner__buttons">
            <button onClick={() => navigate('/chatbot')} className="home-btn home-btn--white">
              Try AI Chat
            </button>
            <button onClick={() => navigate('/dashboard')} className="home-btn home-btn--outline-white">
              View Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
