import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/login");

  await connectToDatabase();

  // 1. Buscando dados reais do banco
  const productsCount = await Product.countDocuments();
  const orders = await Order.find({ status: 'paid' }).lean(); // Só conta pedidos pagos

  // 2. Calculando o Faturamento Total
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Faturamento */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        
        {/* Card 2: Pedidos */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Orders</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {orders.length}
          </p>
        </div>
        
        {/* Card 3: Produtos */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Products</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {productsCount}
          </p>
        </div>

      </div>

      {/* Dica visual para o futuro */}
      <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
        <h3 className="text-indigo-800 font-bold mb-2">🚀 Próximos Passos</h3>
        <p className="text-indigo-600 text-sm">
          Seu sistema está registrando pedidos corretamente. 
          O próximo grande nível seria integrar pagamentos reais com <strong>Stripe</strong>.
        </p>
      </div>
    </div>
  );
}