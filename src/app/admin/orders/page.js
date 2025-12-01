import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User"; // Importante pro populate do usuário

export default async function AdminOrdersPage() {
  await connectToDatabase();

  // Buscamos os pedidos e trazemos os dados do Usuário dono do pedido
  const orders = await Order.find()
    .populate('user', 'name email') // Traz só nome e email do usuário
    .sort({ createdAt: -1 }) // Mais recentes primeiro
    .lean();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                  {/* ID curto pra não poluir a tela */}
                  <td className="py-3 px-4 font-mono text-xs text-gray-500">
                    {order._id.toString().slice(-6).toUpperCase()}
                  </td>
                  
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">
                      {order.user?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-bold text-gray-900">
                    ${order.totalAmount?.toFixed(2)}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'paid' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
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