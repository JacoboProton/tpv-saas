"use client";

import { useState } from "react";
import ProductGrid from "@/components/tpv/ProductGrid";
import Cart from "@/components/tpv/Cart";
import CategoryList from "@/components/tpv/CategoryList";

export default function TPVPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2 bg-gray-50 border-r p-4">
        <h2 className="text-xl font-bold mb-4">📂 Categorías</h2>
        <CategoryList 
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
      </div>

      <div className="col-span-7 p-4">
        <h1 className="text-2xl font-bold mb-4">TPV Restaurante</h1>
        <ProductGrid categoryId={selectedCategoryId} />
      </div>

      <div className="col-span-3 border-l p-4 bg-white">
        <Cart />
      </div>
    </div>
  );
}