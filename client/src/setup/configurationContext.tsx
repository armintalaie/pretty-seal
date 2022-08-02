import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ThemeDetail } from "../components/theming/themes";
const SERVER = "http://localhost:8080";

export const DEFAULT_THEME = {
  primaryColor: "#fdff",
  secondaryColor: "#ff3dff",
  textColor: "#ffffff",
  secondaryTextColor: "#ffffff",
  isLightMode: false,
};

export const DEFAULT_CONFIG: Configration = {
  theme: DEFAULT_THEME,
  showInvite: true,
  canInvite: true,
  showLeave: true,
  chatBackup: false,
  showNavBar: true,
};

export const ConfigurationContext = createContext<Configration>(DEFAULT_CONFIG);

export interface Configration {
  theme: ThemeDetail;
  showInvite: boolean;
  showLeave: boolean;
  canInvite: boolean;
  customInfoMessage?: string;
  chatBackup: boolean;
  showNavBar: boolean;
}

export const ConfigurationContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [configuration, setConfiguration] =
    useState<Configration>(DEFAULT_CONFIG);

  useEffect(() => {
    fetch("http://localhost:8080/spaces/MAIN_ROOM/configuration", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((config) => setConfiguration(config));
  }, []);

  return (
    <ConfigurationContext.Provider value={configuration}>
      {children}
    </ConfigurationContext.Provider>
  );
};
