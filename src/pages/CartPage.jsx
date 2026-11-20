
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'

function CartPage() {
  const {
    cart,
    total,
    clearCart,
  } = useCart()

  const { user } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  // Save the order to Firestore, then clear the cart.
  async function handlePlaceOrder(details) {
    setError('')

    try {
      await placeOrders(user, cart, details)

      clearCart()

      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  // Show a message if the cart is empty.
  if (cart.length === 0) {
    return (
      <section className="card">
        <h2>Your cart is empty</h2>
        <p>Pick something from a menu first.</p>
        <Link to="/">Browse vendors</Link>
      </section>
    )
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem key={line.item.id} line={line} />
          ))}
        </ul>

        <p className="cart-total">
          Total: RM {total.toFixed(2)}
        </p>
      </div>

      {/* Display an error if Firestore cannot save the order */}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <CheckoutForm
        defaultName={user?.displayName ?? ''}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  )
}

export default CartPage
