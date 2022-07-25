import { useState } from "react";
import Room from "./room";
import Setup from "./setup";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  const updateRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  const leaveRoom = () => {
    setRoomId("");
  };

  if (roomId.length) {
    return <Room leaveRoom={leaveRoom} roomId={roomId} />;
  } else {
    return <Setup updateRoomId={updateRoomId} />;
  }
}
