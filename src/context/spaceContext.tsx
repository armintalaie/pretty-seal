import { createContext, useContext, useEffect, useState } from "react";
import { SpaceInfo } from "../pages/space/setup/spaceSetup";
import { API_BASE_URL } from "../services/apiHandler";
import { ThemeContext } from "./themeContext";

interface SpaceController {
  logIntoSpace: Function;
  createSpace: Function;
  logOutOfSpace: Function;
  getSpaceBrief: Function;
}

interface ISpace {
  spaceInfo?: SpaceInfo;
  spaceController: SpaceController;
}

const DEFAULT_SPACE = {
  spaceInfo: undefined,
  spaceController: {
    logIntoSpace: () => {},
    createSpace: () => {},
    logOutOfSpace: () => {},
    getSpaceBrief: () => {},
  },
};

export const SpaceContext = createContext<ISpace>(DEFAULT_SPACE);

export default function SpaceProvider({ children }: { children: JSX.Element }) {
  const [currentSpace, setCurrentSpace] = useState<ISpace>(DEFAULT_SPACE);
  const { changeTheme } = useContext(ThemeContext);

  const storeCredentials = (spaceId: string, clientSecret: string) => {
    window.sessionStorage.setItem("domainId", spaceId);
    window.sessionStorage.setItem("clientSecret", clientSecret);
  };

  const logIntospace = async (spaceId: string, spacePassKey?: string) => {
    let secret = spacePassKey ? { clientSecret: spacePassKey } : {};
    const result = await fetch(`${API_BASE_URL}/spaces/${spaceId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(secret),
    });

    if (result.status === 200) {
      const space = await result.json();
      storeCredentials(space.domainId, space.clientSecret);
      setCurrentSpace((prev) => {
        return { ...prev, spaceInfo: space };
      });
    } else {
      window.sessionStorage.clear();
    }
  };

  useEffect(() => {
    const spaceId = window.sessionStorage.getItem("domainId");
    const clientSecret = window.sessionStorage.getItem("clientSecret");
    if (spaceId && clientSecret) {
      logIntospace(spaceId, clientSecret);
    }
    changeTheme();
  }, []);

  useEffect(() => {
    changeTheme();
  }, [currentSpace.spaceInfo]);

  const createSpace = async (id: string, name: string) => {
    const result = await fetch(`${API_BASE_URL}/spaces/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: name }),
    });

    if (result.status === 200) {
      const space = await result.json();
      storeCredentials(space.domainId, space.clientSecret);
      setCurrentSpace((prev) => {
        return { ...prev, spaceInfo: space };
      });
    }
  };

  const getSpaceBrief = async (id: string) => {
    const result = await fetch(`${API_BASE_URL}/spaces/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      const space = await result.json();
      return space;
    } else {
      return undefined;
    }
  };

  const logOutOfSpace = () => {
    window.sessionStorage.clear();
    setCurrentSpace((prev) => {
      return { ...prev, spaceInfo: undefined };
    });
  };

  useEffect(() => {
    const spaceHandler = {
      spaceInfo: undefined,
      spaceController: {
        logIntoSpace: logIntospace,
        createSpace: createSpace,
        logOutOfSpace: logOutOfSpace,
        getSpaceBrief: getSpaceBrief,
      },
    };

    setCurrentSpace(spaceHandler);
  }, []);

  return <SpaceContext.Provider value={currentSpace}>{children}</SpaceContext.Provider>;
}
