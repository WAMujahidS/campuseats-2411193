
import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import { subscribeToMenu } from '../services/vendors.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { Link } from 'react-router'

function FavouritePage() {
  const { favourites, toggleFavourite, addToCart } = useCart()
  const { vendors, loading: vendorsLoading, error: vendorsError, reload } = useVendors()

  const [menus, setMenus] = useState({})
  const [menuLoading, setMenuLoading] = useState(true)
  const [menuError, setMenuError] = useState(null)

  // Listen to each vendor's menu in Firestore.
  useEffect(() => {
    if (vendorsLoading || vendorsError) return

    if (vendors.length === 0) {
      setMenuLoading(false)
      return
    }

    setMenuLoading(true)
    setMenuError(null)

    const unsubscribers = vendors.map((vendor) =>
      subscribeToMenu(
        vendor.id,
        (items) => {
          setMenus((previous) => ({
            ...previous,
            [vendor.id]: items,
          }))
        },
        (err) => {
          setMenuError(err.message)
          setMenuLoading(false)
        }
      )
    )

    setMenuLoading(false)

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [vendors, vendorsLoading, vendorsError])

  if (vendorsLoading || menuLoading) return <Loading />

  if (vendorsError) {
    return <ErrorMessage message={vendorsError} onRetry={reload} />
  }

  if (menuError) {
    return <ErrorMessage message={menuError} onRetry={reload} />
  }

  return (
    <section>
      <h2 className="section-title">My Favourites</h2>

      {favourites.length === 0 ? (
        <div className="card">
          <p className="muted">
            You haven't added any favourites yet.
          </p>
          <Link to="/">Browse vendors</Link>
        </div>
      ) : (
        vendors.map((vendor) => {
          const favouriteItems = (menus[vendor.id] ?? [])
            .filter((item) =>
              favourites.some(
                (fav) =>
                  fav.itemId === item.id &&
                  fav.vendorId === vendor.id
              )
            )
            .map((item) => ({
              ...item,
              vendorId: vendor.id,
              vendorName: vendor.name,
            }))

          if (favouriteItems.length === 0) return null

          return (
            <div key={vendor.id}>
              <h3 className="section-title">{vendor.name}</h3>

              <div className="grid">
                {favouriteItems.map((item) => (
                  <div className="menu-item-wrapper" key={item.id}>
                    <button
                      type="button"
                      className="favourite-love is-favourite"
                      aria-label={`Remove ${item.name} from favourites`}
                      onClick={() =>
                        toggleFavourite(item.id, vendor.id)
                      }
                    >
                      ♥
                    </button>

                    <MenuItemCard
                      item={item}
                      onAdd={addToCart}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </section>
  )
}

export default FavouritePage
