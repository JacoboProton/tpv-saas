"use client";

import { usePOS } from "@/components/pos/usePOS";
import CategoryList from "@/components/pos/CategoryList";
import ProductGrid from "@/components/pos/ProductGrid";
import Ticket from "@/components/pos/Ticket";

export default function POSPage() {
  const pos = usePOS();

  return (
    <div className="h-screen grid grid-cols-12 bg-gray-100">
      
      {/* CATEGORÍAS */}
      <div className="col-span-2 bg-white border-r">
        <CategoryList />
      </div>

      {/* PRODUCTOS */}
      <div className="col-span-7 p-2 overflow-auto">
        <ProductGrid onAdd={pos.addItem} />
      </div>

      {/* TICKET */}
      <div className="col-span-3 bg-white border-l p-2 flex flex-col">
        <Ticket
          cart={pos.cart}
          total={pos.total}
          onRemove={pos.removeItem}
          onClear={pos.clear}
        />
      </div>
    </div>
  );
}