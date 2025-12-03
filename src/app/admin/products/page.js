import Link from "next/link";
import Category from "@/models/Category"; 
import connectToDatabase from "@/lib/db";
import DeleteProductBtn from "@/components/DeleteProductBtn";
import Product from "@/models/Product";

// Server Component: Fetches data directly on the server (No API fetch needed)
export default async function ProductsPage() {
  await connectToDatabase();

  // Data Fetching Strategy:
  // 1. .populate('category'): Joins with Category collection to get names
  // 2. .lean(): Returns plain JavaScript objects for better performance
  // 3. .sort(): Orders by newest first
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          + Add New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No Products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">${product.price}</td>
                  
                  {/* Optional Chaining (?.) prevents crashes if a category was deleted */}
                  <td className="py-3 px-4 text-indigo-600 font-medium">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link 
                      href={'/admin/products/edit/' + product._id}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </Link>

                    {/* Client Component Island: Handles the interactivity of deletion */}
                    <DeleteProductBtn id={product._id.toString()} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}