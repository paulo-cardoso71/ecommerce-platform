import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// Importando ícones para ficar profissional
import { LayoutDashboard, Package, Layers, ShoppingCart, Settings, LogOut, Store } from "lucide-react";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* --- SIDEBAR (DARK MODE) --- */}
      {/* Mudamos bg-white para bg-[#111827] (quase preto) e textos para branco/cinza */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-[#111827] text-white flex-col h-screen sticky top-0 overflow-y-auto border-r border-gray-800">
        
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            NextStore
          </h2>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Admin Console</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-6 px-4 space-y-2 flex-1">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</p>
          
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
            Dashboard
          </Link>

          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">Management</p>

          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <Package className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
            Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <Layers className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
            Categories
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
            Orders
          </Link>

          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">System</p>

          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all group">
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-indigo-400" />
            Settings
          </Link>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2 bg-[#0b101b]">
             <Link href="/" className="flex items-center gap-2 justify-center w-full px-4 py-2 text-sm text-indigo-400 hover:bg-gray-800 rounded-lg transition font-medium border border-gray-800 hover:border-indigo-900">
               <Store className="w-4 h-4" />
               Go to Store
            </Link>
             <Link href="/api/auth/signout" className="flex items-center gap-2 justify-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg transition">
               <LogOut className="w-4 h-4" />
               Logout
            </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 overflow-x-hidden w-full">
        {children}
      </main>
    </div>
  );
}