import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; // Importante pro populate
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function HomePage() {
  
  // 1. Conecta e busca os produtos
  await connectToDatabase();
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Welcome to NextStore
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Discover the best products chosen specifically for you. Quality, speed, and style in one place.
          </p>
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
            Shop Now
          </button>
        </div>
      </section>

      {/* --- VITRINE --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <span className="text-gray-500">{products.length} products found</span>
        </div>
        
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {products.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No products yet.</p>
              <Link href="/admin/products/new" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">
                Create your first product in Admin
              </Link>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
                
                {/* 1. LINK NA IMAGEM (Área Superior) */}
                <Link href={'/products/' + product._id} className="relative h-64 bg-gray-100 overflow-hidden block cursor-pointer">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                      No Image Available
                    </div>
                  )}
                  
                  {/* Etiqueta de Categoria */}
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                      {product.category.name}
                    </span>
                  )}
                </Link>

                {/* 2. CONTEÚDO (Área Inferior) */}
                <div className="p-5 flex flex-col flex-grow">
                  
                  {/* Link no Título */}
                  <Link href={'/products/' + product._id} className="cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}

        </div>
      </main>
    </div>
  );
}