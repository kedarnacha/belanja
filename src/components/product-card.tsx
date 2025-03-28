"use client"

import type { Product } from "../types/product"
import { useCart } from "../context/cart-context"
import { ShoppingCart, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} has been added to your cart`, {
      style: {
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#4ADE80',
        secondary: '#FFFFFF',
      },
    })
  }

  return (
    <div className="group h-full flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 bg-white">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/products/${product.id}`}>
            <button 
              className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all duration-200"
              aria-label="View Product Details"
            >
              <Eye className="h-4 w-4 text-gray-700 hover:text-blue-600" />
            </button>
          </Link>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">
          <Link 
            to={`/products/${product.id}`} 
            className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            {product.name}
          </Link>
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-blue-800">Rp. {(product.price).toLocaleString('id-ID')}</p>
          
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg 
            flex items-center 
            hover:bg-blue-700 
            transition-all duration-300 
            transform hover:scale-105 
            shadow-md hover:shadow-lg 
            group/button"
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover/button:animate-bounce" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}