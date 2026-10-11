import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import { useWishlist } from '../../context/useWishlist'
import { useToast } from '../../context/useToast'
import Rating from './Rating'

export default function ProductCard({ product }) {
  const { addItem, isInCart } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { addToast } = useToast()

  const inCart      = isInCart(product.id)
  const inWishlist  = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    addToast(`"${product.title.slice(0, 30)}…" added to cart`)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    toggleItem(product)
    addToast(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      inWishlist ? 'info' : 'success'
    )
  }

  const categoryLabel = product.category
    ?.split("'")[0]
    .replace(/\b\w/g, l => l.toUpperCase())
    .slice(0, 20)

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="card h-full flex flex-col hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative bg-gray-50 p-6 aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-200 shadow-sm
              ${inWishlist
                ? 'bg-red-50 text-red-500'
                : 'bg-white text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400'
              }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '♥' : '♡'}
          </button>
          {/* Category badge */}
          <span className="absolute top-3 left-3 badge bg-brand-50 text-brand-700">
            {categoryLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors">
              {product.title}
            </h3>
            <Rating rating={product.rating?.rate} count={product.rating?.count} />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200
                ${inCart
                  ? 'bg-brand-50 text-brand-700 border border-brand-200'
                  : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'
                }`}
            >
              {inCart ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
