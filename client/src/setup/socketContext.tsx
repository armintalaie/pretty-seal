import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const SERVER = "http://localhost:8080";
const socket = io(SERVER);

export const SocketContext = createContext(socket);

export const SocketContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [isConnected]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
