'use client';

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  // Importamos as novas funções aqui: addToCart e decreaseQuantity
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Calcula total
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      if (res.status === 401) {
        alert("Please login to checkout!");
        router.push("/api/auth/signin");
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
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
                <div key={item._id} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-start sm:items-center">
                  
                  {/* Imagem */}
                  <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                    )}
                  </div>

                  {/* Detalhes + Controle de Quantidade */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.category?.name || "General"}</p>
                    
                    {/* --- CONTROLE DE QUANTIDADE --- */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button 
                          onClick={() => decreaseQuantity(item._id)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-900 border-x border-gray-300 min-w-[40px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 hover:bg-gray-100 text-indigo-600 transition font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="font-bold text-gray-900 text-lg">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Botão Remover */}
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

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