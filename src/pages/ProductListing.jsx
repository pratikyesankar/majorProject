import React, { useContext, useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import products from "../data/products"
import "./ProductListing.css"

function ProductListing() {
  const { setLoading } = useContext(AppContext)

  const { category } = useParams()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search") || ""

  const [filteredBooks, setFilteredBooks] = useState(products)

  const applyFilters = (filterOptions) => {
    let books = [...products]

    if (category) {
      books = books.filter((book) => book.category === category)
    }

    if (searchQuery) {
      books = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    const selectedCategories = filterOptions.categories
    if (selectedCategories && selectedCategories.length > 0) {
      books = books.filter((book) => selectedCategories.includes(book.category))
    }

    const minRating = filterOptions.rating
    if (minRating > 0) {
      books = books.filter((book) => book.rating >= minRating)
    }

    const maxPrice = filterOptions.priceRange
    if (maxPrice) {
      books = books.filter((book) => book.price <= maxPrice)
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
    if (searchQuery) {
      books = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
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
        priceRange: 0,
      })
      setLoading(false)
    }, 500)
  }, [category, searchQuery])

  return (
    <div className="container my-5">
      <div className="row products-list">
        {/* Left side: Filters */}
        <div className="col-md-4">
          <Filters
            onFilterChange={applyFilters}
            onClearFilters={clearFilters}
          />
        </div>
        {/* Right side: List of books */}
        <div className="col-md-8 books-list">
          <div className="products-header">
            SHOWING ALL BOOKS{" "}
            <span>(Showing {filteredBooks.length} books)</span>
          </div>
          <div className="row product-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
                >
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
