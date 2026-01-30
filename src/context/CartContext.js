'use client';

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  // Safety Lock: Prevents saving an empty cart before loading the existing one
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. LOAD (Read from LocalStorage)
  useEffect(() => {
    // Check required because Next.js runs on the server first
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("nextstore_cart");
      if (savedCart) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
      // Mark as initialized, safe to save now
      setIsInitialized(true); 
    }
  }, []);

  // 2. SAVE (Write to LocalStorage)
  useEffect(() => {
    // Only save IF we have already loaded the initial cart (to avoid overwriting data)
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("nextstore_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Check if item already exists in cart
      const existingItem = prev.find((item) => item._id === product._id);
      
      if (existingItem) {
        // If exists, just increase quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      // If new, add to list with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
    
   
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item._id === productId) {
          // Prevent quantity from going below 1
          const newQuantity = (item.quantity || 1) - 1;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}