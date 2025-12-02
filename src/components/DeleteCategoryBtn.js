'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCategoryBtn({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete category");
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