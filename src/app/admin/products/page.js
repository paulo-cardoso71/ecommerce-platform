import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import DeleteProductBtn from "@/components/DeleteProductBtn"; 
import { Plus, Pencil, Search, Star, Image as ImageIcon } from "lucide-react";

// Helper to format currency (USD)
const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default async function ProductsPage() {
  await connectToDatabase();

  // Fetch products with Category data, sorted by newest
  const products = await Product.find()
    .populate('category')
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your store catalog ({products.length} items)</p>
        </div>
        <Link href="/admin/products/new">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Visual Search Bar (Static for now) */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex gap-4">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
             />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No products found</p>
                      <p className="text-sm text-gray-500">Get started by creating a new product.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/80 transition-colors group">
                    
                    {/* Column 1: Image & Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-[200px]">
                            {product.description?.substring(0, 40)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category Badge */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Column 3: Price */}
                    <td className="px-6 py-4 text-gray-600 font-medium font-mono text-sm">
                      {formatPrice(product.price)}
                    </td>

                    {/* Column 4: Status (Featured) */}
                    <td className="px-6 py-4">
                      {product.featured && (
                        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 w-fit">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </div>
                      )}
                    </td>

                    {/* Column 5: Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                          <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                        </Link>
                        
                        {/* Wrapper for the delete button to ensure alignment */}
                        <div className="flex items-center">
                           <DeleteProductBtn id={product._id.toString()} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}