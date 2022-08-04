import { useContext, useState } from "react";
import {
  Configration,
  ConfigurationContext,
} from "../../setup/configurationContext";
import Modal from "../common/modal/modal";
import Settings from "../settings";
import SpaceSetup from "../spaceSetup/spaceSetup";
import ThemeSelector from "../theming/themeSelector";
import "./index.css";

export default function Layout({ children }: { children: JSX.Element }) {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { config } = useContext(ConfigurationContext);

  const navbar = () => {
    if (!config.showNavBar) {
      return <></>;
    }
    return (
      <nav>
        <h1>Chatty Seal</h1>
        <ul>
          <li>
            <button onClick={() => setShow(true)}>
              <b>Spaces</b>
            </button>
          </li>
          <li>
            <button onClick={() => setShowSettings(true)}>Settings</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="layout">
      {navbar()}
      <Modal
        component={<SpaceSetup updateRoomId={() => {}} placeHolderId="" />}
        showModal={show}
        handleClose={() => {
          setShow(false);
        }}
      />

      <Modal
        component={<Settings />}
        showModal={showSettings}
        handleClose={() => {
          setShowSettings(false);
        }}
      />
      <main>{children}</main>
    </div>
  );
}
