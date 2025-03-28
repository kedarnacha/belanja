import ProductList from "../components/product-list"
import { Sparkles, ShoppingBag } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-11/12">
        <div className="mb-8 flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Products
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Curated with Care</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <ProductList />
        </div>
        
        <div className="mt-12 text-center text-gray-500">
          <p className="italic">
            Discover our carefully selected range of products
          </p>
        </div>
      </div>
    </main>
  )
}