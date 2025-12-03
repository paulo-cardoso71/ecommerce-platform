import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import AddToCartBtn from "@/components/AddToCartBtn";
import BuyNowBtn from "@/components/BuyNowBtn";

// Server Component: Fetches data directly on the server before rendering HTML
export default async function ProductDetailsPage({ params }) {
  // Dynamic Route Handling
  // In Next.js 15+, params are asynchronous and must be awaited to access the 'id'
  const { id } = await params; 

  await connectToDatabase();
  
  // Database Query
  // .lean() returns a plain JS object instead of a heavy Mongoose document (Better Performance)
  const product = await Product.findById(id).populate('category').lean();

  // Data Serialization
  // Explicitly converts MongoDB ObjectIDs to strings to strictly comply with Next.js Client Component props
  if (product) {
      product._id = product._id.toString();
      if (product.category) {
        product.category._id = product.category._id.toString();
      }
  }

  // Edge Case: Handle invalid IDs or deleted products
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
        {/* Navigation Breadcrumb */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
          ← Back to store
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Product Image */}
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

            {/* Right Column: Product Metadata & Actions */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-2">
                {product.category?.name || "General"}
              </span>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Action Buttons Section */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
                <AddToCartBtn product={product} />
                <BuyNowBtn product={product} />
              </div>

              {/* Trust Badges (Visual Only) */}
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