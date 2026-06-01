import { Server } from "socket.io";

let io: Server;

export const initSocket = (
  server: any
) => {

  io = new Server(
    server,
    {
      cors: {
        origin: "*",
        methods: [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  );

  io.on(
    "connection",
    socket => {

      console.log(
        "Client Connected:",
        socket.id
      );

      socket.on(
        "disconnect",
        () => {

          console.log(
            "Client Disconnected:",
            socket.id
          );
        }
      );
    }
  );

  return io;
};

export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.IO not initialized"
    );
  }

  return io;
};