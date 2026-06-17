"use client";

import { useCart } from "./useCart";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clear, itemCount } = useCart();

  const handleCharge = () => {
    // TODO: Implement payment logic
    alert("Función de cobrar pendiente de implementar");
  };

  const handleSendToKitchen = () => {
    // TODO: Implement send to kitchen logic
    alert("Función de enviar a cocina pendiente de implementar");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🧾 Ticket</h2>
        <span className="text-sm text-gray-500">{itemCount()} artículos</span>
      </div>

      <div className="flex-1 overflow-auto space-y-2">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            El carrito está vacío
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-3 rounded-lg bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.price.toFixed(2)}€ x {item.qty} = {(item.price * item.qty).toFixed(2)}€
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.qty - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>{total().toFixed(2)}€</span>
        </div>

        <button
          onClick={handleCharge}
          disabled={items.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-3 rounded-lg font-medium transition-colors"
        >
          💳 Cobrar
        </button>

        <button
          onClick={handleSendToKitchen}
          disabled={items.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-lg font-medium transition-colors"
        >
          🍳 Enviar a cocina
        </button>

        <button
          onClick={clear}
          disabled={items.length === 0}
          className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 p-3 rounded-lg font-medium transition-colors"
        >
          🗑️ Vaciar carrito
        </button>
      </div>
    </div>
  );
}