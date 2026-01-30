'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react"; // Usando lucide para ícones mais limpos

export default function Navbar() {
  const { cart } = useCart();
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  return (
    // MUDANÇA: Fundo escuro (#0a0a0a) para combinar com o Hero
    <nav className="bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-white tracking-tighter hover:opacity-80 transition flex items-center gap-2">
              <span className="text-indigo-500">Next</span>Store
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition">
                Home
              </Link>
              {categories.map((cat) => (
                <Link 
                  key={cat._id} 
                  href={`/?category=${cat._id}`} 
                  className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex gap-4 items-center">
            <Link 
              href="/admin" 
              className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Admin Panel
            </Link>
            
            <Link href="/cart">
              {/* Botão do Carrinho: Branco para contraste máximo */}
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition flex items-center gap-2 shadow-lg shadow-white/5">
                <ShoppingBag className="w-4 h-4" />
                <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalItems}
                </span>
              </button>
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 p-4 space-y-4">
          <Link href="/" className="block text-base font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              href={`/?category=${cat._id}`}
              className="block text-base font-medium text-gray-400 hover:text-indigo-400 pl-4 border-l-2 border-white/10 hover:border-indigo-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/admin" className="block text-sm font-medium text-gray-500 pt-4">
             Go to Admin
          </Link>
        </div>
      )}
    </nav>
  );
}