'use client';

import { useState, useEffect, use } from 'react'; 
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Layers } from 'lucide-react';

export default function EditCategoryPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories?id=' + id) 
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, description }),
      });

      if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        alert("Error updating category");
        setLoading(false);
      }
    } catch (error) {
      alert("Connection error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
           <p className="text-sm text-gray-500">Update collection details.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
           <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Layers className="w-5 h-5" />
           </div>
           <h3 className="font-semibold text-gray-900">Category Details</h3>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 transition-all h-32 resize-none"
              />
            </div>

            <div className="pt-4 flex gap-3">
               <button 
                type="button"
                onClick={() => router.back()} 
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Update Category'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}