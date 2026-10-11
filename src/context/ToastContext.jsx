import { useState, useCallback } from 'react'
import { ToastContext } from './toastContextInstance'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl cursor-pointer animate-slide-up max-w-sm
              ${toast.type === 'success' ? 'bg-gray-900 text-white' : ''}
              ${toast.type === 'error'   ? 'bg-red-500 text-white' : ''}
              ${toast.type === 'info'    ? 'bg-brand-600 text-white' : ''}
              ${toast.type === 'warning' ? 'bg-amber-500 text-white' : ''}
            `}
          >
            <span className="text-xl">
              {toast.type === 'success' && '✓'}
              {toast.type === 'error'   && '✕'}
              {toast.type === 'info'    && 'ℹ'}
              {toast.type === 'warning' && '⚠'}
            </span>
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
