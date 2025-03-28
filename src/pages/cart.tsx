"use client"

import { useEffect, useState } from "react"
import { useCart } from "../context/cart-context"
import { 
  Trash2, ShoppingBag, ArrowRight, Package, CreditCard, 
  Truck, ShoppingCart, 
  Minus,
  Plus
} from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast.success("The item has been removed from your cart", {
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-6 w-6 mr-3 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Your cart is empty</h3>
          </div>
          <p className="text-gray-600 mb-6">You haven't added any products to your cart yet.</p>
          <Link to="/">
            <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
            flex items-center justify-center 
            transition-all duration-300 
            transform hover:scale-105 
            shadow-md hover:shadow-lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4 text-gray-600 font-semibold">Product</th>
                  <th className="text-center p-4 text-gray-600 font-semibold">Quantity</th>
                  <th className="text-right p-4 text-gray-600 font-semibold">Price</th>
                  <th className="text-right p-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className=" hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 mr-4 relative rounded-lg overflow-hidden shadow-md">
                          <img
                            src={item.product.image || "/vite.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/products/${item.product.id}`} 
                            className="font-medium text-gray-800 hover:text-blue-600 hover:underline transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border rounded-xl overflow-hidden">
                          <button
                            className="w-10 h-10 flex items-center justify-center 
                            bg-gray-100 hover:bg-gray-200 
                            text-gray-700 hover:text-blue-600
                            transition-all duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed 
                            disabled:hover:bg-gray-100 disabled:hover:text-gray-700"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium text-gray-800 py-2 bg-white">
                            {item.quantity}
                          </span>
                          <button
                            className="w-10 h-10 flex items-center justify-center 
                            bg-gray-100 hover:bg-gray-200 
                            text-gray-700 hover:text-blue-600
                            transition-all duration-200"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right text-gray-800">Rp. {(item.product.price * item.quantity).toLocaleString('id-ID')}</td>
                    <td className="p-4 text-right">
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center border-b pb-2">
              <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Package className="mr-3 h-5 w-5 text-blue-500" />
                  <span>Subtotal</span>
                </div>
                <span className="font-semibold text-gray-800">Rp. {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Truck className="mr-3 h-5 w-5 text-green-500" />
                  <span>Shipping</span>
                </div>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 mt-2 flex items-center justify-between">
                <div className="flex items-center text-gray-800">
                  <CreditCard className="mr-3 h-5 w-5 text-blue-600" />
                  <span className="font-bold">Total</span>
                </div>
                <span className="text-xl font-bold text-blue-800">Rp. {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
            </div>
            <button 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
              flex items-center justify-center mb-4
              transition-all duration-300 
              transform hover:scale-105 
              shadow-md hover:shadow-lg"
            >
              Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              className="w-full py-3 border border-gray-300 hover:bg-gray-100 rounded-lg 
              flex items-center justify-center
              transition-all duration-300 
              text-gray-700 hover:text-red-600"
              onClick={clearCart}
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}