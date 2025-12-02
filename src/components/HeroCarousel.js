'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function HeroCarousel({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Safety check: if no products, do nothing
    if (!featuredProducts || featuredProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    if (!featuredProducts || featuredProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  useEffect(() => {
    if (!featuredProducts || featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      handleNext(); 
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts, currentIndex]); // Reset timer on manual slide change

  if (!featuredProducts || featuredProducts.length === 0) return null;

  const product = featuredProducts[currentIndex];

  return (
    <section className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden transition-all duration-500 group">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* LEFT SIDE: Text */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider animate-fadeIn">
            Featured Product
          </span>
          <h1 key={product._id + "title"} className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-slideIn">
            {product.name}
          </h1>
          <p key={product._id + "desc"} className="text-lg text-gray-300 mb-8 max-w-xl animate-fadeIn delay-100">
            {product.description.substring(0, 150)}...
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href={`/products/${product._id}`}>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
                Buy Now - ${product.price}
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Image */}
        <div className="flex-1 w-full max-w-md">
          <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 relative">
             {product.imageUrl ? (
                <img 
                  key={product._id + "img"} 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 animate-fadeIn"
                />
             ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
             )}
          </div>
        </div>
      </div>
      
      {/* --- NAVIGATION ARROWS --- */}
      {featuredProducts.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* INDICATORS */}
      {featuredProducts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    </section>
  );
}