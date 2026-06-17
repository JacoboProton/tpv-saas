export default function ProductGrid({ onAdd }) {
  const products = [
    { id: "1", name: "Café solo", price: 1.2 },
    { id: "2", name: "Café con leche", price: 1.5 },
    { id: "3", name: "Tostada", price: 2 },
    { id: "4", name: "Burger", price: 5.5 },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onAdd(p)}
          className="bg-white shadow rounded-xl p-4 active:scale-95"
        >
          <div className="font-bold">{p.name}</div>
          <div className="text-gray-500">{p.price.toFixed(2)} €</div>
        </button>
      ))}
    </div>
  );
}