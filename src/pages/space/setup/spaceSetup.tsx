import { useContext, useState } from "react";
import { Configration } from "../../../context/configurationContext";
import { SocketContext } from "../../../context/socketContext";
import { SpaceContext } from "../../../context/spaceContext";
import Info from "../../../components/common/info/info";

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

  const backButton = (
    <div className="back">
      <button onClick={() => setShowCreate(SPACESTATUS.SETUP)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_23488)">
            <path
              d="M21 12L3 12M3 12L9 5M3 12L9 19"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_23488">
              <rect width="24" height="24" fill="black" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );

  const createSpaceContent = (
    <>
      <input
        type="text"
        name="name"
        placeholder="Space Name"
        value={spaceName}
        onChange={(e) => setSpaceName(e.target.value)}
      />
      <div>
        <button onClick={() => createSpace()}>Create Space</button>
      </div>
    </>
  );

  const joinSpaceContent = (
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
      <div>
        <button onClick={() => logIntoSpace()}>Log into Space</button>
      </div>
    </>
  );

  return (
    <div className="sub block">
      <Info>
        <p>
          A <b>Space</b> is a fully customizable and scalable chatty seal variant for your needs.
          customize, limit and configure all your rooms
        </p>
      </Info>

      <div className="start">
        <form onSubmit={(e) => e.preventDefault()}>
          {showCreate === SPACESTATUS.SETUP && (
            <>
              <button onClick={() => setShowCreate(SPACESTATUS.CREATE)}>Create Space</button>
              <button onClick={() => setShowCreate(SPACESTATUS.JOIN)}>Join Space</button>
            </>
          )}
          {showCreate !== SPACESTATUS.SETUP && backButton}
          {showCreate === SPACESTATUS.CREATE && createSpaceContent}
          {showCreate === SPACESTATUS.JOIN && joinSpaceContent}
        </form>
      </div>
    </div>
  );
}
