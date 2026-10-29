
import { Loading, ErrorMessage } from '../components/Status.jsx'
import VendorCard from '../components/VendorCard.jsx'
import { useVendors } from '../hooks/useVendors.js'
import { useNavigate } from 'react-router'
export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const navigate = useNavigate()

  if (loading) return <Loading />

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onSelect={(id) => navigate(`/vendor/${id}`)} />
        ))}
      </div>
    </section>
  )
}
