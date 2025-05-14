import React, { useState } from "react"
import "./Filters.css"

function Filters({ onFilterChange, onClearFilters }) {
  const [categories, setCategories] = useState([])
  const [rating, setRating] = useState(0)
  const [sortPrice, setSortPrice] = useState("")
  const [priceRange, setPriceRange] = useState(150)

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
      priceRange,
    })
  }

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value)
    setRating(newRating)
    onFilterChange({ categories, rating: newRating, sortPrice, priceRange })
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSortPrice(newSort)
    onFilterChange({ categories, rating, sortPrice: newSort, priceRange })
  }

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value)
    setPriceRange(newPrice)
    onFilterChange({ categories, rating, sortPrice, priceRange: newPrice })
  }

  const clearAllFilters = () => {
    setCategories([])
    setRating(0)
    setSortPrice("")
    setPriceRange(150)
    onClearFilters()
  }

  return (
    <div className="filters-sidebar">
      <h5>
        Filters
        <a href="#" className="clear-filters" onClick={clearAllFilters}>
          Clear
        </a>
      </h5>
      <div className="mb-3">
        <h6>PRICE</h6>
        <input
          type="range"
          className="form-range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={handlePriceChange}
        />
        <div className="d-flex justify-content-between">
          <span>{priceRange}</span>
        </div>
      </div>
      <div className="mb-3">
        <h6>CATEGORY</h6>
        {["Fiction", "Thriller", "Romance", "Fantasy"].map((cat) => (
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
