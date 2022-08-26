import { CSSProperties, useContext } from "react";
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

  const sentStyle = () => {
    const style: CSSProperties = {};

    if (message.displayName === user) {
      style["background"] = `
        ${currentTheme.secondaryColor}`;
    } else {
      style["background"] = "#e5e1e1";
    }

    return style;
  };
  return (
    <div className={message.displayName === user ? "message right" : "message left"}>
      <div className="message-text" style={sentStyle()}>
        <h6>{message.displayName}</h6>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
