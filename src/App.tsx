import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import HomePage from "./pages/home"
import ProductDetailPage from "./pages/product-detail"
import CartPage from "./pages/cart"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import NotFoundPage from "./pages/not-found"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App

