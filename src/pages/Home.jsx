import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  const categories = ["Fiction", "Fantasy", "Thriller", "Romance", "Sci-Fi"]

  return (
    <div className="container mt-3">
      <h1>Welcome to Bookstore</h1>
      <h3>Featured Categories Of Books</h3>
      <div className="row">
        {categories.map((category) => (
          <div key={category} className="col-md-4">
            <Link to={`/products/${category}`} className="card home-card mb-3">
              <div className="card-body">
                <h5 className="card-title">{category} Books</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
