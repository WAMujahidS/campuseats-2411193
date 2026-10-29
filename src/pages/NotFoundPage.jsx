
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="card">
      <h2>404 — Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return to vendors</Link>
    </section>
  )
}

export default NotFoundPage
