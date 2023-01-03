import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../context/socketContext";
import MessageBubble, { Message } from "./message";
import "./index.scss";
import { SpaceContext } from "../../../context/spaceContext";

export default function Messages({ roomId }: { roomId: string }) {
  const { domainId } = useContext(SpaceContext).spaceInfo!;
  const socket = useContext(SocketContext);
  const [draft, setDraft] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLTextAreaElement>(null);
  const [updateDate, setUpdateDate] = useState<Date>(new Date());

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement]);

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
          sync: updateDate,
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
        {messages.map((msg) => (
          <MessageBubble key={msg.date} {...msg} sync={updateDate} />
        ))}
      </div>

      <div className="action-section">
        <form
          className="send-section"
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <textarea
              key={"text"}
              ref={inputElement}
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

            <button
              disabled={draft.length === 0}
              onClick={() => {
                sendMessage();
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_489_191541)">
                  <path
                    d="M15.2061 8.50337L9.44257 5.30143C6.79518 3.83066 5.47149 3.09527 4.48574 3.67529C3.5 4.2553 3.5 5.76955 3.5 8.79806V15.2019C3.5 18.2304 3.5 19.7447 4.48574 20.3247C5.47149 20.9047 6.79518 20.1693 9.44257 18.6986L15.2061 15.4966C17.9899 13.9501 19.3817 13.1768 19.3817 12C19.3817 10.8232 17.9899 10.0499 15.2061 8.50337Z"
                    fill="gray"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_489_191541">
                    <rect width="24" height="24" fill="black" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
