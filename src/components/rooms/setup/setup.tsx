import { useContext, useState } from "react";
import Button from "../../common/button/button";
import { SocketContext } from "../../../setup/socketContext";

export default function Setup({
  handleClose,
  domainId,
}: {
  handleClose: Function;
  domainId: string;
}) {
  const socket = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");
  const [displayName, setdisplayName] = useState("");

  const createRoom = async () => {
    socket.emit("room", {
      name: displayName,
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
              type="text"
              name="name"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <input
              type="text"
              name="name"
              placeholder="diplay name"
              value={displayName}
              onChange={(e) => setdisplayName(e.target.value)}
            />
            <Button label="Create Room" onClick={() => createRoom()} />
          </form>
        </div>
      </div>
    </div>
  );
}
