import { useCallback, useMemo } from 'react'
import { WishlistContext } from './wishlistContextInstance'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('shoppy_wishlist', [])
  const wishlistItems = useMemo(() => Array.isArray(items) ? items : [], [items])

  const addItem = useCallback((product) => {
    if (!product || !Number.isFinite(product.id)) {
      throw new Error('Cannot add this product to the wishlist.')
    }
    setItems(prev => prev.some(i => i.id === product.id) ? prev : [...prev, product])
  }, [setItems])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [setItems])

  const toggleItem = useCallback((product) => {
    if (!product || !Number.isFinite(product.id)) {
      throw new Error('Cannot update this product in the wishlist.')
    }
    setItems(prev =>
      prev.some(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    )
  }, [setItems])

  const clearWishlist = useCallback(() => setItems([]), [setItems])

  const isInWishlist = useCallback((id) => wishlistItems.some(i => i.id === id), [wishlistItems])

  return (
    <WishlistContext.Provider value={{
      items: wishlistItems, addItem, removeItem, toggleItem, clearWishlist, isInWishlist,
      wishlistCount: wishlistItems.length,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}
