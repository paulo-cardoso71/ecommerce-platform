'use client';

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Calcula total
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total }),
      });

      if (res.status === 401) {
        alert("Please login to checkout!");
        router.push("/api/auth/signin"); // Manda pro login do NextAuth
        return;
      }

      if (res.ok) {
        // Se deu certo, precisamos limpar o carrinho!
        // (Dica: o ideal seria ter uma função clearCart no context, 
        // mas por enquanto vamos forçar limpando o localStorage e recarregando)
        localStorage.removeItem("nextstore_cart");
        window.location.href = "/success"; 
      } else {
        alert("Failed to checkout");
      }

    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty</h2>
            <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                  <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category?.name || "General"}</p>
                    <div className="mt-1 font-semibold text-indigo-600">${item.price}</div>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}