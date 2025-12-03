import Link from "next/link";
import Category from "@/models/Category"; // Importing model
import connectToDatabase from "@/lib/db";
import DeleteCategoryBtn from "@/components/DeleteCategoryBtn";

export default async function CategoriesPage() {
  // 1. Search data in bank
  await connectToDatabase();
  // .lean() 
  const categories = await Category.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      
      {/* Page header*/}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Link 
          href="/admin/categories/new" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          + Add New
        </Link>
      </div>

      {/* List Table*/}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No categories found. Start by creating one!
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{category.name}</td>
                  <td className="py-3 px-4 text-gray-600">{category.description}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link 
                      href={'/admin/categories/edit/' + category._id}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <DeleteCategoryBtn id={category._id.toString()} />
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