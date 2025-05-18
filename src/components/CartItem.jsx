import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import "./CartItem.css"

function CartItem({ item }) {
  const { removeFromCart, updateCartQuantity, addToWishlist } =
    useContext(AppContext)

  return (
    <div className="col-md-12 cart-item-card">
      <img
        src="https://plus.unsplash.com/premium_photo-1683133333081-452251d2a031?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="item-image"
        alt={item.name}
      />
      <div className="item-details">
        <p className="item-name">{item.name}</p>
        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <button
            className="quantity-button"
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="item-quantity">{item.quantity}</span>
          <button
            className="quantity-button"
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="button-container">
          <button
            className="remove-button"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
          <button
            className="wishlist-button"
            onClick={() => {
              addToWishlist(item)
              removeFromCart(item.id)
            }}
          >
            Move to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
