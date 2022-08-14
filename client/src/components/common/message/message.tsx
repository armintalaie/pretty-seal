import { useContext } from "react";
import { ThemeContext } from "../../../setup/themeContext";
import "./index.css";

export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
}

export default function MessageBubble(message: Message) {
  const { currentTheme } = useContext(ThemeContext);
  const user = "me";
  return (
    <div
      className={
        message.displayName === user ? "message right" : "message left"
      }
    >
      <div
        className="message-text"
        style={{ backgroundColor: currentTheme.primaryColor }}
      >
        <h6>{message.displayName}</h6>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
