'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import AddToCartBtn from "@/components/AddToCartBtn";

export default function ProductShowcase({ initialProducts, categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 1. Single Source of Truth: Get state directly from the URL
  // This prevents synchronization issues between local state and the URL
  const activeCategory = searchParams.get('category') || 'all';

  // 2. Handle Category Switching
  // Instead of setting state, we push a new URL. The component re-renders automatically.
  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      router.push('/', { scroll: false }); // Remove query param
    } else {
      router.push(`/?category=${categoryId}`, { scroll: false }); // Add ?category=ID
    }
  };

  // 3. Filter Logic
  const filteredProducts = activeCategory === 'all' 
    ? initialProducts 
    : initialProducts.filter(p => p.category?._id === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      
      {/* FILTER HEADER (Tabs) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-3xl font-bold text-gray-900">Latest Arrivals</h2>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'all' 
              ? 'bg-indigo-600 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Items
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat._id}
              onClick={() => handleCategoryChange(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat._id 
                ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col">
            
            {/* Image Link with Zoom Effect */}
            <Link href={'/products/' + product._id} className="relative h-64 bg-gray-100 overflow-hidden block cursor-pointer">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 font-medium">No Image</div>
              )}
              
              {/* Optional: "New" Badge */}
              {/* <span className="absolute top-3 right-3 bg-white/90 text-indigo-600 text-xs font-bold px-2 py-1 rounded shadow-sm">NEW</span> */}
            </Link>

            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {product.category?.name || "General"}
                </span>
                <Link href={'/products/' + product._id}>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors cursor-pointer mt-1">
                    {product.name}
                  </h3>
                </Link>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                {/* Compact Add to Cart Button */}
                <div className="scale-90 origin-right"> 
                   <AddToCartBtn product={product} mode="icon" />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}