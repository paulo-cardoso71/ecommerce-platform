import Link from "next/link";
import Category from "@/models/Category"; // Importando o Model direto (Server Component)
import connectToDatabase from "@/lib/db";
import DeleteProductBtn from "@/components/DeleteProductBtn";
import Product from "@/models/Product";

export default async function ProductsPage() {
  // 1. Busca os dados no Banco (Server-Side é direto, sem fetch API!)
  await connectToDatabase();

  // Buscamos os produtos e transformamos em JSON puro (.lean())
  // O .populate troca o ID da categoria pelo objeto real (Nome, Descrição...)
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          + Add New
        </Link>
      </div>

      {/* Tabela de Listagem */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            {/* Cabeçalho */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Corpo */}
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No Products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">{product.price}</td>
                  {/* O ?. serve pra não quebrar se a categoria tiver sido deletada */}
                  <td className="py-3 px-4 text-indigo-600 font-medium">{product.category?.name || "Sem Categoria"}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link 
                      href={'/admin/products/edit/' + product._id}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </Link>

                    {/* Precisamos criar esse botão, pois o de Categoria apaga na tabela errada! */}
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