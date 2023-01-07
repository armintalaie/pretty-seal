import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Block from "../../../components/common/block";
import Info from "../../../components/common/info/info";
import { Configration } from "../../../context/configurationContext";
import { SpaceContext } from "../../../context/spaceContext";
import { ThemeContext } from "../../../context/themeContext";

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

export interface SpaceBrief {
  domainId: string;
  name: string;
}

export default function Login() {
  const spaceManager = useContext(SpaceContext);
  const { changeTheme } = useContext(ThemeContext);
  const [spaceBrief, setSpaceBrief] = useState<SpaceBrief | undefined>(undefined);
  const [spacePassKey, setspacePassKey] = useState("");
  let { id } = useParams();

  const getSpaceBrief = async () => {
    const info = await spaceManager.spaceController.getSpaceBrief(id);
    if (info) {
      changeTheme({ ...info.configuration.theme, isLightMode: true });
      setSpaceBrief({ domainId: info.domainId, name: info.name });
    }
  };

  useEffect(() => {
    getSpaceBrief();
  }, [spaceManager.spaceController.getSpaceBrief]);

  const logIntoSpace = async () => {
    spaceManager.spaceController.logIntoSpace(spaceBrief?.domainId, spacePassKey);
  };

  const joinSpaceContent = () => {
    return (
      <>
        <input
          autoFocus
          type="password"
          name="name"
          placeholder="Space Passkey"
          value={spacePassKey}
          onChange={(e) => setspacePassKey(e.target.value)}
        />
        <button onClick={() => logIntoSpace()}>Log in to Space</button>
      </>
    );
  };

  const mainDialog = () => {
    if (!spaceBrief) {
      return (
        <>
          <nav>
            <img src={`/public/assets/seal.png`} alt="Chatty Seal logo" />
          </nav>
          <Info>
            <>
              <h2>Hector de Seal is finding your space</h2>
            </>
          </Info>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <nav>
            <img src={`/public/assets/seal.png`} alt="Chatty Seal logo" />
            <h1> / {spaceBrief?.name}</h1>
          </nav>
          <div className="start">
            <Info>
              <>
                <p>
                  A passkey is required to join{" "}
                  <span style={{ fontWeight: "bold" }}>{spaceBrief?.name}</span>.
                </p>
                <h5>Hector de Seal is working on adding third-party authentication support</h5>
              </>
            </Info>

            <form onSubmit={(e) => e.preventDefault()}>{joinSpaceContent()}</form>
          </div>
        </>
      );
    }
  };

  return <Block>{mainDialog()}</Block>;
}
