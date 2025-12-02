'use client';

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function BuyNowBtn({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    // Add product to cart
    addToCart(product);
    
    // Redirect to cart
    router.push('/cart');
  };

  return (
    <button 
      onClick={handleBuyNow}
      className="flex-1 bg-white text-gray-900 border-2 border-gray-200 text-lg font-bold py-4 rounded-xl hover:border-gray-900 transition active:scale-95"
    >
      Buy Now
    </button>
  );
}