import { useContext, useState } from "react";
import {
  Configration,
  ConfigurationContext,
} from "../../setup/configurationContext";
import Modal from "../common/modal/modal";
import Settings from "../settings";
import ThemeSelector from "../theming/themeSelector";
import "./index.css";

export default function Layout({ children }: { children: JSX.Element }) {
  const [show, setShow] = useState(false);
  const configuration: Configration = useContext(ConfigurationContext);

  const navbar = () => {
    if (!configuration.showNavBar) {
      return <></>;
    }
    return (
      <nav>
        <h1>Chatty Seal</h1>
        <ul>
          <li>
            <button onClick={() => setShow(true)}>Settings</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="layout">
      {navbar()}
      <Modal
        component={<Settings />}
        showModal={show}
        handleClose={() => {
          setShow(false);
        }}
      />
      <main>{children}</main>
    </div>
  );
}
