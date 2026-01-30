import Link from "next/link";

export default function Footer() {
  return (
    // Dark background (#0a0a0a) to match Navbar/Hero, creating a "framed" visual effect
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand Identity */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-1">
              <span className="text-indigo-500">Next</span>Store
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the future of e-commerce. Premium gear, delivered with speed.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Admin */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/admin" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Stay in the loop</h3>
            <p className="mt-2 text-sm text-gray-500 mb-4">Get the latest drops and exclusive offers.</p>
            
            <div className="flex">
              {/* Translucent Input Style */}
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="appearance-none min-w-0 w-full bg-white/5 border border-white/10 rounded-l-lg py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button className="flex-shrink-0 bg-indigo-600 text-white font-medium py-2 px-4 rounded-r-lg hover:bg-indigo-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 NextStore Inc. All rights reserved.</p>
          
          <div className="flex gap-6">
             {/* Visual placeholders for Social Icons */}
             <span className="w-5 h-5 bg-gray-800 rounded-full hover:bg-indigo-500 transition cursor-pointer"></span>
             <span className="w-5 h-5 bg-gray-800 rounded-full hover:bg-indigo-500 transition cursor-pointer"></span>
             <span className="w-5 h-5 bg-gray-800 rounded-full hover:bg-indigo-500 transition cursor-pointer"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}