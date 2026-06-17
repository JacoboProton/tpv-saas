"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type CartItem = Product & { qty: number };

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: "1", name: "Cheeseburger", price: 3.5, category: "Burger" },
    { id: "2", name: "Big Mac", price: 5.9, category: "Burger" },
    { id: "3", name: "Coca Cola", price: 2, category: "Drinks" },
    { id: "4", name: "Fries", price: 2.5, category: "Food" },
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);

      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="h-screen grid grid-cols-3 bg-gray-100">

      {/* 📂 CATEGORÍAS */}
      <div className="bg-white p-3">
        <h2 className="font-bold mb-2">📂 Categorías</h2>

        {["Burger", "Drinks", "Food"].map((c) => (
          <button
            key={c}
            className="block w-full p-2 mb-2 bg-gray-200"
          >
            {c}
          </button>
        ))}
      </div>

      {/* 🍔 PRODUCTOS */}
      <div className="p-3 overflow-auto">
        <h2 className="font-bold mb-2">🍔 Productos</h2>

        <div className="grid grid-cols-2 gap-2">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white p-3 shadow rounded text-left"
            >
              <p className="font-bold">{p.name}</p>
              <p className="text-sm">{p.price} €</p>
            </button>
          ))}
        </div>
      </div>

      {/* 🧾 TICKET */}
      <div className="bg-white p-3 flex flex-col">
        <h2 className="font-bold mb-2">🧾 Ticket</h2>

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.qty}x {item.name}
              </span>
              <span>{item.price * item.qty}€</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-2">
          <p className="text-xl font-bold">Total: {total}€</p>

          <button className="bg-green-600 text-white w-full p-2 mt-2">
            💳 Cobrar
          </button>

          <button className="bg-black text-white w-full p-2 mt-2">
            🍳 Enviar a cocina
          </button>
        </div>
      </div>

    </div>
  );
}