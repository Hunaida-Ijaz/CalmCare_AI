import { useState } from 'react'
import { Send, HeartPulse, User, AlertTriangle, Sparkles, HelpCircle, PhoneCall } from 'lucide-react'
import { getAIReply, SUGGESTED_PROMPTS } from '../utils/aiEngine.js'
import { useToast } from '../Context/ToastContext.jsx'
import StatusBadge from '../Components/StatusBadge.jsx'
import Disclaimer from '../Components/Disclaimer.jsx'
import './Chatbot.css'

const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'ai',
  text: "Hi, I'm your CalmCare AI assistant. Tell me what's going on and I'll help you understand it — I can also point you toward the right kind of specialist to see.",
}

export default function Chatbot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const { showToast } = useToast()

  
  async function sendMessage(text) {
  const trimmed = text.trim()
  if (!trimmed) return

  const userMsg = {
    id: Date.now(),
    role: 'user',
    text: trimmed,
  }

  setMessages((m) => [...m, userMsg])
  setInput('')
  setTyping(true)

  try {
    const history = messages
      .filter((m) => m.role === 'user' || m.role === 'ai')
      .map((m) => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text,
      }))

    const reply = await getAIReply(trimmed, history)

    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      text: reply.message,
      variant: reply.type,
      specialty: reply.specialty,
      reason: reply.reason,
    }

    setMessages((m) => [...m, aiMsg])

    if (reply.type === 'emergency') {
      showToast(
        'Emergency symptoms detected — please seek immediate medical help.',
        'warning'
      )
    }
  } catch (error) {
    console.error('AI error:', error)
    showToast('Unable to connect to AI service.', 'warning')
  } finally {
    setTyping(false)
  }
}

  return (
    <div className="chatbot-page">
      <div className="chatbot-page__intro">
        <span className="chatbot-page__badge">
          <Sparkles size={14} /> AI Health Chat
        </span>
        <h1 className="chatbot-page__title">Talk through your symptoms</h1>
        <p className="chatbot-page__subtitle">
          This assistant offers general guidance, not a diagnosis. For emergencies, contact your local emergency number immediately.
        </p>
      </div>

      <div className="chat-window">
        {/* Messages */}
        <div className="chat-window__messages">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          {typing && (
            <div className="chat-typing">
              <Avatar role="ai" />
              <div className="chat-typing__bubble">
                <span className="chat-typing__dot chat-typing__dot--1" />
                <span className="chat-typing__dot chat-typing__dot--2" />
                <span className="chat-typing__dot chat-typing__dot--3" />
              </div>
            </div>
          )}
      
        </div>

        {/* Suggested prompts */}
        <div className="chat-window__prompts">
          {SUGGESTED_PROMPTS.map((p) => (
            <button key={p} onClick={() => sendMessage(p)} className="chat-prompt">
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(input)
          }}
          className="chat-window__form"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe how you're feeling..."
            aria-label="Message"
            className="chat-window__input"
          />
          <button type="submit" aria-label="Send message" className="chat-window__send">
            <Send size={18} />
          </button>
        </form>
      </div>

      <Disclaimer />
    </div>
  )
}

function Avatar({ role }) {
  return (
    <div className={`chat-avatar ${role === 'ai' ? 'chat-avatar--ai' : 'chat-avatar--user'}`}>
      {role === 'ai' ? <HeartPulse size={14} /> : <User size={14} />}
    </div>
  )
}

const VARIANT_STATUS = {
  emergency: 'red',
  specialist: 'orange',
  info: 'green',
}

function whyExplanation(message) {
  if (message.variant === 'emergency' && message.reason) {
    return `You mentioned "${message.reason}" — that's one of the phrases CalmCare treats as a possible emergency signal, so it skipped general advice and flagged this for immediate care instead.`
  }
  if (message.variant === 'specialist' && message.reason) {
    return `You mentioned "${message.reason}", which is commonly related to ${message.specialty} care — that's why this specialist type was suggested. What you can do: if it persists or worsens, consider booking a consultation with a ${message.specialty}.`
  }
  return null
}

function ChatBubble({ message }) {
  const [showWhy, setShowWhy] = useState(false)
  const isUser = message.role === 'user'
  const isEmergency = message.variant === 'emergency'
  const statusLevel = !isUser && message.variant ? VARIANT_STATUS[message.variant] : null
  const explanation = !isUser ? whyExplanation(message) : null

  return (
    <div className={`chat-row ${isUser ? 'chat-row--user' : ''}`}>
      <Avatar role={message.role} />
      <div className="chat-row__content">
        <div
          className={`chat-bubble ${
            isUser ? 'chat-bubble--user' : isEmergency ? 'chat-bubble--emergency' : 'chat-bubble--ai'
          }`}
        >
          {isEmergency && (
            <div className="chat-bubble__emergency-label">
              <AlertTriangle size={14} /> Possible emergency
            </div>
          )}
          {!isEmergency && statusLevel && (
            <div className="chat-bubble__status">
              <StatusBadge level={statusLevel} />
            </div>
          )}
          {message.text}
        </div>
        {isEmergency && (
          <a href="tel:1122" className="chat-bubble__call-emergency">
            <PhoneCall size={14} /> Call 1122 now
          </a>
        )}
        {explanation && (
          <div className="chat-bubble__why">
            <button
              type="button"
              onClick={() => setShowWhy((v) => !v)}
              className="chat-bubble__why-toggle"
            >
              <HelpCircle size={14} /> {showWhy ? 'Hide why' : 'Why?'}
            </button>
            {showWhy && <p className="chat-bubble__why-text">{explanation}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
