import React, { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import "./Cart.css"

function Cart() {
  const { cart } = useContext(AppContext)
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  })
  const [editingAddress, setEditingAddress] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (editingAddress !== null) {
      setAddresses((prev) =>
        prev.map((addr, index) =>
          index === editingAddress ? { ...newAddress } : addr
        )
      )
      setEditingAddress(null)
    } else {
      setAddresses((prev) => [...prev, { ...newAddress }])
    }
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    })
  }

  const handleEditAddress = (index) => {
    setEditingAddress(index)
    setNewAddress({ ...addresses[index] })
  }

  const handleDeleteAddress = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index))
    if (selectedAddress === index) {
      setSelectedAddress(null)
    } else if (selectedAddress > index) {
      setSelectedAddress(selectedAddress - 1)
    }
  }

  const handleSelectAddress = (index) => {
    setSelectedAddress(index)
  }

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Left side */}
          <div className="col-md-6">
            {/* Address Management Section */}
            <div className="address-section mb-4">
              <h3>Delivery Address</h3>
              <div className="card p-3 mb-3">
                <h4>
                  {editingAddress !== null ? "Edit Address" : "Add New Address"}
                </h4>
                <form onSubmit={handleAddAddress}>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newAddress.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        value={newAddress.street}
                        onChange={handleInputChange}
                        placeholder="Street Address"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={newAddress.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={newAddress.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={newAddress.zip}
                        onChange={handleInputChange}
                        placeholder="Zip Code"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    {editingAddress !== null ? "Update Address" : "Add Address"}
                  </button>
                </form>
              </div>

              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <div className="saved-addresses">
                  <h4>Saved Addresses</h4>
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      className={`card p-3 mb-2 ${
                        selectedAddress === index ? "border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectAddress(index)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{address.name}</strong>

                          <p className="mb-1">{address.street}</p>
                          <p className="mb-1">
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p className="mb-0">Phone: {address.phone}</p>
                        </div>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditAddress(index)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteAddress(index)
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {selectedAddress === index && (
                        <p className="text-primary mt-2 mb-0">
                          Selected for Delivery
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Items */}
            <h2>Cart</h2>
            <div className="col-md-12 d-flex flex-column">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* Right side */}
          <div className="col-md-4">
            <div className="price-details-card card p-3">
              <h3>Price Details</h3>
              <div className="d-flex justify-content-between">
                <p>Price:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Discount:</p>
                <p>$0.00</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Delivery charges:</p>
                <p>${(50).toFixed(2)}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h3>TOTAL AMOUNT:</h3>
                <span>${(totalPrice + 50.0).toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                state={{
                  cart,
                  totalPrice: totalPrice + 50.0,
                  selectedAddress:
                    selectedAddress !== null
                      ? addresses[selectedAddress]
                      : null,
                }}
                className={`btn btn-primary mt-3 ${
                  selectedAddress === null ? "disabled" : ""
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
