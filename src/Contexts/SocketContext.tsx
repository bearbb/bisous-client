import { useContext, createContext } from "react";
import io from "socket.io-client";

export const socket = io("https://swanoogie.me", { autoConnect: false });
export const SocketContext = createContext(socket);

export const useSocketContext = () => useContext(SocketContext);
