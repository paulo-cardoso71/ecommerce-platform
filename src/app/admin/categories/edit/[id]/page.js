'use client';

import { useState, useEffect, use } from 'react'; // use é novidade do Next 15 para params
import { useRouter } from 'next/navigation';

export default function EditCategoryPage({ params }) {
  // No Next.js 15, params é uma Promise, precisamos do 'use' para ler
  const { id } = use(params);
  
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // --- O PULO DO GATO: Carregar os dados existentes ---
  useEffect(() => {
    // Busca os dados da categoria assim que a tela abre
    fetch('/api/categories?id=' + id) // Vamos precisar ajustar o GET na API para aceitar ID!
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
      // Aqui usamos PUT em vez de POST
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, description }),
      });

      if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        alert("Erro ao atualizar");
      }
    } catch (error) {
      alert("Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <div className="flex gap-2">
            <button 
            type="button"
            onClick={() => router.back()} // Botão de cancelar
            className="w-1/3 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
            >
            Cancel
            </button>
            <button 
            type="submit" 
            disabled={loading}
            className="w-2/3 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
            {loading ? 'Saving...' : 'Update Category'}
            </button>
        </div>
      </form>
    </div>
  );
}