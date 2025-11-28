'use client'; // Obrigatório agora

import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Importa nosso hook

export default function Navbar() {
  const { cart } = useCart(); // Pega o carrinho da nuvem

  // Calcula o total de itens (somando as quantidades)
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tighter hover:opacity-80 transition">
            NextStore
          </Link>

          <div className="flex gap-4 items-center">
            <Link 
              href="/admin" 
              className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Admin Panel
            </Link>
            
            {/* Botão do Carrinho Dinâmico */}
            <Link href="/cart">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition flex items-center gap-2">
                <span>Cart</span>
                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}