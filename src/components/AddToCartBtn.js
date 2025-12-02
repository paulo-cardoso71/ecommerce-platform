'use client';

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function AddToCartBtn({ product, mode = 'full' }) { // 'full' or 'icon'
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent opening product link if button is inside a Link
    e.stopPropagation(); // Stop click propagation
    addToCart(product);
    toast.success("Added to cart!");
  };

  // --- ICON MODE (Just the +) ---
  if (mode === 'icon') {
    return (
      <button 
        onClick={handleAdd}
        className="bg-gray-100 text-gray-800 hover:bg-indigo-600 hover:text-white p-3 rounded-full transition-all duration-200 shadow-sm active:scale-95"
        title="Add to Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    );
  }

  // --- DEFAULT MODE (Big Button) ---
  return (
    <button 
      onClick={handleAdd}
      className="flex-1 bg-indigo-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 active:scale-95"
    >
      Add to Cart
    </button>
  );
}