"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

type Item = {
  id: string;
  ticketId: string;
  productName: string;
  quantity: number;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
};

export default function KDSPage() {
  const [items, setItems] = useState<Item[]>([]);

  // 📡 escuchar nuevos pedidos
  useEffect(() => {
    socket.on("kds:new", (data) => {
      setItems((prev) => [...prev, data.item]);
    });

    socket.on("kds:update", (update) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === update.id
            ? { ...item, status: update.status }
            : item
        )
      );
    });

    return () => {
      socket.off("kds:new");
      socket.off("kds:update");
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/kds/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kitchenItemId: id,
        status,
      }),
    });
  };

  const Column = ({ title, filter }: any) => (
    <div className="bg-gray-100 p-3 rounded h-full">
      <h2 className="font-bold mb-3">{title}</h2>

      <div className="space-y-2">
        {items.filter(filter).map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 shadow rounded border"
          >
            <p className="font-bold">Ticket: {item.ticketId}</p>
            <p>{item.productName}</p>
            <p>Cant: {item.quantity}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus(item.id, "IN_PROGRESS")}
                className="bg-yellow-500 text-white px-2 py-1 text-xs"
              >
                Preparar
              </button>

              <button
                onClick={() => updateStatus(item.id, "DONE")}
                className="bg-green-600 text-white px-2 py-1 text-xs"
              >
                Listo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-screen">
      <Column
        title="📥 Pendientes"
        filter={(i: Item) => i.status === "PENDING"}
      />

      <Column
        title="👨‍🍳 Preparando"
        filter={(i: Item) => i.status === "IN_PROGRESS"}
      />

      <Column
        title="✅ Listos"
        filter={(i: Item) => i.status === "DONE"}
      />
    </div>
  );
}