
import { Link, useNavigate } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {
  const { cart, total, placeOrder } = useCart()
  const navigate = useNavigate()

  // Place the order, then navigate to the orders page.
  function handlePlaceOrder(details) {
    placeOrder(details)
    navigate('/orders')
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

        {/* Calculate the total from the cart context. */}
        <p className="cart-total">
          Total: RM {total.toFixed(2)}
        </p>
      </div>

      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  )
}

export default CartPage
