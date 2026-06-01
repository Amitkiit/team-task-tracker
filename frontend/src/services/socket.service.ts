import { io } from "socket.io-client";

const SOCKET_URL =
  "http://13.206.238.178:5000";
  

export const socket =
  io(SOCKET_URL, {
    transports: ["websocket"]
  });