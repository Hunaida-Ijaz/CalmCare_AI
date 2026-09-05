import { Link } from 'react-router-dom'
import { HeartPulse} from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__logo">
            <span className="footer__logo-badge">
              <HeartPulse size={18} />
            </span>
            CalmCare AI
          </div>
          <p className="footer__desc">
            Your AI-powered personal healthcare assistant — predicting risks and helping you understand your health, in your language.
          </p>
          <div className="footer__socials">
            {[FaFacebook, FaInstagram, FaLinkedin, FaXTwitter ].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social media link" className="footer__social-btn">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            <li><Link to="/" className="footer__link">Home</Link></li>
            <li><Link to="/chatbot" className="footer__link">AI Chat</Link></li>
            <li><Link to="/tools" className="footer__link">Health Tools</Link></li>
            <li><Link to="/dashboard" className="footer__link">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Company</h4>
          <ul className="footer__list">
            <li><Link to="/about" className="footer__link">About Us</Link></li>
            <li><Link to="/first-aid" className="footer__link">First Aid</Link></li>
            <li><a href="#" className="footer__link">Privacy Policy</a></li>
            <li><a href="#" className="footer__link">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__list">
            <li><a href="#" className="footer__link">Help Center</a></li>
            <li><a href="#" className="footer__link">Emergency Resources</a></li>
            <li><a href="#" className="footer__link">Report an Issue</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} CalmCare AI. Developed by the CalmCare AI Team. This platform does not replace professional medical advice.
      </div>
    </footer>
  )
}
