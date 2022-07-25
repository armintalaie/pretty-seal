import { useContext, useEffect, useState } from "react";
import Button from "./components/common/button";
import Info from "./components/common/info";
import MessageBubble, { Message } from "./components/common/message";
import { SocketContext } from "./setup/socketContext";
export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
}

export default function Room(props: RoomProps) {
  const { roomId } = props;
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
  useEffect(() => {}, []);

  useEffect(() => {
    socket.on("message", (...args: Message[]) => {
      setMessages((prev) => prev.concat(args));
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="room">
      {/* <h2>room name</h2> */}
      <div
        className="info"
        //style={{ backgroundColor: value.theme.primaryColor }}
      >
        {roomId}
      </div>
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
