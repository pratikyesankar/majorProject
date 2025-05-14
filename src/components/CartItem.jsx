import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import "./CartItem.css"

function CartItem({ item, onMoveToWishlist }) {
  const { removeFromCart, updateCartQuantity } = useContext(AppContext)

  return (
    <div className="cart-item-card">
      <img
        src="https://plus.unsplash.com/premium_photo-1683133333081-452251d2a031?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="container-fluid"
        alt={item.name}
        style={{ width: "100px", height: "150px", objectFit: "cover" }}
      />
      <div className="cart-price">
        <p>{item.name}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="card-buttons mt-2">
          <button className="btn" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              onMoveToWishlist()
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
