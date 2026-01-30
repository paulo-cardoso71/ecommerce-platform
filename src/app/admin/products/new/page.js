'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Save, Star } from 'lucide-react'; // Icons

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price: Number(price), imageUrl, category: categoryId, featured }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert("Error saving product");
      }
    } catch (error) {
      alert("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
           <p className="text-sm text-gray-500">Create a new item for your store catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Product Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Nike Air Max 90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-40 resize-none"
                  placeholder="Describe your product..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="font-semibold text-gray-800 mb-4 text-lg">Media</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="flex gap-2">
                   <input 
                    type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                    className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://..."
                   />
                </div>
                {imageUrl && (
                  <div className="mt-4 h-40 w-40 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                     <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Organization</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                       <input 
                          type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)}
                          className="w-full pl-7 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          placeholder="0.00"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={categoryId} onChange={e => setCategoryId(e.target.value)} required
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                       <option value="">Select...</option>
                       {categories.map(cat => (
                         <option key={cat._id} value={cat._id}>{cat.name}</option>
                       ))}
                    </select>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Star className="w-5 h-5 fill-current" />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900">Featured Product</h4>
                    <p className="text-xs text-indigo-700 mt-1">Show this product in the Hero section of the homepage.</p>
                    
                    <div className="mt-3 flex items-center gap-2">
                       <input 
                          type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                       />
                       <label htmlFor="featured" className="text-sm font-medium text-indigo-800 cursor-pointer">Enable Feature</label>
                    </div>
                 </div>
              </div>
           </div>

           <button 
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-bold shadow-sm disabled:opacity-50"
           >
              <Save className="w-4 h-4" />
              {loading ? 'Creating...' : 'Publish Product'}
           </button>
        </div>

      </form>
    </div>
  );
}