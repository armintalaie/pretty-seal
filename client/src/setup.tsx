import { useContext, useEffect, useState } from "react";
import Button from "./components/common/button";
import { SocketContext } from "./setup/socketContext";
import { ThemeContext } from "./setup/themeContext";

export default function Setup({ updateRoomId }: { updateRoomId: Function }) {
  const { currentTheme } = useContext(ThemeContext);
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState("");
  const [displayName, setdisplayName] = useState("");

  const createRoom = () => {
    socket.emit("room:post", { roomId: roomId, displayName: displayName });
  };
  const joinRoom = () => {
    socket.emit("room:post", { roomId: roomId, displayName: displayName });
  };

  useEffect(() => {
    socket.on("room:post", (roomId) => {
      setRoomId(roomId);
      updateRoomId(roomId);
    });

    return () => {
      socket.off("room:post");
    };
  }, []);

  const createOrJoinButton = () => {
    if (roomId.length > 0) {
      return <Button label="Join Room" onClick={() => joinRoom()} />;
    } else {
      return <Button label="Create Room" onClick={() => createRoom()} />;
    }
  };

  return (
    <div className="intro">
      <div className="info">
        <p>
          You can create or join a chat room. Leave room id empty if you want to
          create a room
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
        {createOrJoinButton()}
      </div>
    </div>
  );
}
