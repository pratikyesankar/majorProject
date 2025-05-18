import React, { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import "./Checkout.css"

function Checkout() {
  const { cart, selectedAddress } = useContext(AppContext)
  const [orderPlaced, setOrderPlaced] = useState(false)

  function getTotalPrice() {
    let total = 0
    for (let item of cart) {
      total += item.price * item.quantity
    }
    return total
  }

  const basePrice = getTotalPrice()
  const totalPrice = basePrice + 50

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
  }

  if (!cart || cart.length === 0 || !selectedAddress) {
    return (
      <div className="checkout-container">
        <p>Invalid order details. Please return to the cart.</p>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      <div className="row">
        {/* Left side: Cart Items and Address */}
        <div className="col-md-6">
          {/* Cart Items */}
          <div className="card p-3 mb-3">
            <h3>Items</h3>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <div>
                  <p className="mb-1">
                    <strong>{item.name}</strong>
                  </p>
                  <p className="mb-0">Quantity: {item.quantity}</p>
                  <p className="mb-0">
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Address */}
          <div className="card p-3">
            <h3>Delivery Address</h3>
            <p className="mb-1">
              <strong>{selectedAddress.name}</strong>
            </p>
            <p className="mb-1">{selectedAddress.street}</p>
            <p className="mb-1">
              {selectedAddress.city}, {selectedAddress.state}{" "}
              {selectedAddress.zip}
            </p>
            <p className="mb-0">Phone: {selectedAddress.phone}</p>
          </div>
        </div>

        {/* Right side: Price Details */}
        <div className="col-md-6">
          <div className="card p-3">
            <h3>Price Details</h3>
            <div className="d-flex justify-content-between">
              <p>Price:</p>
              <p>${basePrice.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Discount:</p>
              <p>$0.00</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Delivery charges:</p>
              <p>$50.00</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h3>TOTAL AMOUNT:</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>
              Place Order
            </button>
            {orderPlaced && (
              <p className="text-success mt-3">Order placed successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
