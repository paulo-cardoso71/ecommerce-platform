'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Fetch categories for the menu on load
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LEFT SIDE: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tighter hover:opacity-80 transition">
              NextStore
            </Link>

            {/* Desktop Menu (Hidden on mobile) */}
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
                Home
              </Link>
              
              {/* Dynamic Categories */}
              {categories.map((cat) => (
                <Link 
                  key={cat._id} 
                  // Trick: Pass ID as query param for Home to filter
                  href={`/?category=${cat._id}`} 
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Admin & Cart */}
          <div className="flex gap-4 items-center">
            <Link 
              href="/admin" 
              className="hidden md:block text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Admin Panel
            </Link>
            
            <Link href="/cart">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalItems}
                </span>
              </button>
            </Link>

            {/* Hamburger Button (Mobile Only) */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>

      {/* MOBILE MENU (Expanded) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <Link href="/" className="block text-base font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              href={`/?category=${cat._id}`}
              className="block text-base font-medium text-gray-600 pl-4 border-l-2 border-transparent hover:border-indigo-500 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-4 mt-2">
            <Link href="/admin" className="block text-sm font-medium text-gray-500">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}