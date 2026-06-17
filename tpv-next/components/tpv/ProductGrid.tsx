"use client";

import { useEffect, useState } from "react";
import { useCart } from "./useCart";

type Product = {
  id: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
};

export default function ProductGrid({ categoryId }: { categoryId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = categoryId 
          ? `/api/products?categoryId=${categoryId}`
          : '/api/products';
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map(p => (
        <button
          key={p.id}
          onClick={() => addItem({ id: p.id, name: p.name, price: p.price })}
          className="p-4 border rounded bg-white hover:bg-gray-100 transition-colors"
        >
          <p className="font-bold">{p.name}</p>
          <p className="text-gray-600">{p.price.toFixed(2)}€</p>
          <p className="text-xs text-gray-400 mt-1">{p.category.name}</p>
        </button>
      ))}
    </div>
  );
}