import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          Bookstore
        </Link>
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
          <Link className="nav-link" to="/wishlist">
            Wishlist
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </div>
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
