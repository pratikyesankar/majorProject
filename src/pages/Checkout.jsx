import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

function Checkout() {
  const { cart, addresses, placeOrder } = useContext(AppContext)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const navigate = useNavigate()
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    if (!selectedAddress) {
      alert("Please select an address")
      return
    }
    placeOrder(selectedAddress, cart)
    navigate("/profile")
  }

  return (
    <div className="container my-5">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <h4>Select Delivery Address</h4>
            {addresses.length === 0 ? (
              <p>
                No addresses found. <a href="/address">Add an address</a>.
              </p>
            ) : (
              addresses.map((address) => (
                <div key={address.id} className="card mb-3">
                  <div className="card-body">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      onChange={() => setSelectedAddress(address)}
                      className="me-2"
                    />
                    <p>
                      <strong>{address.name}</strong>
                    </p>
                    <p>
                      {address.street}, {address.city}, {address.zip}
                    </p>
                  </div>
                </div>
              ))
            )}
            <h4>Order Summary</h4>
            {cart.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                  <p>{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Price Details</h5>
                <p>Total: {totalPrice.toFixed(2)}</p>
                <button
                  className="btn btn-primary"
                  onClick={handleCheckout}
                  disabled={!selectedAddress}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
