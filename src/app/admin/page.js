import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminChart from "@/components/AdminChart"; 
import { DollarSign, ShoppingBag, Package } from "lucide-react"; 

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/login");

  await connectToDatabase();

  const productsCount = await Product.countDocuments();
  const orders = await Order.find({ status: 'paid' }).lean();
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
           {/* CORREÇÃO AQUI: store's -> store&apos;s */}
           <p className="text-gray-500 mt-1">Overview of your store&apos;s performance</p>
        </div>
        <div className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-100">
           Last updated: Just now
        </div>
      </div>
      
      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10 relative">
             <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toFixed(2)}</h3>
             </div>
             <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <DollarSign className="w-6 h-6" />
             </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10 relative">
             <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Orders</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</h3>
             </div>
             <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <ShoppingBag className="w-6 h-6" />
             </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Card 3: Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10 relative">
             <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Products</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{productsCount}</h3>
             </div>
             <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Package className="w-6 h-6" />
             </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
        </div>

      </div>

      <AdminChart />
    </div>
  );
}