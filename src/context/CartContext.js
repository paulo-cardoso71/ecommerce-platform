'use client';

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  // Essa trava impede que a gente salve um carrinho vazio antes de carregar o antigo
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. CARREGAR (Ler do LocalStorage)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("nextstore_cart");
      if (savedCart) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Erro ao ler carrinho:", error);
        }
      }
      // Marca como inicializado, agora já podemos salvar
      setIsInitialized(true); 
    }
  }, []);

  // 2. SALVAR (Escrever no LocalStorage)
  useEffect(() => {
    // Só salva SE já tivermos carregado o carrinho inicial (pra não apagar dados)
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("nextstore_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
    
    alert("Added to cart!");
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}