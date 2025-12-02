import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; 
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import HeroCarousel from "@/components/HeroCarousel";
import { Suspense } from "react";

export default async function HomePage() {
  await connectToDatabase();
  
  // 1. Busca Dados
  const productsRaw = await Product.find().populate('category').sort({ createdAt: -1 }).lean();
  const categoriesRaw = await Category.find().sort({ name: 1 }).lean();

  // 2. Limpeza de Dados
  const products = productsRaw.map(p => ({
    ...p,
    _id: p._id.toString(),
    category: p.category ? { ...p.category, _id: p.category._id.toString() } : null
  }));

  const categories = categoriesRaw.map(c => ({
    ...c,
    _id: c._id.toString()
  }));

  // 3. Lógica do Destaque: PEGA TODOS OS QUE TÊM FEATURED: TRUE
  const featuredProducts = products.filter(p => p.featured === true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* --- HERO SECTION --- */}
      {featuredProducts.length > 0 ? (
        // Se tiver destaques, mostra o Carrossel
        <HeroCarousel featuredProducts={featuredProducts} />
      ) : (
        // Se não tiver nenhum, mostra o Banner Padrão
        <section className="bg-indigo-700 text-white py-20 px-4">
           <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Welcome to NextStore</h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Discover the best products.</p>
          </div>
        </section>
      )}

      {/* VITRINE */}
      <Suspense fallback={<div className="text-center py-20">Loading showcase...</div>}>
        <ProductShowcase initialProducts={products} categories={categories} />
      </Suspense>

    </div>
  );
}