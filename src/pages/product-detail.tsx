"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  AlertCircle,
  Package,
  Truck,
  Shield,
  Tag,
  Barcode,
  Box,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useCart } from "../context/cart-context";
import type { Product } from "../types/product";
import { fetchProductById } from "../lib/api";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error("Product ID is missing");
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Product not found or failed to load");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} has been added to your cart`, {
        style: {
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#4ADE80",
          secondary: "#FFFFFF",
        },
      });
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Products
        </button>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 mr-3 text-red-600" />
            <h3 className="text-xl font-semibold text-red-800">
              Product Error
            </h3>
          </div>
          <p className="text-red-700">{error || "Product not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
        <div className="rounded-lg overflow-hidden group">
          <img
            src={product.image || "/vite.svg"}
            alt={product.name}
            className="w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>
            <p className="text-3xl font-bold mb-6 text-blue-800">
              Rp. {(product.price).toLocaleString('id-ID')}
            </p>

            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center text-green-600 font-medium">
                  <Package className="mr-2 h-5 w-5" />
                  <span>In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 font-medium">
                  <Package className="mr-2 h-5 w-5" />
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
              flex items-center justify-center 
              transition-all duration-300 
              transform hover:scale-105 
              shadow-md hover:shadow-lg 
              group/button"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5 group-hover/button:animate-bounce" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Information */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Product Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b pb-2">
              <Package className="mr-2 h-5 w-5 text-blue-600" />
              Product Specifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Tag className="mr-3 h-5 w-5 text-blue-500" />
                  <span className="font-medium">Category</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Barcode className="mr-3 h-5 w-5 text-blue-500" />
                  <span className="font-medium">SKU</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  {product.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Box className="mr-3 h-5 w-5 text-blue-500" />
                  <span className="font-medium">Availability</span>
                </div>
                {product.stock > 0 ? (
                  <div className="flex items-center text-green-600 font-semibold">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span>In Stock ({product.stock})</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 font-semibold">
                    <XCircle className="mr-2 h-4 w-4" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center border-b pb-2">
              <Truck className="mr-2 h-5 w-5 text-blue-600" />
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Shield className="mr-3 h-5 w-5 text-green-500" />
                  <span className="font-medium">Free Shipping</span>
                </div>
                <span className="text-sm text-gray-500">
                  On orders over Rp. 50.000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Package className="mr-3 h-5 w-5 text-blue-500" />
                  <span className="font-medium">Delivery Time</span>
                </div>
                <span className="text-sm text-gray-500">3-5 business days</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <Shield className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <button disabled className="mb-8 flex items-center text-gray-400">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
        <div className="h-[500px] w-full rounded-lg bg-gray-200 animate-pulse" />

        <div className="flex flex-col">
          <div>
            <div className="h-12 w-3/4 mb-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 w-1/4 mb-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-24 w-full mb-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-8 w-1/3 mb-6 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="mt-auto">
            <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-xl p-8 shadow-md">
        <div className="h-10 w-1/4 mb-6 bg-gray-200 animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="h-8 w-1/3 mb-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full mb-1 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full mb-1 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          </div>
          <div>
            <div className="h-8 w-1/2 mb-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-16 w-full bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
