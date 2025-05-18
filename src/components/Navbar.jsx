import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bookstore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          <form className="d-flex ms-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search books..."
              />
              <Link className="btn btn-outline-success">Search</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
