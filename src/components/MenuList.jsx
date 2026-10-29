
import MenuItemCard from './MenuItemCard.jsx'
//  
import { useCart } from '../hooks/useCart.js'
import { useState } from 'react'
/*
week3
function MenuList({items})({
  items,
  onAdd,
  favourites = [],
  onToggleFavourite,
  favouritesOnly = false,
  onToggleFavouritesOnly
}) {*/
function MenuList({ items }) {
  const { favourites, toggleFavourite, addToCart } = useCart()
  const [favouritesOnly, setFavouritesOnly] = useState(false)
  // Filter the menu to show only favourite items when enabled.
  const displayedItems = favouritesOnly
    ? items.filter((item) => favourites.includes(item.id))
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
                favourites.includes(item.id) ? 'is-favourite' : ''
              }`}
              aria-label={
                favourites.includes(item.id)
                  ? `Remove ${item.name} from favourites`
                  : `Add ${item.name} to favourites`
              }
              aria-pressed={favourites.includes(item.id)}
              onClick={() => toggleFavourite(item.id)}
            >
              {favourites.includes(item.id) ? '♥' : '♡'}
            </button>
            
            <MenuItemCard item={item} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuList
