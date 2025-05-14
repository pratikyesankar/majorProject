import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import ProductCard from "../components/ProductCard"

function Wishlist() {
  const { wishlist } = useContext(AppContext)

  return (
    <div className="container my-5">
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row product-grid">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
            >
              <ProductCard product={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
