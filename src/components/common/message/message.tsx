import { motion } from "framer-motion";
import { CSSProperties, useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

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
  return (
    <motion.div
      className={message.displayName === user ? "message right" : "message left"}
      initial={{ x: message.displayName === user ? "30" : "-30" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      <div className="message-text" style={sentStyle()}>
        <h6>{message.displayName}</h6>
        <p>{message.text}</p>
      </div>
    </motion.div>
  );
}
