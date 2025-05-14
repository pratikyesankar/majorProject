import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import CartItem from "../components/CartItem"
import "./Cart.css"

function Cart() {
  const { cart } = useContext(AppContext)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Left side*/}
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* Right side*/}
          <div className="col-md-4">
            <div className="price-details-card card">
              <h3>Price Details</h3>
              <p>Price:</p>
              <p>Discount:</p>
              <p>Delivery charges:</p>

              <hr />
              <div className="d-flex justify-content-between">
                <h3>TOTAL AMOUNT:</h3>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
