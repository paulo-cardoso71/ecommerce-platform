'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Star, Trash2 } from 'lucide-react';

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(cats => setCategories(cats));

    fetch('/api/products?id=' + id)
      .then(res => res.json())
      .then(product => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImageUrl(product.imageUrl || '');
        setFeatured(product.featured || false);
        
        if (product.category && product.category._id) {
          setCategoryId(product.category._id);
        } else {
          setCategoryId(product.category);
        }
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, description, price: Number(price), imageUrl, category: categoryId, featured }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert("Error updating");
      }
    } catch (error) {
      alert("Connection error");
    } finally {
      setLoading(false);
    }
  };

  // Classe de Input com ALTO CONTRASTE
  const inputClass = "w-full p-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-gray-900 placeholder:text-gray-500 font-medium";

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
           <p className="text-sm text-gray-600">Update product details and settings.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Product Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  required value={description} onChange={e => setDescription(e.target.value)}
                  className={`${inputClass} h-40 resize-none`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="font-bold text-gray-900 mb-4 text-lg">Media</h3>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <input 
                  type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                  className={inputClass}
                />
                {imageUrl && (
                  <div className="mt-4 h-40 w-40 rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                     <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Details</h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (USD)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
                       <input 
                          type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)}
                          className={`${inputClass} pl-7`}
                       />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select 
                      value={categoryId} onChange={e => setCategoryId(e.target.value)} required
                      className={`${inputClass} bg-white`}
                    >
                       <option value="">Select...</option>
                       {categories.map(cat => (
                         <option key={cat._id} value={cat._id}>{cat.name}</option>
                       ))}
                    </select>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                    <Star className="w-5 h-5 fill-current" />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-indigo-900">Featured</h4>
                    <p className="text-xs text-indigo-800 mt-1 font-medium">Show on Homepage Hero.</p>
                    <div className="mt-3 flex items-center gap-2">
                       <input 
                          type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer border-gray-400"
                       />
                       <label className="text-sm font-bold text-indigo-900">Enabled</label>
                    </div>
                 </div>
              </div>
           </div>

           <button 
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-bold shadow-sm disabled:opacity-50"
           >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Update Product'}
           </button>
        </div>

      </form>
    </div>
  );
}