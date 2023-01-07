import { useContext, useState } from "react";
import { SocketContext } from "../../../context/socketContext";

export default function Setup({ handleClose }: { handleClose: Function; domainId: string }) {
  const socket = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");

  const createRoom = async () => {
    socket.emit("room", {
      roomName: roomName,
    });
    handleClose();
  };

  return (
    <div>
      <h2>New Room</h2>
      <div className="intro">
        <div className="start">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              autoFocus
              type="text"
              name="name"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />

            <button onClick={() => createRoom()}>Create Room</button>
          </form>
        </div>
      </div>
    </div>
  );
}
