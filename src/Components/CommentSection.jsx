import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { useToast } from '../Context/ToastContext.jsx'
import './CommentSection.css'

const STORAGE_KEY = 'calmcare_comments'

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export default function CommentSection() {
  const [comments, setComments] = useState(loadComments)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { showToast } = useToast()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const next = [
      { id: Date.now(), name: name.trim(), message: message.trim(), date: new Date().toLocaleDateString() },
      ...comments,
    ]
    setComments(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setName('')
    setMessage('')
    showToast('Thanks for your comment!', 'success')
  }

  return (
    <div className="comment-section">
      <h3 className="comment-section__title">
        <MessageCircle size={18} /> Leave a comment
      </h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="comment-form__input"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share feedback or a question..."
          rows={3}
          required
          className="comment-form__input comment-form__textarea"
        />
        <button type="submit" className="comment-form__submit">
          <Send size={14} /> Post Comment
        </button>
      </form>

      {comments.length > 0 && (
        <div className="comment-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <div className="comment-item__header">
                <span className="comment-item__name">{c.name}</span>
                <span className="comment-item__date">{c.date}</span>
              </div>
              <p className="comment-item__message">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
