'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import AddToCartBtn from "@/components/AddToCartBtn"; // Importing the real logic
import { ShoppingBag } from 'lucide-react';

export default function ProductShowcase({ initialProducts, categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 1. Single Source of Truth: Get state directly from the URL
  const activeCategory = searchParams.get('category') || 'all';

  // 2. Handle Category Switching
  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      router.push('/', { scroll: false }); 
    } else {
      router.push(`/?category=${categoryId}`, { scroll: false }); 
    }
  };

  // 3. Filter Logic
  const filteredProducts = activeCategory === 'all' 
    ? initialProducts 
    : initialProducts.filter(p => p.category?._id === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <h2 className="text-4xl font-black text-gray-900 tracking-tight">Latest Drops</h2>
           <p className="text-gray-500 mt-2 text-lg">New arrivals fresh from the factory.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeCategory === 'all' 
              ? 'bg-black text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat._id}
              onClick={() => handleCategoryChange(cat._id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat._id 
                ? 'bg-black text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <div key={product._id} className="group relative block">
            
            {/* 1. IMAGE CARD */}
            <div className="aspect-[1/1.1] bg-gray-100 rounded-3xl overflow-hidden relative mb-5 font-sans shadow-sm border border-gray-100">
               
               {/* Link covers the image area */}
               <Link href={'/products/' + product._id} className="block w-full h-full">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium">No Image</div>
                  )}
               </Link>

               {/* Category Badge (High Contrast) */}
               <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.category?.name || "General"}
                  </span>
               </div>

               {/* --- REAL QUICK ADD BUTTON --- */}
               {/* Appears on hover, floating at bottom right */}
               <div className="absolute bottom-4 right-4 translate-y-16 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                  <AddToCartBtn product={product} mode="icon" />
               </div>
               {/* ----------------------------- */}

            </div>

            {/* 2. PRODUCT INFO */}
            <Link href={'/products/' + product._id} className="block space-y-1">
               <h3 className="text-lg font-bold text-black leading-tight group-hover:text-indigo-600 transition-colors font-sans">
                 {product.name}
               </h3>
               
               <div className="pt-1 flex items-center justify-between">
                 <span className="text-lg font-black text-gray-900 tracking-tight">${product.price}</span>
               </div>
            </Link>

          </div>
        ))}
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}