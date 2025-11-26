'use client'; // 1. Obrigatório porque o usuário vai digitar

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Importante para redirecionar

export default function NewCategoryPage() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Para travar o botão enquanto salva
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Começou a salvar...

    try {
      // 2. O famoso FETCH (O Carteiro)
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Transformamos os dados em texto JSON para viajar na rede
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        // 3. Se deu certo (200 OK)
        router.push('/admin/categories'); // Volta para a tabela
        router.refresh(); // Atualiza os dados da tabela
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
        
        {/* Campo NOME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input 
            type="text" 
            placeholder="Ex: Sneakers"
            required // HTML5 valida se está vazio
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>

        {/* Campo DESCRIÇÃO */}
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

        {/* Botão de Salvar Inteligente */}
        <button 
          type="submit" 
          disabled={loading} // Desabilita se estiver salvando
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-300"
        >
          {loading ? 'Saving...' : 'Save Category'}
        </button>

      </form>
    </div>
  );
}