import { createContext, useEffect, useState } from "react";

interface ISpace {
  domainId: string;
  clientSecret?: string;
  updateSpace: Function;
}

export const SpaceContext = createContext<ISpace>({
  domainId: "MAIN_ROOM",
  updateSpace: () => {},
});

export default function SpaceProvider({ children }: { children: JSX.Element }) {
  const [currentSpace, setCurrentSpace] = useState<ISpace>({
    domainId: "MAIN_ROOM",
    updateSpace: () => {},
  });

  const changeSpace = ({
    domainId,
    clientSecret,
  }: {
    domainId: string;
    clientSecret?: string;
  }) => {
    const copy: ISpace = { domainId, clientSecret, updateSpace: changeSpace };
    setCurrentSpace(copy);
  };

  return (
    <SpaceContext.Provider
      value={{
        domainId: currentSpace.domainId,
        updateSpace: changeSpace,
        clientSecret: currentSpace.clientSecret,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
}
