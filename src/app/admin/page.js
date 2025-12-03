import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/login");

  await connectToDatabase();

  // 1.Searching real data
  const productsCount = await Product.countDocuments();
  const orders = await Order.find({ status: 'paid' }).lean(); // Only paid orders

  // 2. Total Revenue 
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        
        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Orders</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {orders.length}
          </p>
        </div>
        
        {/* Card 3: Products */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Products</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {productsCount}
          </p>
        </div>

      </div>

     
    </div>
  );
}