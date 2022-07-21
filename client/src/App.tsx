import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const SERVER = "http://localhost:8080";
const socket = io(SERVER);

interface Message {
  text: string;
  date: string;
  userId: string;
  username: string;
}

const sampleMessages = [
  {
    text: "Hello, my name is Armin. What's your name?",
    date: "",
    userId: "1",
    username: "armin",
  },
  {
    text: "Hello, my name is O. What's your name?",
    date: "",
    userId: "1",
    username: "Jack",
  },
  {
    text: "Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?Hello, my name is Armin. What's your name?",
    date: "",
    userId: "1",
    username: "armin",
  },
];

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isInRoom, setisInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [draft, setDraft] = useState<string>("");
  const user = "armin";

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("message", (...args: string[]) => {
      //  setMessages((prev) => prev.concat(args));
    });

    socket.on("room:post", (roomId) => {
      setRoomId(roomId);
      setisInRoom(true);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, [isConnected]);

  function createRoom() {
    socket.emit("room:post", undefined, (roomId: string) => {
      setRoomId(roomId);
    });
  }

  function joinRoom() {
    socket.emit("room:post", roomId);
  }

  function sendMessage() {
    socket.emit("message", roomId, draft);
    setDraft("");
  }

  const status = () => {
    if (isInRoom) {
      return <span>Connected</span>;
    } else {
      return <span>Not Connected</span>;
    }
  };

  const intro = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chatty Seal</h1>
          <p>
            You can create or join a chat room. Click on one option to get
            started
          </p>

          <div className="start">
            <button onClick={() => createRoom()}>Create Room</button>
            <button disabled={roomId.length <= 0} onClick={() => joinRoom()}>
              Join Room
            </button>
          </div>
        </header>
      </div>
    );
  };

  if (isInRoom) {
    return intro();
  } else
    return (
      <div>
        <div className="room">
          <h3>Room name</h3>
          <button>Invite</button>
          <button>Leave</button>
        </div>
        <section className="message-section">
          <section className="messages">
            {messages.map((message) => (
              <div
                className={
                  message.username === user ? "message blue" : "message green"
                }
              >
                <div className="avatar"></div>
                <div className="message-text">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </section>

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
        <p>{roomId === "" ? "no room" : roomId}</p>
      </div>
    );
}

export default App;
