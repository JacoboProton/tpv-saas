"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

interface CategoryListProps {
  selectedCategoryId?: string;
  onCategorySelect: (categoryId: string | undefined) => void;
}

export default function CategoryList({ selectedCategoryId, onCategorySelect }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando categorías...</div>;
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => onCategorySelect(undefined)}
        className={`w-full text-left p-3 rounded-lg transition-colors ${
          !selectedCategoryId
            ? "bg-blue-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        📁 Todos
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`w-full text-left p-3 rounded-lg transition-colors ${
            selectedCategoryId === category.id
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          📂 {category.name}
        </button>
      ))}
    </div>
  );
}
