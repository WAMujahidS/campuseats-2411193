
import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
  const [favourites, setFavourites] = useLocalStorage(
    'campuseats-favourites',
    []
  )

  const count = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  )

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  function addToCart(item) {
    setCart((previous) => {
      const existing = previous.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return previous.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previous, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((previous) =>
      previous
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((previous) =>
      previous.filter((line) => line.item.id !== itemId)
    )
  }

  function toggleFavourite(itemId, vendorId) {
    setFavourites((previous) => {
      const existing = previous.find(
        (item) => item.itemId === itemId
      )

      if (existing) {
        return previous.filter(
          (item) => item.itemId !== itemId
        )
      }

      return [...previous, { itemId, vendorId }]
    })
  }

  function placeOrder(details) {
    if (cart.length === 0) return

    const order = {
      id: Date.now().toString(),
      ...details,
      items: cart,
      total,
      placedAt: new Date().toISOString(),
    }

    setOrders((previous) => [order, ...previous])
    setCart([])
  }

  const value = useMemo(() => ({
    cart,
    orders,
    count,
    total,
    favourites,
    toggleFavourite,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  }), [cart, orders, count, total, favourites])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
