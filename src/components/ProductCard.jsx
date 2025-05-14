import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import "./ProductCard.css"

function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } =
    useContext(AppContext)
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  )
  const [isInCart, setIsInCart] = useState(
    cart.some((item) => item.id === product.id)
  )

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    setIsInWishlist(!isInWishlist)
  }

  const handleAddToCart = () => {
    addToCart(product)
    setIsInCart(true)
  }

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-img-overlay">
        <h5 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h5>
      </div>
      <button
        className={`wishlist-icon ${isInWishlist ? "active" : ""}`}
        onClick={handleWishlistToggle}
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      <div className="card-body">
        <p className="card-text">{product.price.toFixed(2)}</p>
        <div className="card-buttons">
          <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
