import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"

function AddressManagement() {
  const { addresses, addAddress, updateAddress, deleteAddress } =
    useContext(AppContext)
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
  })
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateAddress(editingId, newAddress)
      setEditingId(null)
    } else {
      addAddress(newAddress)
    }
    setNewAddress({ name: "", street: "", city: "", zip: "" })
  }

  const handleEdit = (address) => {
    setEditingId(address.id)
    setNewAddress(address)
  }

  return (
    <div className="container my-5">
      <h2>Manage Addresses</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Zip Code"
            value={newAddress.zip}
            onChange={(e) =>
              setNewAddress({ ...newAddress, zip: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Address" : "Add Address"}
        </button>
      </form>
      <h3>Your Addresses</h3>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <div className="row">
          {addresses.map((address) => (
            <div key={address.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p>
                    <strong>{address.name}</strong>
                  </p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.zip}
                  </p>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/checkout" className="btn btn-success">
        Proceed to Checkout
      </Link>
    </div>
  )
}

export default AddressManagement
