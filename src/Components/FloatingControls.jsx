import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MessageCircle, ArrowUp } from 'lucide-react'
import './FloatingControls.css'

export default function FloatingControls() {
  const [showTop, setShowTop] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isChatPage = location.pathname === '/chatbot'

  return (
    <div className="floating-controls">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="floating-controls__top-btn animate-fadeInUp"
        >
          <ArrowUp size={18} />
        </button>
      )}
      {!isChatPage && (
        <button
          onClick={() => navigate('/chatbot')}
          aria-label="Open AI health chat"
          className="floating-controls__chat-btn"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  )
}
