import React, { useState } from "react"
import "./Filters.css"

function Filters({ onFilterChange, onClearFilters }) {
  const [categories, setCategories] = useState([])
  const [rating, setRating] = useState(0)
  const [sortPrice, setSortPrice] = useState("")

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    let updatedCategories = [...categories]
    if (checked) {
      updatedCategories.push(value)
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== value)
    }
    setCategories(updatedCategories)
    onFilterChange({
      categories: updatedCategories,
      rating,
      sortPrice,
    })
  }

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value)
    setRating(newRating)
    onFilterChange({ categories, rating: newRating, sortPrice })
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSortPrice(newSort)
    onFilterChange({ categories, rating, sortPrice: newSort })
  }

  const clearAllFilters = () => {
    setCategories([])
    setRating(0)
    setSortPrice("")
    onClearFilters()
  }

  return (
    <div className="filters-sidebar">
      <h5>
        Filters
        <button
          className="clear-filters btn btn-link p-0 ms-2"
          onClick={clearAllFilters}
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          Clear
        </button>
      </h5>
      <div className="mb-3">
        <h6>CATEGORY</h6>
        {["Fiction", "Thriller", "Romance", "Fantasy", "Sci-Fi"].map((cat) => (
          <div key={cat} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value={cat}
              checked={categories.includes(cat)}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label">{cat}</label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h6>RATING</h6>

        {[4, 3, 2, 1].map((star) => (
          <div key={star} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={handleRatingChange}
            />
            <label className="form-check-label">{star} Stars & above</label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h6>SORT BY</h6>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="sortPrice"
            value="low-to-high"
            checked={sortPrice === "low-to-high"}
            onChange={handleSortChange}
          />
          <label className="form-check-label">Price - Low to High</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="sortPrice"
            value="high-to-low"
            checked={sortPrice === "high-to-low"}
            onChange={handleSortChange}
          />
          <label className="form-check-label">Price - High to Low</label>
        </div>
      </div>
    </div>
  )
}

export default Filters
