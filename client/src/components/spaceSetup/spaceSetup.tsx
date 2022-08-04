import { useContext, useEffect, useState } from "react";
import Space from "../../pages/space";
import { Configration } from "../../setup/configurationContext";
import { SocketContext } from "../../setup/socketContext";
import { SpaceContext } from "../../setup/spaceContext";
import Button from "../common/button";

export interface Limitation {
  applyTheme: boolean;
  controlInvite: boolean;
  controlLeave: boolean;
  customizeMessage: boolean;
  sendBroadcasts: boolean;
  chatBackup: boolean;
  activeRoomLimit: number;
}

export interface SpaceInfo {
  domainId: string;
  name: string;
  clientSecret: string;
  configuration: Configration;
  limitation: Limitation;
  rooms: string[];
}

export default function SpaceSetup({
  updateRoomId,
  placeHolderId,
}: {
  updateRoomId: Function;
  placeHolderId: string;
}) {
  const socket = useContext(SocketContext);
  const { domainId, clientSecret, updateSpace } = useContext(SpaceContext);
  const [spaceId, setSpaceId] = useState(domainId);
  const [displayName, setdisplayName] = useState(
    clientSecret !== undefined ? clientSecret : " "
  );
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo | undefined>(undefined);

  useEffect(() => {
    if (domainId !== "") logIntoSpace();
  }, []);

  const createSpace = async () => {
    const result = await fetch("http://localhost:8080/spaces/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: socket.id, name: displayName }),
    });

    const info: SpaceInfo = await result.json();
    updateSpace({ domainId: info.domainId, clientSecret: info.clientSecret });
    setSpaceInfo(info);
  };

  const logIntoSpace = async () => {
    const result = await fetch(`http://localhost:8080/spaces/${spaceId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientSecret: displayName }),
    });
    const info: SpaceInfo = await result.json();

    updateSpace({ domainId: info.domainId, clientSecret: info.clientSecret });
    if (info.clientSecret) setSpaceInfo(info);
  };

  useEffect(() => {
    socket.on("room:post", (roomId) => {});

    return () => {
      socket.off("room:post");
    };
  }, []);

  if (spaceInfo !== undefined) {
    return <Space {...spaceInfo} />;
  }

  return (
    <div className="intro">
      <div className="info">
        {clientSecret}
        <p>
          A <b>Space</b> is a fully customizable and scalable chatty seal
          variant for your needs. customize, limit and configure all your rooms
        </p>
      </div>
      <div className="start">
        <input
          type="text"
          name="name"
          placeholder="Space id"
          value={spaceId}
          onChange={(e) => setSpaceId(e.target.value)}
        />

        <input
          type="password"
          name="name"
          placeholder="Space Passkey"
          value={displayName}
          onChange={(e) => setdisplayName(e.target.value)}
        />

        <Button label="Log in to Space" onClick={() => logIntoSpace()} />
        <div>
          <h3>OR</h3>
        </div>
        <Button label="Create Space" onClick={() => createSpace()} />
      </div>
    </div>
  );
}
