import MenuItemCard from './MenuItemCard.jsx'
//  
import { useCart } from '../hooks/useCart.js'
import { useState } from 'react'
//

function MenuList({ items, vendorId }) {
  const { favourites, toggleFavourite, addToCart } = useCart()
  const [favouritesOnly, setFavouritesOnly] = useState(false)

  // Filter the menu to show only favourite items when enabled.
  const displayedItems = favouritesOnly
    ? items.filter((item) =>
        favourites.some((fav) => fav.itemId === item.id)
      )
    : items

  // Show a message if the current list has no items.
  if (displayedItems.length === 0) {
    return (
      <div>
        <button
          type="button"
          className="btn"
          onClick={() => setFavouritesOnly((previous) => !previous)}
        >
          {favouritesOnly ? 'Show All Items' : 'Favourites Only'}
        </button>

        <p className="muted">
          {favouritesOnly
            ? 'You have no favourite items on this menu.'
            : 'No items on this menu yet.'}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Toggle between the full menu and favourite items only. */}
      <button
        type="button"
        className="btn favourite-filter"
        onClick={() => setFavouritesOnly((previous) => !previous)}
      >
        {favouritesOnly ? 'Show All Items' : 'Favourites Only'}
      </button>

      <div className="grid">
        {displayedItems.map((item) => (
          <div className="menu-item-wrapper" key={item.id}>
            {/* Add or remove this item from favourites. */}
            <button
              type="button"
              className={`favourite-love ${
                favourites.some((fav) => fav.itemId === item.id) ? 'is-favourite' : ''
              }`}
              aria-label={
                favourites.some((fav) => fav.itemId === item.id)
                  ? `Remove ${item.name} from favourites`
                  : `Add ${item.name} to favourites`
              }
              aria-pressed={favourites.some((fav) => fav.itemId === item.id)}
              onClick={() => toggleFavourite(item.id, vendorId)}
            >
              {favourites.some((fav) => fav.itemId === item.id) ? '♥' : '♡'}
            </button>

            <MenuItemCard item={item} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuList