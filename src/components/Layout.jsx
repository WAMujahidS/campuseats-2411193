
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
