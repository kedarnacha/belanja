"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useCart } from "../context/cart-context"
import { isAuthenticated, logoutUser } from "../lib/auth"
import toast from "react-hot-toast"

export default function Header() {
  const { cart } = useCart()
  const [isClient, setIsClient] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    setIsLoggedIn(isAuthenticated())
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const totalItems = isClient ? cart.reduce((total: any, item: { quantity: any }) => total + item.quantity, 0) : 0

  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false)
    toast.success("You have been logged out successfully")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link 
              to="/" 
              className="ml-2 lg:ml-0 text-2xl font-bold text-blue-800 hover:text-blue-900 transition-colors duration-200"
            >
              ChaStore
            </Link>

          </div>

          <div className="flex items-center space-x-4">

            <Link to="/cart" className="relative">
              <button 
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                aria-label="View cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-blue-600 text-white rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>

            {isClient && (
              <div className="hidden md:block">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <Link to="/account">
                      <button 
                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Account"
                      >
                        <User className="h-5 w-5" />
                      </button>
                    </Link>
                    <button 
                      className="ml-2 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <button className="py-2 px-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="py-2 px-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 left-0 w-[300px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out animate-slide-in-left"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="text-xl font-bold text-blue-800 hover:text-blue-900 transition-colors duration-200"
              >
                ChaStore
              </Link>
              <button 
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-4 p-4 bg-white">
            <div className="my-4">
              {isLoggedIn ? (
                <button 
                  className="w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full text-left py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}