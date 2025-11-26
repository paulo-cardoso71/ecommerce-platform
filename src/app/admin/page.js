export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      {/* Cards de Exemplo (Depois vamos conectar com dados reais do banco) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">$0.00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Orders</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}