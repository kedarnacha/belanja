import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center bg-white shadow-xl rounded-xl border border-gray-200 p-10">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-50 p-6 rounded-full">
              <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600 text-base">
            Oops! The page you are looking for seems to have wandered off the digital path.
            It might have been moved, deleted, or never existed.
          </p>
        </div>
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
          >
            <Home className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}