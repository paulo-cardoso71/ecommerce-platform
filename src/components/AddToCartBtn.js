'use client';

import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({ product }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="flex-1 bg-indigo-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30"
    >
      Add to Cart
    </button>
  );
}