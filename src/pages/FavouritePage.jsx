
import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { Link } from 'react-router'

function FavouritePage() {
  const { favourites, toggleFavourite, addToCart } = useCart()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <section>
      <h2 className="section-title">My Favourites</h2>

      {favourites.length === 0 ? (
        <div className="card">
          <p className="muted">You haven't added any favourites yet.</p>
          <Link to="/">Browse vendors</Link>
        </div>
      ) : (
        vendors.map((vendor) => {
          const favouriteItems = (vendor.menu ?? []).filter((item) =>
            favourites.some(
              (fav) =>
                fav.itemId === item.id &&
                fav.vendorId === vendor.id
            )
          )

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
                      onClick={() => toggleFavourite(item.id, vendor.id)}
                    >
                      ♥
                    </button>

                    <MenuItemCard item={item} onAdd={addToCart} />
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
