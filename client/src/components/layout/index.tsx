import { useState } from "react";
import Modal from "../modal";
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
        component={<ThemeSelector />}
        showModal={show}
        handleClose={() => {
          setShow(false);
        }}
      />
      <main>{children}</main>
    </div>
  );
}
