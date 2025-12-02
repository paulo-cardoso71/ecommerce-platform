'use client'; // Must be Client Component for interaction (onClick)

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductBtn({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Native browser confirmation
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh(); // Refresh list instantly without full reload
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}