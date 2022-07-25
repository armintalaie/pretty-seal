import { useContext, useState } from "react";
import { SocketContext } from "../setup/socketContext";
import Room from "./room";
import Setup from "./setup";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const socket = useContext(SocketContext);

  const updateRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  const leaveRoom = () => {
    socket.emit("room:leave", roomId);
    setRoomId("");
  };

  if (roomId.length) {
    return <Room leaveRoom={leaveRoom} roomId={roomId} />;
  } else {
    return <Setup updateRoomId={updateRoomId} />;
  }
}
