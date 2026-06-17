"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

type BarItem = {
  id: string;
  status: string;
  createdAt: string;
  ticketItem: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
    };
    ticket: {
      id: string;
      createdBy: {
        name: string;
      };
    };
  };
};

type Product = {
  id: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
};

type CartItem = Product & { qty: number };

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

const useCart = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter(i => i.id !== id),
    })),
  updateQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map(i =>
        i.id === id ? { ...i, qty: Math.max(0, qty) } : i
      ).filter(i => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
  total: () =>
    get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));

export default function BarPage() {
  const [barItems, setBarItems] = useState<BarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const cart = useCart();

  async function fetchBarItems() {
    try {
      const response = await fetch('/api/bar/items');
      const data = await response.json();
      setBarItems(data);
    } catch (error) {
      console.error("Error fetching bar items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    setTimeout(fetchBarItems, 0);
    const interval = setInterval(fetchBarItems, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function markAsDone(itemId: string) {
    try {
      await fetch(`/api/bar/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DONE' })
      });
      fetchBarItems();
    } catch (error) {
      console.error("Error marking item as done:", error);
    }
  }

  async function createTicket() {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map(item => ({
            productId: item.id,
            quantity: item.qty,
            price: item.price,
            station: 'BAR'
          }))
        })
      });
      if (response.ok) {
        cart.clear();
        fetchBarItems();
        setShowProducts(false);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  }

  const pendingItems = barItems.filter(item => item.status === 'PENDING');
  const inProgressItems = barItems.filter(item => item.status === 'IN_PROGRESS');

  return (
    <div className="h-screen bg-gray-100">
      <div className="p-6 border-b bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">🍺 Caja del Bar</h1>
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {showProducts ? '📋 Ver Pedidos' : '➕ Nuevo Pedido'}
          </button>
        </div>
      </div>

      {showProducts ? (
        <div className="h-[calc(100vh-80px)] grid grid-cols-3">
          <div className="col-span-2 p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Productos</h2>
            <div className="grid grid-cols-3 gap-4">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => cart.addItem(product)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <p className="font-bold">{product.name}</p>
                  <p className="text-gray-600">{product.price.toFixed(2)}€</p>
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-1 bg-white border-l p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">🧾 Carrito</h2>
            <div className="flex-1 overflow-auto space-y-2">
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between items-center border p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price.toFixed(2)}€ x {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => cart.updateQuantity(item.id, item.qty - 1)} className="w-8 h-8 rounded bg-gray-200">-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => cart.updateQuantity(item.id, item.qty + 1)} className="w-8 h-8 rounded bg-gray-200">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <p className="text-lg font-bold">Total: {cart.total().toFixed(2)}€</p>
              <button
                onClick={createTicket}
                disabled={cart.items.length === 0}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-3 rounded-lg"
              >
                ✓ Enviar a Bar
              </button>
              <button
                onClick={() => cart.clear()}
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg"
              >
                🗑️ Vaciar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Cargando pedidos...</div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4 text-yellow-600">⏳ Pendientes ({pendingItems.length})</h2>
                <div className="space-y-3">
                  {pendingItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg">{item.ticketItem.product.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.ticketItem.quantity}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Ticket #{item.ticketItem.ticket.id} - {item.ticketItem.ticket.createdBy.name}
                          </p>
                        </div>
                        <button onClick={() => markAsDone(item.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                          ✓ Listo
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingItems.length === 0 && <p className="text-gray-400 text-center py-4">No hay pendientes</p>}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4 text-blue-600">🔄 En Proceso ({inProgressItems.length})</h2>
                <div className="space-y-3">
                  {inProgressItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg">{item.ticketItem.product.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.ticketItem.quantity}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Ticket #{item.ticketItem.ticket.id} - {item.ticketItem.ticket.createdBy.name}
                          </p>
                        </div>
                        <button onClick={() => markAsDone(item.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                          ✓ Listo
                        </button>
                      </div>
                    </div>
                  ))}
                  {inProgressItems.length === 0 && <p className="text-gray-400 text-center py-4">No hay en proceso</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
