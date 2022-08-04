import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../setup/socketContext";
import Button from "../button";
import Info from "../info";
import MessageBubble, { Message } from "./message";
import "./index.css";

export default function Messages({ roomId }: { roomId: string }) {
  const socket = useContext(SocketContext);
  const [draft, setDraft] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage() {
    socket.emit("message", roomId, draft);
    setMessages((prev) =>
      prev.concat([
        {
          text: draft,
          date: Date(),
          username: "me",
          displayName: "me",
        },
      ])
    );
    setDraft("");
  }

  useEffect(() => {
    socket.on("message", (...args: Message[]) => {
      console.log(args);
      setMessages((prev) => prev.concat(args));
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="messages-section">
      <div className="messages">
        <Info />
        {messages.map((msg) => (
          <MessageBubble {...msg} />
        ))}
      </div>
      <div className="send-section">
        <textarea
          name="name"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        ></textarea>

        <Button label="Send" onClick={() => sendMessage()} />
      </div>
    </div>
  );
}
