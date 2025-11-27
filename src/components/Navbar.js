import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo da Loja */}
          <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tighter hover:opacity-80 transition">
            NextStore
          </Link>

          {/* Links da Direita */}
          <div className="flex gap-4 items-center">
            <Link 
              href="/admin" 
              className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Admin Panel
            </Link>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition">
              Cart (0)
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}