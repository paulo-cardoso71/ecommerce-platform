'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Important to redirect

export default function NewCategoryPage() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Locks the button when saving
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Starts saving...

    try {
      // FETCH
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Converting into json
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        // if it's ok : (200 OK)
        router.push('/admin/categories'); 
        router.refresh();
      } else {
        alert("Erro ao salvar categoria");
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input 
            type="text" 
            placeholder="Ex: Sneakers"
            required 
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input 
            type="text" 
            placeholder="Ex: Basketball shoes..."
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>

        {/*SAVE BUTTON */}
        <button 
          type="submit" 
          disabled={loading} // lock if its saving
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-300"
        >
          {loading ? 'Saving...' : 'Save Category'}
        </button>

      </form>
    </div>
  );
}