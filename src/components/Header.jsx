
import { NavLink, Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }
  return (
    <header className="header">
      <Link className="logo-link" to="/">
        <h1 className="logo">CampusEats</h1>
      </Link>

      <nav className="nav">
        <NavLink to="/" end>
          Vendors
        </NavLink>

        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>

        <NavLink to="/orders">
          Orders
        </NavLink>

        <NavLink to="/favourites">
          Favourites
        </NavLink>
      </nav>
      {user ? (
  <>
    <span className="user-name">
      Hi, {user.displayName || user.email}
    </span>

    <button
      type="button"
      className="link"
      onClick={handleLogout}
    >
      Log out
    </button>
  </>
) : (
  <NavLink to="/login">Log in</NavLink>
)}
    </header>
  )
}
