import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { ThemeProvider } from "./components/theme-provider"
import { ProductsProvider } from "./context/products-context"
import { CartProvider } from "./context/cart-context"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ProductsProvider>
          <CartProvider>
            <App />
            <Toaster position="top-right" />
          </CartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

