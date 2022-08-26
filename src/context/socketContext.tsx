import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { manager } from "../pages/home/home";
import { API_BASE_URL } from "../services/apiHandler";

export const SocketContext = createContext<Socket>(io(API_BASE_URL));

export const SocketContextProvider = ({
  children,
  domain,
}: {
  children: JSX.Element;
  domain: string;
}) => {
  const [socket, setSocket] = useState(manager.socket(`/${domain}`));

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
