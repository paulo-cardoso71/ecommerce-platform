import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Marca */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tighter">
              NextStore
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              Making e-commerce easy and beautiful. Built with Next.js 15.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900">All Products</Link></li>
              <li><Link href="#" className="text-base text-gray-500 hover:text-gray-900">Featured</Link></li>
              <li><Link href="#" className="text-base text-gray-500 hover:text-gray-900">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Admin */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/admin" className="text-base text-gray-500 hover:text-gray-900">Admin Login</Link></li>
              <li><Link href="#" className="text-base text-gray-500 hover:text-gray-900">Documentation</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter (Visual apenas) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Stay in the loop</h3>
            <div className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-l-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="ml-0 flex-shrink-0 bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-r-md hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2024 NextStore Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}