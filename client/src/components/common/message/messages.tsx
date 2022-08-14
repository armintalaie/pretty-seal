import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../setup/socketContext";
import Button from "../button/button";
import Info from "../info/info";
import MessageBubble, { Message } from "./message";
import "./index.css";
import { SpaceContext } from "../../../setup/spaceContext";

export default function Messages({ roomId }: { roomId: string }) {
  const { domainId } = useContext(SpaceContext).spaceInfo!;
  const socket = useContext(SocketContext);
  const [draft, setDraft] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage() {
    console.log(draft);
    socket.emit("message", domainId, roomId, draft);
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
      setMessages((prev) => prev.concat(args));
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

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
