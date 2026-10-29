
import { NavLink, Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

export default function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <Link className="logo-link" to="/">
        <h1 className="logo">CampusEats</h1>
      </Link>

      <nav className="nav">
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </header>
  )
}
