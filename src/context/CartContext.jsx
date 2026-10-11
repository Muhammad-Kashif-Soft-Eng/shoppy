import { useCallback, useMemo } from 'react'
import { CartContext } from './cartContextInstance'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('shoppy_cart', [])

  const addItem = useCallback((product, quantity = 1) => {
    if (
      !product ||
      !Number.isFinite(product.id) ||
      !Number.isFinite(product.price) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error('Cannot add this product to the cart.')
    }

    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { ...product, quantity }]
    })
  }, [setItems])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [setItems])

  const updateQuantity = useCallback((id, quantity) => {
    if (!Number.isInteger(quantity)) return
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }, [setItems])

  const clearCart = useCallback(() => setItems([]), [setItems])

  const cartItems = useMemo(() => Array.isArray(items) ? items : [], [items])
  const isInCart = useCallback((id) => cartItems.some(i => i.id === id), [cartItems])

  const cartCount    = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartShipping = cartSubtotal > 50 ? 0 : 5.99
  const cartTax      = cartSubtotal * 0.08
  const cartTotal    = cartSubtotal + cartShipping + cartTax

  return (
    <CartContext.Provider value={{
      items: cartItems, addItem, removeItem, updateQuantity, clearCart, isInCart,
      cartCount, cartSubtotal, cartShipping, cartTax, cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}
