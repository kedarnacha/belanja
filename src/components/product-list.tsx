"use client"

import { useEffect, useState } from "react"
import { useProducts } from "../context/products-context"
import ProductCard from "./product-card"
import { AlertCircle, Layers, RefreshCw } from "lucide-react"

export default function ProductList() {
  const { products, loading, error } = useProducts()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <ProductListSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 mr-3 text-red-600" />
            <h3 className="text-xl font-semibold text-red-800">Error Loading Products</h3>
          </div>
          <p className="text-red-700">
            We're experiencing technical difficulties. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return <ProductListSkeleton />
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center mb-4">
            <Layers className="h-6 w-6 mr-3 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">No Products Available</h3>
          </div>
          <p className="text-blue-700">
            Our product catalog is currently empty. Check back soon for new arrivals!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in"
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-slide-up"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'backwards'
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl overflow-hidden shadow-md animate-pulse"
          >
            <div className="h-48 w-full bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
              <div className="h-8 w-full bg-gray-300 rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
