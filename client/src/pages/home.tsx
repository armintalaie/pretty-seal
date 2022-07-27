import { useContext, useState } from "react";
import { SocketContext } from "../setup/socketContext";
import Room from "./room";
import Setup from "./setup";

export default function Home() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let roomIdQuery = "";

  if (params.has("roomId")) {
    roomIdQuery = params.get("roomId")!;
  }

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
    return <Setup placeHolderId={roomIdQuery} updateRoomId={updateRoomId} />;
  }
}
