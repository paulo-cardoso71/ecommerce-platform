import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }) {
  // Security check
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* --- MOBILE MENU */}
      <nav className="md:hidden bg-white shadow-sm p-4 flex flex-wrap gap-4 justify-center text-sm font-medium border-b border-gray-200">
        <Link href="/admin" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
        <Link href="/admin/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
        <Link href="/admin/categories" className="text-gray-700 hover:text-indigo-600">Categories</Link>
        <Link href="/admin/orders" className="text-gray-700 hover:text-indigo-600">Orders</Link>
        <Link href="/" className="text-indigo-600 font-bold">Go to Store</Link>
      </nav>

      {/* --- SIDEBAR DESKTOP (PC only) --- */}
      {/* 'hidden md:flex' = hide in mobile, show on pc */}
      {/* 'w-64 flex-shrink-0'*/}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-white shadow-md flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">Welcome, {session.user.name}</p>
        </div>
        
        <nav className="mt-6 px-4 space-y-2 flex-1">
          <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            📦 Products
          </Link>
          <Link href="/admin/categories" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            ws Categories
          </Link>
          <Link href="/admin/orders" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            🛒 Orders
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            ⚙️ Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
             <Link href="/" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md font-bold text-center border border-indigo-100">
              🏠 Go to Store
            </Link>
             <Link href="/api/auth/signout" className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-md text-center">
              🚪 Logout
            </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      {/* overflow-x-hidden prevents tables form growing past the screen */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full">
        {children}
      </main>
    </div>
  );
}