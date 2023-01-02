import { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
import Info from "../info/info";

export interface Message {
  text: string;
  date: string;
  username: string;
  displayName: string;
  sync: Date;
}

export default function MessageBubble(message: Message) {
  const { currentTheme } = useContext(ThemeContext);
  const user = "me";

  const messageStatus = () => {
    if (message.date > message.sync.toString()) return true;
    else return false;
  };

  if (message.username === "HECTOR") {
    return (
      <Info>
        <p>{message.text}</p>
      </Info>
    );
  }
  return (
    <div className={message.displayName === user ? "message right" : "message left"}>
      <div className={`message-wrapper`}>
        {message.displayName !== user && <h6>{message.displayName}</h6>}

        <div className={`message-text ${messageStatus() ? "unsent" : "sent"}`}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}
