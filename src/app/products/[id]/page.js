import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import AddToCartBtn from "@/components/AddToCartBtn";
import BuyNowBtn from "@/components/BuyNowBtn";
import { Star, Truck, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";

// Server Component
export default async function ProductDetailsPage({ params }) {
  const { id } = await params; 

  await connectToDatabase();
  const product = await Product.findById(id).populate('category').lean();

  if (product) {
      product._id = product._id.toString();
      if (product.category) {
        product.category._id = product.category._id.toString();
      }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-center py-40">
        <Navbar />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/" className="text-indigo-600 font-medium hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
           <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Store
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Sticky Image Gallery */}
          <div className="relative">
             <div className="sticky top-24 aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
               {product.imageUrl ? (
                 <img 
                   src={product.imageUrl} 
                   alt={product.name}
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
               ) : (
                 <div className="flex items-center justify-center h-full text-gray-300">No Image Available</div>
               )}
               
               {/* Floating Tag */}
               <div className="absolute top-6 left-6 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider z-10">
                  {product.category?.name || "General"}
               </div>
               {/* --------------------- */}

             </div>
          </div>

          {/* RIGHT COLUMN: Details & Actions */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-6">
               <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                 {product.name}
               </h1>
               
               {/* Fake Review Stars */}
               <div className="flex items-center gap-4">
                  <div className="flex text-amber-400">
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current opacity-50" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer">
                    Read 124 reviews
                  </span>
               </div>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-8 font-mono">
              ${product.price}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 border-b border-gray-100 pb-10">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-4 mb-10">
               <div className="grid grid-cols-2 gap-4 h-14">
                  <AddToCartBtn product={product} /> 
                  <BuyNowBtn product={product} />
               </div>
               <p className="text-center text-xs text-gray-400">Free shipping on orders over $200</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
               <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs font-semibold text-gray-700">Fast Delivery</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs font-semibold text-gray-700">Secure Payment</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-50 rounded-xl">
                  <RefreshCw className="w-6 h-6 text-indigo-600" />
                  <span className="text-xs font-semibold text-gray-700">Easy Returns</span>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}