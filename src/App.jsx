import { useEffect, useState } from 'react'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
function App() {
 const [vendors, setVendors] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const [reloadKey, setReloadKey] = useState(0)
 const [selectedVendorId, setSelectedVendorId] = useState(null)
 const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
 const [cart, setCart] = useState([])
 const [view, setView] = useState('menu')
 const [lastOrder, setLastOrder] = useState(null)
 const [favourites, setFavourites] = useState([])
 const [favouritesOnly, setFavouritesOnly] = useState(false)
 
useEffect(() => {
  const controller = new AbortController()

  async function fetchVendors() {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/vendors.json', {
        signal: controller.signal,
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data = await res.json()

      setVendors(data)

      // Select the first vendor when data arrives.
      setSelectedVendorId((prev) => prev ?? data[0]?.id ?? null)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }

  fetchVendors()

  return () => controller.abort()
}, [reloadKey])

 
function handleAddToCart(item) {
  setCart((prevCart) => {
    const existingLine = prevCart.find(
      (line) => line.item.id === item.id
    )

    if (existingLine) {
      return prevCart.map((line) =>
        line.item.id === item.id
          ? { ...line, qty: line.qty + 1 }
          : line
      )
    }

    return [...prevCart, { item, qty: 1 }]
  })
}


function handleChangeQty(itemId, delta) {
  setCart((prevCart) =>
    prevCart
      .map((line) =>
        line.item.id === itemId
          ? { ...line, qty: line.qty + delta }
          : line
      )
      .filter((line) => line.qty > 0)
  )
}

function handleRemove(itemId) {
  setCart((prevCart) =>
    prevCart.filter((line) => line.item.id !== itemId)
  )
}


function handlePlaceOrder(details) {
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  setLastOrder({ ...details, total })
  setCart([])
  setView('done')
}

function handleToggleFavourite(itemId) {
  setFavourites((prev) =>
    prev.includes(itemId)
      ? prev.filter((id) => id !== itemId)
      : [...prev, itemId]
  )
}

const cartCount = cart.reduce(
  (total, line) => total + line.qty,
  0
)
 return (
  <>
    <Header
      cartCount={cartCount}
      onShowMenu={() => setView('menu')}
      onShowCart={() => setView('cart')}
    />

    <main className="container">
{loading ? (
  <Loading />
) : error ? (
  <ErrorMessage
    message={error}
    onRetry={() => setReloadKey((k) => k + 1)}
  />
) : view === 'menu' ? (
  <>
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            isSelected={vendor.id === selectedVendorId}
            onSelect={setSelectedVendorId}
          />
        ))}
      </div>
    </section>

    {selectedVendor && (
      <section>
        <h2 className="section-title">
          Menu: {selectedVendor.name}
        </h2>
        <MenuList
  items={selectedVendor?.menu ?? []}
  onAdd={handleAddToCart}
  favourites={favourites}
  onToggleFavourite={handleToggleFavourite}
  favouritesOnly={favouritesOnly}
  onToggleFavouritesOnly={() =>
    setFavouritesOnly((prev) => !prev)
  }
/>
      </section>
    )}
  </>
) : view === 'cart' ? (
  <CartPage
    cart={cart}
    onChangeQty={handleChangeQty}
    onRemove={handleRemove}
    onPlaceOrder={handlePlaceOrder}
  />
) : (
  <section className="card">
    <h2>Order placed!</h2>
    <p>Name: {lastOrder?.name}</p>
    <p>Mahallah: {lastOrder?.mahallah}</p>
    <p>Pickup time: {lastOrder?.pickupTime}</p>
    <p>Total: RM {lastOrder?.total.toFixed(2)}</p>

    <button
      type="button"
      className="btn"
      onClick={() => setView('menu')}
    >
      Back to menu
    </button>
  </section>
)}

    </main>

    <Footer />
  </>
)
}
export default App