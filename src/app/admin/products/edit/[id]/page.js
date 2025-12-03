'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  // Estados do Formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  // NOVO ESTADO: Destaque
  const [featured, setFeatured] = useState(false);
  
  // Listas e Loadings
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Search categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(cats => setCategories(cats));

    // Search the product
    fetch('/api/products?id=' + id)
      .then(res => res.json())
      .then(product => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImageUrl(product.imageUrl || '');
        
        // Load featured state
        setFeatured(product.featured || false);
        
        // Category ID logic
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
        body: JSON.stringify({ 
          id, 
          name, 
          description, 
          price: Number(price), 
          imageUrl, 
          category: categoryId,
          featured 
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert("Erro ao atualizar");
      }
    } catch (error) {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input 
            type="text" required value={name} onChange={e => setName(e.target.value)}
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
            <option value="">Select Category...</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 h-24"
          />
        </div>

        {/* Preço e Imagem */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input 
              type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
              type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-gray-900"
            />
          </div>
        </div>

        {/* --- NOVO: CHECKBOX DE DESTAQUE --- */}
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md mt-4">
          <input 
            type="checkbox" 
            id="featured"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="featured" className="font-medium text-yellow-800 cursor-pointer select-none">
            ⭐ Highlight this product on Homepage (Hero Section)
          </label>
        </div>

        <div className="flex gap-4 mt-6">
            <button 
                type="button" onClick={() => router.back()}
                className="w-1/3 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
                Cancel
            </button>
            <button 
                type="submit" disabled={loading}
                className="w-2/3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400 font-bold"
            >
                {loading ? 'Saving...' : 'Update Product'}
            </button>
        </div>

      </form>
    </div>
  );
}