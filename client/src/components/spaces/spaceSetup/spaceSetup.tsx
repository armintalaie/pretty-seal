import { ArrowLeftOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Configration } from "../../../setup/configurationContext";
import { SocketContext } from "../../../setup/socketContext";
import { SpaceContext } from "../../../setup/spaceContext";
import Button from "../../common/button/button";

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

enum SPACESTATUS {
  SETUP = "Setup",
  CREATE = "Create",
  JOIN = "Join",
}

export default function SpaceSetup() {
  const socket = useContext(SocketContext);
  const spaceManager = useContext(SpaceContext);
  const [showCreate, setShowCreate] = useState(SPACESTATUS.SETUP);
  const [spaceId, setSpaceId] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spacePassKey, setspacePassKey] = useState("");

  const createSpace = async () => {
    spaceManager.spaceController.createSpace(socket.id, spaceName);
  };

  const logIntoSpace = async () => {
    spaceManager.spaceController.logIntoSpace(spaceId, spacePassKey);
  };

  const createSpaceContent = () => {
    return (
      <>
        <input
          type="text"
          name="name"
          placeholder="Space Name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <Button label="Create Space" onClick={() => createSpace()} />
      </>
    );
  };

  const joinSpaceContent = () => {
    return (
      <>
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
          value={spacePassKey}
          onChange={(e) => setspacePassKey(e.target.value)}
        />
        <Button label="Log in to Space" onClick={() => logIntoSpace()} />
      </>
    );
  };

  return (
    <div className="sub block">
      <div className="info">
        <p>
          A <b>Space</b> is a fully customizable and scalable chatty seal
          variant for your needs. customize, limit and configure all your rooms
        </p>
      </div>

      <div className="start">
        {showCreate !== SPACESTATUS.SETUP && (
          <Button
            onClick={() => setShowCreate(SPACESTATUS.SETUP)}
            icon={<ArrowLeftOutlined />}
          />
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          {showCreate === SPACESTATUS.SETUP && (
            <>
              <Button
                label="Create Space"
                onClick={() => {
                  setShowCreate(SPACESTATUS.CREATE);
                }}
              />
              <Button
                label="Join Space"
                onClick={() => {
                  setShowCreate(SPACESTATUS.JOIN);
                }}
              />
            </>
          )}

          {showCreate === SPACESTATUS.CREATE && createSpaceContent()}
          {showCreate === SPACESTATUS.JOIN && joinSpaceContent()}
        </form>
      </div>
    </div>
  );
}
