'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  // NOVO: Estado do Destaque
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
        body: JSON.stringify({ 
          name, 
          description, 
          price: Number(price), 
          imageUrl, 
          category: categoryId,
          featured // <--- Enviando o destaque na criação
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert("Erro ao salvar");
      }
    } catch (error) {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input 
            type="text" placeholder="Ex: iPhone 15" required
            value={name} onChange={e => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            value={categoryId} onChange={e => setCategoryId(e.target.value)} required
            className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white"
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            placeholder="Product details..."
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 h-24"
          />
        </div>

        {/* Preço e Imagem */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
            <input 
              type="number" step="0.01" placeholder="0.00" required
              value={price} onChange={e => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
              type="text" placeholder="http://..."
              value={imageUrl} onChange={e => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
            />
          </div>
        </div>

        {/* --- CHECKBOX DE DESTAQUE --- */}
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md mt-4">
          <input 
            type="checkbox" 
            id="featured"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="featured" className="font-medium text-yellow-800 cursor-pointer select-none">
            ⭐ Highlight this product on Homepage
          </label>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 disabled:bg-emerald-300 font-bold mt-6"
        >
          {loading ? 'Saving...' : 'Create Product'}
        </button>

      </form>
    </div>
  );
}