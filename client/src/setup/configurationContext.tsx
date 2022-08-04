import { createContext, useContext, useEffect, useState } from "react";
import { ThemeDetail } from "../components/theming/themes";
import { SpaceContext } from "./spaceContext";

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

export interface IConfigContext {
  config: Configration;
  updateConfig: Function;
}

export const ConfigurationContext = createContext<IConfigContext>({
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
});

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
  const { domainId } = useContext(SpaceContext);
  const [configuration, setConfiguration] =
    useState<Configration>(DEFAULT_CONFIG);

  useEffect(() => {
    updateConfig();
  }, []);

  const updateConfig = (ssp?: string) => {
    fetch(`http://localhost:8080/spaces/${domainId}/configuration`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((config) => {
        setConfiguration(config);
      });
  };

  return (
    <ConfigurationContext.Provider
      value={{ config: configuration, updateConfig }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
