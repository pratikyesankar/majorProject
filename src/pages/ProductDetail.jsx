import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"

function ProductDetail() {
  const { products, addToCart, addToWishlist } = useContext(AppContext)
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))

  if (!product) return <div className="container my-5">Product not found</div>

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating} ⭐</p>
          <p>{product.description}</p>
          <button
            className="btn btn-primary me-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => addToWishlist(product)}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
