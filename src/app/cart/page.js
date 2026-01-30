'use client';

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 200 ? 0 : 15; 
  const total = subtotal + shipping;

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
      alert("Error processing checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any gear yet.</p>
            <Link href="/">
              <button className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                Start Shopping <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 flex gap-6 items-center group transition-all hover:shadow-md">
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 text-xs">No img</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{item.category?.name || "General"}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    
                    {/* --- CORREÇÃO DE CONTRASTE AQUI --- */}
                    {/* Borda mais escura (gray-300) e Fundo levemente mais escuro (gray-100) */}
                    <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-1 border border-gray-300">
                      <button 
                        onClick={() => decreaseQuantity(item._id)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-black shadow-sm hover:scale-105 transition disabled:opacity-50 border border-gray-200"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      {/* Texto Preto Forte */}
                      <span className="text-sm font-black w-6 text-center text-gray-900">{item.quantity || 1}</span>
                      
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-black shadow-sm hover:scale-105 transition border border-gray-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {/* ---------------------------------- */}

                    <p className="text-xl font-bold text-gray-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-700 font-bold">Free</span>
                  ) : (
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold mt-8 hover:bg-gray-800 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>🔒 Secure Checkout powered by Stripe</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}