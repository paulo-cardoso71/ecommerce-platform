import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function HomePage() {
  await connectToDatabase();
  
  // 1. Busca TODOS os produtos
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

  // 2. Tenta achar UM produto que esteja marcado como 'featured: true'
  // O .find do javascript (não do banco) procura no array que já baixamos
  const featuredProduct = products.find(p => p.featured === true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* --- HERO SECTION DINÂMICA --- */}
      {featuredProduct ? (
        // CENÁRIO A: Temos um produto em destaque!
        <section className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            
            {/* Texto do Destaque */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                Featured Product
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                {featuredProduct.name}
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                {featuredProduct.description.substring(0, 150)}...
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link href={`/products/${featuredProduct._id}`}>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                    Buy Now - ${featuredProduct.price}
                  </button>
                </Link>
              </div>
            </div>

            {/* Imagem do Destaque */}
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 relative">
                 {featuredProduct.imageUrl ? (
                    <img 
                      src={featuredProduct.imageUrl} 
                      alt={featuredProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                 ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                 )}
              </div>
            </div>

          </div>
          
          {/* Fundo decorativo (Blur) */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </section>
      ) : (
        // CENÁRIO B: Nenhum destaque (Mostra o padrão)
        <section className="bg-indigo-700 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Welcome to NextStore
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover the best products chosen specifically for you.
            </p>
          </div>
        </section>
      )}

      {/* --- VITRINE DE PRODUTOS --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            // ... (Mantenha o código dos cards igual estava antes) ...
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
          ))}
        </div>
      </main>
    </div>
  );
}