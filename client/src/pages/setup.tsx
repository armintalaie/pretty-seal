import { useContext, useEffect, useState } from "react";
import Button from "../components/common/button";
import { SocketContext } from "../setup/socketContext";

export default function Setup({
  updateRoomId,
  placeHolderId,
}: {
  updateRoomId: Function;
  placeHolderId: string;
}) {
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState(placeHolderId);
  const [displayName, setdisplayName] = useState("");

  const createRoom = async () => {
    console.log("result");
    const result = await fetch("http://localhost:8080/spaces/1/rooms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: socket.id }),
    });
    console.log(result);

    const room: string = (await result.json()).room;
    setRoomId(room);
    updateRoomId(room);
  };

  const joinRoom = async () => {
    const result = await fetch(
      `http://localhost:8080/spaces/1/rooms/${roomId}/users`,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: socket.id }),
      }
    );

    const room: string = (await result.json()).room;
    setRoomId(room);
    updateRoomId(room);
  };

  useEffect(() => {
    socket.on("room:post", (roomId) => {
      setRoomId(roomId);
      updateRoomId(roomId);
    });

    setRoomId(placeHolderId);

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
