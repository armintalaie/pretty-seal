import { motion, MotionConfig } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import Alert, { AlertType } from "../../../components/common/banner/banner";
import Block from "../../../components/common/block";
import Button from "../../../components/common/button/button";
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

  const mainDialog = () => {
    if (!spaceBrief) {
      return (
        <>
          <motion.nav
            initial={{ x: 0 }}
            animate={{ x: "80%" }}
            transition={{ type: "linear", duration: 3, repeatType: "loop", repeat: Infinity }}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/seal.png`} alt="Chatty Seal logo" />
          </motion.nav>
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
            <img src={`${process.env.PUBLIC_URL}/assets/seal.png`} alt="Chatty Seal logo" />
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
