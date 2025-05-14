import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"

function WishlistItem({ item }) {
  const { addToCart, removeFromWishlist } = useContext(AppContext)

  return (
    <div className="card h-100">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.price}</p>
        <button
          className="btn btn-primary me-2"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
        <button
          className="btn btn-danger"
          onClick={() => removeFromWishlist(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default WishlistItem
