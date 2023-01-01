import { motion } from "framer-motion";
import { CSSProperties, useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
import Info from "../info/info";

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
      style["background"] = `${currentTheme.primaryColor}`;
      style["borderRadius"] = "10px 2px 10px 10px";
    } else {
      style["background"] = `${currentTheme.secondaryColor}`;
      style["borderRadius"] = "2px 10px 10px 10px";
    }

    return style;
  };

  if (message.username === "HECTOR") {
    return (
      <Info>
        <>
          <p>{message.text}</p>
        </>
      </Info>
    );
  }
  return (
    <div className={message.displayName === user ? "message right" : "message left"}>
      <div className="message-text">
        <h6>{message.displayName}</h6>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
