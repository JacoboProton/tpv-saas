export default function Ticket({ cart, total, onRemove, onClear }) {
  return (
    <div className="flex flex-col h-full">
      
      <div className="flex-1 overflow-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <div>
              <div>{item.name}</div>
              <div className="text-sm text-gray-500">
                x{item.qty}
              </div>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-2">
        <div className="text-xl font-bold">
          TOTAL: {total.toFixed(2)} €
        </div>

        <button
          onClick={onClear}
          className="w-full bg-black text-white p-3 rounded-xl mt-2"
        >
          COBRAR
        </button>
      </div>
    </div>
  );
}