
import { Link } from 'react-router'

import { useMyOrders } from '../hooks/useMyOrders.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) return <Loading />

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

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
            <li key={order.id} className="card">
              <p className="cart-name">
                {order.vendorName} · pickup {order.pickupTime}
              </p>

              <p className="muted">
                {order.items.map((item) =>
                  `${item.qty}× ${item.name}`
                ).join(', ')}
              </p>

              <p className="muted">
                Placed {order.createdAt
                  ? order.createdAt.toDate().toLocaleString('en-MY')
                  : 'just now'}
              </p>

              <p className="price">
                RM {order.total.toFixed(2)}
              </p>

              {/* Display the live order progress */}
              <OrderStatus status={order.status} />

              {order.status === 'Received' && (
                <OrderActions order={order} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OrdersPage
