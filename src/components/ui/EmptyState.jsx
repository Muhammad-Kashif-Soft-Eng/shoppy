import { Link } from 'react-router-dom'

export default function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {icon && (
        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center text-4xl mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 max-w-sm mb-8">{description}</p>}
      {actionTo && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel || 'Go Back'}
        </Link>
      )}
      {action && (
        <button onClick={action} className="btn-primary">
          {actionLabel || 'Try Again'}
        </button>
      )}
    </div>
  )
}

export function ErrorState({ message, retry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-4xl mb-6">
        ⚠️
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-500 max-w-sm mb-8">{message || 'Unable to load data. Please try again.'}</p>
      {retry && (
        <button onClick={retry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}
