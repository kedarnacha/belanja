"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "../types/product"
import { fetchProducts } from "../lib/api"

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError("Failed to load products")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  return <ProductsContext.Provider value={{ products, loading, error }}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}

