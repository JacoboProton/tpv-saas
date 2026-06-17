import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 KDS conectado:", socket.id);
  });

  return io;
}

export function getIO() {
  return io;
}