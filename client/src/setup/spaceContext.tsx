import { createContext, useEffect, useState } from "react";
import { SpaceInfo } from "../components/spaces/spaceSetup/spaceSetup";

interface SpaceController {
  logIntoSpace: Function;
  createSpace: Function;
  logOutOfSpace: Function;
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
  },
};

export const SpaceContext = createContext<ISpace>(DEFAULT_SPACE);

export default function SpaceProvider({ children }: { children: JSX.Element }) {
  const [currentSpace, setCurrentSpace] = useState<ISpace>(DEFAULT_SPACE);

  const logIntospace = async (spaceId: string, spacePassKey: string) => {
    const result = await fetch(`http://localhost:8080/spaces/${spaceId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientSecret: spacePassKey }),
    });

    if (result.status === 200) {
      const space = await result.json();
      setCurrentSpace((prev) => {
        return { ...prev, spaceInfo: space };
      });
    }
  };

  const createSpace = async (id: string, name: string) => {
    const result = await fetch("http://localhost:8080/spaces/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: name }),
    });

    if (result.status === 200) {
      const space = await result.json();

      setCurrentSpace((prev) => {
        return { ...prev, spaceInfo: space };
      });
    }
  };

  const logOutOfSpace = () => {
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
      },
    };

    setCurrentSpace(spaceHandler);
  }, []);

  return (
    <SpaceContext.Provider value={currentSpace}>
      {children}
    </SpaceContext.Provider>
  );
}
