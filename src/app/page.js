import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category"; 
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";
import HeroCarousel from "@/components/HeroCarousel";
import { Suspense } from "react";

export default async function HomePage() {
  // Database Connection & Fetching
  // running directly on the server for better SEO and performance (Zero Bundle Size)
  await connectToDatabase();
  
  const productsRaw = await Product.find().populate('category').sort({ createdAt: -1 }).lean();
  const categoriesRaw = await Category.find().sort({ name: 1 }).lean();

  // Data Serialization
  // Converts MongoDB _id objects to strings to prevent "Plain Object" errors in Client Components
  const products = productsRaw.map(p => ({
    ...p,
    _id: p._id.toString(),
    category: p.category ? { ...p.category, _id: p.category._id.toString() } : null
  }));

  const categories = categoriesRaw.map(c => ({
    ...c,
    _id: c._id.toString()
  }));

  // Business Logic: Filter Featured Products for the Hero Section
  const featuredProducts = products.filter(p => p.featured === true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* --- HERO SECTION --- */}
      {/* Conditional Rendering: Shows Carousel if data exists, otherwise fallback to generic Banner */}
      {featuredProducts.length > 0 ? (
        <HeroCarousel featuredProducts={featuredProducts} />
      ) : (
        <section className="bg-indigo-700 text-white py-20 px-4">
           <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Welcome to NextStore</h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Discover the best products.</p>
          </div>
        </section>
      )}

      {/* --- MAIN SHOWCASE --- */}
      {/* Suspense Boundary: Shows a loading state while the showcase component hydrates */}
      <Suspense fallback={<div className="text-center py-20">Loading showcase...</div>}>
        <ProductShowcase initialProducts={products} categories={categories} />
      </Suspense>

    </div>
  );
}