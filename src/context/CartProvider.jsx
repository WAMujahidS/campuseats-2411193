
import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'

import {
  subscribeToFavourites,
  toggleFavouriteInFirestore,
} from '../services/favourites.js'

export default function CartProvider({ children }) {
  const { user } = useAuth()

  // Keep the cart in localStorage for each user.
  const [cart, setCart] = useLocalStorage(
    user ? `ce-cart-${user.uid}` : null,
    []
  )

  // Favourites are now stored in Firestore.
  const [favourites, setFavourites] = useState([])
  const [favouritesError, setFavouritesError] = useState(null)

  // Listen to favourites in real time.
  useEffect(() => {
    if (!user) {
      setFavourites([])
      setFavouritesError(null)
      return
    }

    setFavouritesError(null)

    const unsubscribe = subscribeToFavourites(
      user.uid,
      setFavourites,
      (err) => setFavouritesError(err.message)
    )

    return unsubscribe
  }, [user])

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

  // Add or remove an item from Firestore favourites.
  function toggleFavourite(itemId, vendorId) {
    if (!user) return

    const existing = favourites.some(
      (item) =>
        item.itemId === itemId &&
        item.vendorId === vendorId
    )

    const favouriteItem = { itemId, vendorId }

    toggleFavouriteInFirestore(
      user.uid,
      favouriteItem,
      existing
    ).catch((err) => {
      setFavouritesError(err.message)
      console.error('Favourite update failed:', err)
    })
  }

  // Clear the cart after successfully placing an order.
  function clearCart() {
    setCart([])
  }

  const value = useMemo(() => ({
    cart,
    count,
    total,
    favourites,
    favouritesError,
    toggleFavourite,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
  }), [
    cart,
    count,
    total,
    favourites,
    favouritesError,
    user,
  ])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
