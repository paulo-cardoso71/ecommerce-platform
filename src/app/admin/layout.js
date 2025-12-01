import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }) {
  // 1. Verificação de Segurança
  const session = await auth();

  // Se não tem usuário logado, ou se não é admin... Redireciona!
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- SIDEBAR (Barra Lateral) --- */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
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

        <div className="p-4 border-t border-gray-200">
             <Link href="/api/auth/signout" className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
              🚪 Logout
            </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}