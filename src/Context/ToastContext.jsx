import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'
import './ToastContext.css'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
}

const TYPE_CLASS = {
  success: 'toast--success',
  warning: 'toast--warning',
  info: 'toast--info',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 4000)
  }, [])

  const dismiss = (id) => setToasts((t) => t.filter((toast) => toast.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-stack">
        {toasts.map(({ id, message, type }) => {
          const Icon = ICONS[type]
          return (
            <div key={id} role="status" className={`toast glass animate-fadeInUp ${TYPE_CLASS[type]}`}>
              <Icon size={20} className="toast__icon" />
              <p className="toast__message">{message}</p>
              <button aria-label="Dismiss notification" onClick={() => dismiss(id)} className="toast__dismiss">
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
