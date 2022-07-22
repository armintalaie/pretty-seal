import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Room from "./room";
const SERVER = "http://localhost:8080";
const socket = io(SERVER);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isInRoom, setisInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [displayName, setdisplayName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room:post", (roomId) => {
      setRoomId(roomId);
      setisInRoom(true);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room:post");
    };
  }, [isConnected]);

  function createRoom() {
    socket.emit("room:post", undefined);
  }

  function joinRoom() {
    socket.emit("room:post", roomId);
  }

  const intro = () => {
    return (
      <div className="intro">
        <h1>Chatty Seal</h1>
        <div className="info">
          <p>
            You can create or join a chat room. Leave room id empty if you want
            to create a room
          </p>
        </div>
        <div className="start">
          <input
            type="text"
            name="name"
            placeholder="diplay name"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          {roomId === "" ? (
            <button onClick={() => createRoom()}>Create Room</button>
          ) : (
            <button disabled={roomId.length <= 0} onClick={() => joinRoom()}>
              Join Room
            </button>
          )}
        </div>
      </div>
    );
  };

  const room = Room({ roomId: roomId, socket: socket });

  if (isInRoom) {
    return room;
  } else return intro();
}

export default App;
