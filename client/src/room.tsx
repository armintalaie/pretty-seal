import { useEffect, useState } from "react";
import Info from "./components/info";
import MessageBubble, { Message } from "./components/message";
import { Socket } from "socket.io-client";

export interface RoomProps {
  roomname?: string;
  roomId: string;
  socket: Socket;
}

export default function Room(props: RoomProps) {
  const { socket, roomId } = props;
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
    <section className="room-page">
      {/* <section className="rooms"></section> */}
      <section className="room">
        {/* <h2>room name</h2> */}
        <div className="info">{roomId}</div>
        <div className="messages">
          <Info />
          {messages.map((msg) => (
            <MessageBubble {...msg} />
          ))}
        </div>
        <div className="send-section">
          <input
            type="text"
            name="name"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button disabled={draft.length <= 0} onClick={() => sendMessage()}>
            send
          </button>
        </div>
      </section>
      {/* <section className="members"></section> */}
    </section>
  );
}
