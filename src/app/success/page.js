import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <span className="text-6xl">✅</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Successful!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. We have received your order and are preparing it for shipment.
        </p>
        <Link 
          href="/" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}