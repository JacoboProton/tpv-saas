"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

type KDSItem = {
  ticketId: string;
  item: any;
  station: "KITCHEN" | "BAR";
};

export default function KDSPage() {
  const [orders, setOrders] = useState<KDSItem[]>([]);

  useEffect(() => {
    socket.on("kds:new", (data: KDSItem) => {
      setOrders((prev) => [...prev, data]);
    });

    return () => {
      socket.off("kds:new");
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 min-h-screen">
      <div>
        <h2 className="font-bold mb-2">🍳 Cocina</h2>

        {orders
          .filter(o => o.station === "KITCHEN")
          .map((o, i) => (
            <div key={i} className="bg-white p-3 mb-2">
              <p>Ticket: {o.ticketId}</p>
              <p>Producto: {o.item.productId}</p>
              <p>Cantidad: {o.item.quantity}</p>
            </div>
          ))}
      </div>

      <div>
        <h2 className="font-bold mb-2">🍺 Barra</h2>

        {orders
          .filter(o => o.station === "BAR")
          .map((o, i) => (
            <div key={i} className="bg-white p-3 mb-2">
              <p>Ticket: {o.ticketId}</p>
              <p>Producto: {o.item.productId}</p>
            </div>
          ))}
      </div>

      <div>
        <h2 className="font-bold mb-2">✅ Completados</h2>
      </div>
    </div>
  );
}