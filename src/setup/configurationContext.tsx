import { createContext, useContext, useEffect, useState } from "react";
import { defaultThemes, ThemeDetail } from "../components/layout/theming/themes";
import { API_BASE_URL } from "../services/apiHandler";
import { SpaceContext } from "./spaceContext";

// export const DEFAULT_THEME = {
//   primaryColor: "#fdff",
//   secondaryColor: "#ff3dff",
//   textColor: "#ffffff",
//   secondaryTextColor: "#ffffff",
//   isLightMode: false,
// };

export interface IConfigContext {
  config: Configration;
  updateConfig: Function;
}

export const ConfigurationContext = createContext<IConfigContext>(
  null as unknown as IConfigContext
);
export interface Configration {
  theme: ThemeDetail;
  rooms: RoomsConfig;
  users: UsersConfig;
  space: SpaceConfig;
}

export interface Config {
  [key: string]: boolean | number | string | undefined;
}

export interface RoomsConfig extends Config {
  showInvite: boolean;
  maxRoomMembers: number;
  showLeave: boolean;
  chatBackup: boolean;
  allowNonSpaceUsers: boolean;
  infoMessage?: string;
}
export interface SpaceConfig extends Config {
  showAppName: boolean;
  canCustomize: boolean;
}

export interface UsersConfig extends Config {}

const DEFAULT_ROOM_CONFIG = {
  showInvite: true,
  maxRoomMembers: 10,
  showLeave: true,
  chatBackup: false,
  allowNonSpaceUsers: true,
};

const DEFAULT_SPACE_CONFIG = {
  showAppName: true,
  canCustomize: true,
};

const DEFAULT_CONFIG: Configration = {
  theme: defaultThemes.sealyBlue,
  rooms: DEFAULT_ROOM_CONFIG,
  users: {},
  space: DEFAULT_SPACE_CONFIG,
};

export const ConfigurationContextProvider = ({
  domain,
  children,
}: {
  domain: string;
  children: JSX.Element;
}) => {
  const spaceConfig = useContext(SpaceContext).spaceInfo;
  const [configuration, setConfiguration] = useState<Configration>(
    spaceConfig ? DEFAULT_CONFIG : DEFAULT_CONFIG
  );

  useEffect(() => {
    updateConfig();
  }, []);

  const updateConfig = (ssp?: string) => {
    fetch(`${API_BASE_URL}/spaces/${domain}/configuration`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConfiguration(result.configuration);
      });
  };

  return (
    <ConfigurationContext.Provider value={{ config: configuration, updateConfig }}>
      {children}
    </ConfigurationContext.Provider>
  );
};
