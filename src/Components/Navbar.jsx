import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun, HeartPulse } from 'lucide-react'
import { useTheme } from '../Context/ThemeContext.jsx'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/chatbot', label: 'AI Chat' },
  { to: '/tools', label: 'Health Tools' },
  { to: '/wellness', label: 'Wellness' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/first-aid', label: 'First Aid' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled glass' : 'navbar--top'}`}>
      <nav className="navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <span className="navbar__logo-badge">
            <HeartPulse size={18} />
          </span>
          CalmCare <span className="navbar__logo-accent">AI</span>
        </NavLink>

        <div className="navbar__links navbar__links--desktop">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar__actions navbar__actions--desktop">
          <button onClick={toggle} aria-label="Toggle dark mode" className="navbar__theme-btn">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NavLink to="/chatbot" className="navbar__cta">
            Get Started
          </NavLink>
        </div>

        <button
          className="navbar__menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="navbar__mobile glass">
          <div className="navbar__mobile-links">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <button onClick={toggle} className="navbar__mobile-link navbar__mobile-theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />} Toggle theme
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
