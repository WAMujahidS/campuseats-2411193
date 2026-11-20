
import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()

  // Get one vendor and its menu from Firestore
  const { vendor, menu, loading, error } = useVendor(id)

  if (loading) return <Loading />

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!vendor) {
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    )
  }

  // Add vendor information to each menu item.
  // This is needed later when placing orders.
  const items = menu.map((item) => ({
    ...item,
    vendorId: vendor.id,
    vendorName: vendor.name,
  }))

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>

      <h2 className="section-title">{vendor.name}</h2>

      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>

      {/* Keep vendorId for the Favourite feature */}
      <MenuList items={items} vendorId={vendor.id} />
    </section>
  )
}

export default VendorPage
