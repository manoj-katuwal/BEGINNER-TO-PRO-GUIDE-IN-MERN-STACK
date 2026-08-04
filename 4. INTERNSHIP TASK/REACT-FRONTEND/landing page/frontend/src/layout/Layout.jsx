import React from 'react'
import Navbar from '../pages/navbar'
import Footer from '../pages/Flooter/Footer'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
