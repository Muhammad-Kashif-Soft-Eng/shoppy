export default function Rating({ rating = 0, count, size = 'sm' }) {
  const stars = Math.round(rating)
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${sizes[size]}`}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={i <= stars ? 'text-amber-400' : 'text-gray-200'}>
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-400 font-medium">({count})</span>
      )}
    </div>
  )
}
