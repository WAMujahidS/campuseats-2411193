
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="card">
          <p>You haven't placed an order yet.</p>
          <Link to="/">Browse vendors</Link>
        </div>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li className="card" key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Name: {order.name}</p>
              <p>Mahallah: {order.mahallah}</p>
              <p>Pickup time: {order.pickupTime}</p>
              <p>Total: RM {order.total.toFixed(2)}</p>

              <ul>
                {order.items.map((line) => (
                  <li key={line.item.id}>
                    {line.item.name} × {line.qty}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OrdersPage
