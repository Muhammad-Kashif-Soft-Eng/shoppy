export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-9 h-9', lg: 'w-14 h-14' }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-3 border-gray-200 border-t-brand-600 rounded-full animate-spin`}
           style={{ borderWidth: 3 }} />
      {text && <p className="text-sm text-gray-500 font-medium">{text}</p>}
    </div>
  )
}

export function PageLoader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="bg-gray-200 aspect-square" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-200 rounded-full w-1/3" />
            <div className="h-4 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded-full w-4/5" />
            <div className="flex justify-between items-center pt-1">
              <div className="h-5 bg-gray-200 rounded-full w-1/4" />
              <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
