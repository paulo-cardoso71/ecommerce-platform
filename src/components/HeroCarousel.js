'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (!featuredProducts || featuredProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    if (!featuredProducts || featuredProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  useEffect(() => {
    if (!featuredProducts || featuredProducts.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts, currentIndex]); 

  if (!featuredProducts || featuredProducts.length === 0) return null;

  const product = featuredProducts[currentIndex];

  return (
    // MUDANÇA: Altura automática (py-16) ao invés de tela cheia, para não ficar "grosseiro"
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden py-12 md:py-20 group">
      
      {/* 1. Background Effects (Luzes sutis) */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* LADO ESQUERDO: Texto (Tamanho equilibrado) */}
          <div className="flex-1 text-center md:text-left">
            
            {/* Badge animada */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold tracking-wider mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              FEATURED DROP
            </div>

            {/* Título: 5XL é o sweet spot (Grande, mas cabe na tela) */}
            <h1 key={product._id + "title"} className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight animate-slideIn">
              {product.name}
            </h1>
            
            <p key={product._id + "desc"} className="text-gray-400 text-lg mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {product.description.substring(0, 150)}...
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href={`/products/${product._id}`}>
                <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition shadow-lg shadow-white/10 flex items-center justify-center gap-2 transform hover:scale-105">
                  Buy Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <div className="px-8 py-3 rounded-full border border-white/20 text-white font-medium flex items-center justify-center">
                ${product.price}
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Imagem (Card Branco Clássico com "Glow") */}
          <div className="flex-1 w-full max-w-md">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-gray-100 group-hover:scale-[1.02] transition-transform duration-500">
               {product.imageUrl ? (
                  <img 
                    key={product._id + "img"} 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8 animate-fadeIn"
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
               )}
               
               {/* Reflexo decorativo no card */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent opacity-50 rounded-bl-full pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
      
      {/* CONTROLES (Setas laterais sutis) */}
      {featuredProducts.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores (Bolinhas) */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-indigo-500" : "w-1.5 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}