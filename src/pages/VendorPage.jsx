
import { useParams } from 'react-router'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import MenuList from '../components/MenuList.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  // Find the vendor that matches the ID in the URL.
  const vendor = vendors.find((v) => v.id === id)

  // Show a message if the vendor does not exist.
  if (!vendor) {
    return (
      <section className="card">
        <h2>Vendor not found</h2>
        <p>No vendor matches this ID.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <p className="muted">{vendor.location}</p>

      <MenuList items={vendor.menu ?? []} vendorId={vendor.id} />
    </section>
  )
}

export default VendorPage
