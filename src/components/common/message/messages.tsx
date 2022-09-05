import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../context/socketContext";
import Button from "../button/button";
import Info from "../info/info";
import MessageBubble, { Message } from "./message";
import "./index.scss";
import { SpaceContext } from "../../../context/spaceContext";
import Slider from "../slider";
import Action from "./action";

export default function Messages({ roomId }: { roomId: string }) {
  const { domainId } = useContext(SpaceContext).spaceInfo!;
  const socket = useContext(SocketContext);
  const [draft, setDraft] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAction, setShowAction] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  function sendMessage() {
    if (draft.length === 0) {
      return;
    }
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
    scrollMessages();
  }

  function scrollMessages() {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }

  useEffect(() => {
    socket.on("message", (...args: Message[]) => {
      setMessages((prev) => prev.concat(args));
      scrollMessages();
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="messages-section">
      <div ref={messagesRef} className="messages">
        <Info>
          <>
            <h2>The chat will be active as long a more than two are in the room</h2>
            <h2>You can leave the room by just closing the tab</h2>
            <h2>The chat will not be saved</h2>
          </>
        </Info>
        {messages.map((msg) => (
          <MessageBubble {...msg} />
        ))}
      </div>

      <div className="action-section">
        {showAction && <Slider handleClose={() => {}} showModal={true} component={<Action />} />}

        <form
          className="send-section"
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <Button
              label=" "
              isDisabled={true}
              onClick={() => {
                setShowAction((prev) => !prev);
              }}
            />
            <textarea
              name="name"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.metaKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            ></textarea>
            <Button
              isDisabled={draft.length === 0}
              label="Send"
              onClick={() => {
                sendMessage();
              }}
            />
          </div>
        </form>
      </div>

      <label>Enter CMD + ENTER to send message</label>
    </div>
  );
}
