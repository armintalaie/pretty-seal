import { createContext, useEffect, useState } from "react";
import { Manager, Socket } from "socket.io-client";
import { API_BASE_URL } from "../services/apiHandler";

export const SocketContext = createContext<Socket>({} as Socket);

export const SocketContextProvider = ({
  children,
  domain,
}: {
  children: JSX.Element;
  domain: string;
}) => {
  const manager = new Manager(API_BASE_URL);
  const [socket, setSocket] = useState(manager.socket(`/${domain}`));

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
