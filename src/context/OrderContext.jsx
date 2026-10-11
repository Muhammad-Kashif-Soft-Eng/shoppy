import { useCallback, useMemo } from 'react'
import { OrderContext } from './orderContextInstance'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('shoppy_orders', [])

  const placeOrder = useCallback((cartItems, cartTotal, shippingInfo) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error('Cannot place an order with an empty cart.')
    }

    if (
      !cartItems.every(item =>
        Number.isFinite(item.id) &&
        typeof item.title === 'string' &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      ) ||
      ![cartTotal.subtotal, cartTotal.shipping, cartTotal.tax, cartTotal.total]
        .every(Number.isFinite)
    ) {
      throw new Error('Order details are invalid. Review your cart and try again.')
    }

    const order = {
      id: `ORD-${Date.now()}-${globalThis.crypto.randomUUID().slice(0, 8)}`,
      date: new Date().toISOString(),
      status: 'confirmed',
      items: cartItems.map(item => ({ ...item })),
      shipping: { ...shippingInfo },
      subtotal: cartTotal.subtotal,
      shippingCost: cartTotal.shipping,
      tax: cartTotal.tax,
      total: cartTotal.total,
    }
    setOrders(prev => [order, ...prev])
    return order
  }, [setOrders])

  const orderList = useMemo(() => Array.isArray(orders) ? orders : [], [orders])
  const getOrder = useCallback((id) => orderList.find(o => o.id === id), [orderList])

  return (
    <OrderContext.Provider value={{ orders: orderList, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}
