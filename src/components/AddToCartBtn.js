'use client';

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { ShoppingBag, Plus } from "lucide-react"; // Import icons

export default function AddToCartBtn({ product, mode = 'full' }) { // 'full' or 'icon'
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault(); // CRITICAL: Prevents the Link from opening the product page
    e.stopPropagation(); // CRITICAL: Stops the click from bubbling up
    addToCart(product);
    toast.success("Added to cart!");
  };

  // --- ICON MODE (Floating Circle Button) ---
  if (mode === 'icon') {
    return (
      <button 
        onClick={handleAdd}
        className="bg-white text-black hover:bg-black hover:text-white p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Add to Cart"
      >
        <ShoppingBag className="w-5 h-5" />
      </button>
    );
  }

  // --- DEFAULT MODE (Big Purple Button) ---
  return (
    <button 
      onClick={handleAdd}
      className="flex-1 bg-indigo-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-2"
    >
      Add to Cart
    </button>
  );
}