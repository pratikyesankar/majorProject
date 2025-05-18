import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import products from "../data/products"
import "./ProductListing.css"

function ProductListing() {
  const { setLoading } = useContext(AppContext)
  const { category } = useParams()
  const [filteredBooks, setFilteredBooks] = useState(products)

  const applyFilters = (filterOptions) => {
    let books = [...products]

    if (category) {
      books = books.filter((book) => book.category === category)
    }

    const selectedCategories = filterOptions.categories
    if (selectedCategories && selectedCategories.length > 0) {
      books = books.filter((book) => selectedCategories.includes(book.category))
    }

    const minRating = filterOptions.rating
    if (minRating > 0) {
      books = books.filter((book) => book.rating >= minRating)
    }

    const sortByPrice = filterOptions.sortPrice
    if (sortByPrice) {
      if (sortByPrice === "low-to-high") {
        books.sort((bookA, bookB) => bookA.price - bookB.price)
      } else {
        books.sort((bookA, bookB) => bookB.price - bookA.price)
      }
    }

    setFilteredBooks(books)
  }

  const clearFilters = () => {
    let books = [...products]
    if (category) {
      books = books.filter((book) => book.category === category)
    }
    setFilteredBooks(books)
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      applyFilters({
        categories: category ? [category] : [],
        rating: 0,
        sortPrice: "",
      })
      setLoading(false)
    }, 500)
  }, [category])

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left side: Filters */}
        <div className="col-md-3">
          <Filters
            onFilterChange={applyFilters}
            onClearFilters={clearFilters}
          />
        </div>
        {/* Right side: List of books */}
        <div className="col-md-9">
          <div className="products-header">
            SHOWING ALL BOOKS{" "}
            <span>(Showing {filteredBooks.length} books)</span>
          </div>
          <div className="row">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="col-md-4 mb-4">
                  <ProductCard product={book} />
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListing
