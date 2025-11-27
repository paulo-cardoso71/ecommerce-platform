import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; // Importante pro populate
import Navbar from "@/components/Navbar";
import Link from "next/link";

// Next.js 15: params agora é uma Promise, por isso o 'await params'
export default async function ProductDetailsPage({ params }) {
  const { id } = await params; 

  await connectToDatabase();
  const product = await Product.findById(id).populate('category').lean();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 text-center py-20">
        <Navbar />
        <h1 className="text-3xl font-bold text-gray-800">Product not found 😕</h1>
        <Link href="/" className="text-indigo-600 mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Botão de Voltar */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
          ← Back to store
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LADO ESQUERDO: Imagem */}
            <div className="h-[400px] md:h-[600px] bg-gray-100 relative">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* LADO DIREITO: Informações */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              {/* Categoria */}
              <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-2">
                {product.category?.name || "General"}
              </span>

              {/* Título */}
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Preço */}
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price}
              </div>

              {/* Descrição */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
                <button className="flex-1 bg-indigo-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">
                  Add to Cart
                </button>
                <button className="flex-1 bg-white text-gray-900 border-2 border-gray-200 text-lg font-bold py-4 rounded-xl hover:border-gray-900 transition">
                  Buy Now
                </button>
              </div>

              {/* Garantias (Só visual) */}
              <div className="mt-8 flex gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>✅ In Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚 Free Shipping</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}