import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, getProductsByCategory } from '../utils/api'
import { useCart } from '../context/useCart'
import { useWishlist } from '../context/useWishlist'
import { useToast } from '../context/useToast'
import Rating from '../components/ui/Rating'
import ProductCard from '../components/ui/ProductCard'
import { PageLoader } from '../components/ui/LoadingSpinner'
import { ErrorState } from '../components/ui/EmptyState'

export default function ProductDetail() {
  const { id } = useParams()
  const [product,  setProduct]  = useState(null)
  const [related,  setRelated]  = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [imgZoom,  setImgZoom]  = useState(false)

  const { addItem, isInCart }      = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const { addToast }               = useToast()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const prod = await getProduct(id)
        setProduct(prod)
        const rel = await getProductsByCategory(prod.category)
        setRelated(rel.filter(r => r.id !== prod.id).slice(0, 4))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <PageLoader text="Loading product..." />
  if (error)   return <div className="page-container py-16"><ErrorState message={error} /></div>
  if (!product) return null

  const inCart      = isInCart(product.id)
  const inWishlist  = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, quantity)
    addToast(`Added ${quantity} × "${product.title.slice(0, 30)}…" to cart`)
  }

  const handleToggleWishlist = () => {
    toggleItem(product)
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', inWishlist ? 'info' : 'success')
  }

  return (
    <div className="page-container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/"          className="hover:text-brand-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products"  className="hover:text-brand-600 transition-colors">Products</Link>
        <span>/</span>
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-brand-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{product.title}</span>
      </nav>

      {/* Product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="card">
          <div
            className="p-10 aspect-square flex items-center justify-center bg-gray-50 cursor-zoom-in"
            onClick={() => setImgZoom(true)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="badge bg-brand-50 text-brand-700 w-fit capitalize mb-3">
            {product.category}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mb-5">
            <Rating rating={product.rating?.rate} count={product.rating?.count} size="md" />
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-green-600 font-semibold">✓ In Stock</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="badge bg-red-100 text-red-600">-17%</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity + add to cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-11 h-11 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-none sm:px-8 py-3 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] ${
                inCart
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-300'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {inCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-200 ${
                inWishlist
                  ? 'border-red-300 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
              }`}
              aria-label="Wishlist"
            >
              {inWishlist ? '♥' : '♡'}
            </button>
          </div>
          <Link to="/cart" className="btn-secondary text-center mb-8">
            View Cart →
          </Link>

          {/* Meta */}
          <div className="border-t border-gray-100 pt-6 space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-2"><span>🚚</span> Free shipping on orders over $50</div>
            <div className="flex items-center gap-2"><span>↩</span> 30-day hassle-free returns</div>
            <div className="flex items-center gap-2"><span>🔒</span> Secure, encrypted checkout</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="section-title mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Image zoom modal */}
      {imgZoom && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setImgZoom(false)}
        >
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
          </div>
          <button className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300">✕</button>
        </div>
      )}
    </div>
  )
}
