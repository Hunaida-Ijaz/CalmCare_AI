import { ShieldCheck, Target, Eye, Lock, Cpu, HeartHandshake, Phone } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import CommentSection from '../Components/CommentSection.jsx'
import './About.css'

const VALUES = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make reliable health guidance accessible to everyone in Pakistan, in plain language, at any hour of the day.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'A future where AI and human doctors work together — AI handles the first, clarifying conversation, and doctors handle the care that follows.',
  },
  {
    icon: Cpu,
    title: 'Why AI Healthcare',
    text: 'AI can\'t replace a doctor, but it can help you understand symptoms, prepare better questions, and find the right specialist faster.',
  },
  {
    icon: Lock,
    title: 'Privacy by Design',
    text: 'Your conversations and reports are treated as sensitive health data — encrypted, never sold, and never shared without your consent.',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    text: 'We use industry-standard authentication and encryption, and continuously review our systems for vulnerabilities.',
  },
  {
    icon: HeartHandshake,
    title: 'Accuracy & Honesty',
    text: 'When our AI isn\'t confident, it says so — and points you toward a real doctor rather than guessing.',
  },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="about-page__intro">
        <span className="about-page__eyebrow">About Us</span>
        <h1 className="about-page__title">Healthcare that respects your time and trust</h1>
        <p className="about-page__desc">
          CalmCare AI was built to bridge the gap between confusing medical information and the care people actually need — clearly, safely, and without judgement.
        </p>
      </div>

      <div className="about-grid">
        {VALUES.map((v) => (
          <div key={v.title} className="about-card">
            <div className="about-card__icon">
              <v.icon size={20} />
            </div>
            <h3 className="about-card__title">{v.title}</h3>
            <p className="about-card__text">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="about-banner">
        <h2 className="about-banner__title">AI-Powered Healthcare, Made Simple for Everyone.</h2>
        <p className="about-banner__desc">
          CalmCare AI combines a Claude-powered assistant with a local fallback engine, so the experience stays reliable even offline or when the API is unreachable.
        </p>
      </div>

      <div className="about-contact">
        <div className="about-contact__info">
          <span className="about-page__eyebrow">Get in Touch</span>
          <h2 className="about-contact__title">Questions or feedback?</h2>
          <p className="about-contact__desc">
            Reach out directly, or leave a comment below — I'd love to hear from you.
          </p>
          <div className="about-contact__links">
            <a
              href="https://www.linkedin.com/in/hunaida-ijaz"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact__link"
            >
              <FaLinkedin size={16} /> linkedin.com/in/hunaida-ijaz
            </a>
            <a href="tel:+923707654321" className="about-contact__link">
              <Phone size={16} /> +92 370 7654321
            </a>
          </div>
        </div>

        <CommentSection />
      </div>
    </div>
  )
}
