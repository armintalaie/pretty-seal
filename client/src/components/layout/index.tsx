import { useState } from "react";
import Modal from "../common/modal/modal";
import Settings from "../settings";
import ThemeSelector from "../theming/themeSelector";
import "./index.css";

export default function Layout({ children }: { children: JSX.Element }) {
  const [show, setShow] = useState(false);
  return (
    <div className="layout">
      <nav>
        <h1>Chatty Seal</h1>
        <ul>
          <li>
            <button onClick={() => setShow(true)}>Settings</button>
          </li>
        </ul>
      </nav>
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
