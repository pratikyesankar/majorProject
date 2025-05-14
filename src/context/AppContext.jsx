import React, { createContext, useState, useEffect } from "react"
import products from "../data/products"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      return JSON.parse(savedCart)
    }
    return []
  })

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      return JSON.parse(savedWishlist)
    }
    return []
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (book) => {
    setCart((currentCart) => {
      const bookInCart = currentCart.find((item) => item.id === book.id)
      if (bookInCart) {
        return currentCart.map((item) => {
          if (item.id === book.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }
      return [...currentCart, { ...book, quantity: 1 }]
    })
  }

  const removeFromCart = (bookId) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => item.id !== bookId)
    })
  }

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId)
    } else {
      setCart((currentCart) => {
        return currentCart.map((item) => {
          if (item.id === bookId) {
            return { ...item, quantity: newQuantity }
          }
          return item
        })
      })
    }
  }

  const addToWishlist = (book) => {
    setWishlist((currentWishlist) => {
      const bookInWishlist = currentWishlist.find((item) => item.id === book.id)
      if (!bookInWishlist) {
        return [...currentWishlist, book]
      }
      return currentWishlist
    })
  }

  const removeFromWishlist = (bookId) => {
    setWishlist((currentWishlist) => {
      return currentWishlist.filter((item) => item.id !== bookId)
    })
  }

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
