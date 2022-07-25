import { useContext } from "react";
import Button from "../components/common/button";
import Messages from "../components/common/message/messages";
import { SocketContext } from "../setup/socketContext";
export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
}

export default function Room(props: RoomProps) {
  const { leaveRoom, roomId } = props;

  return (
    <div className="room">
      <Button label="Leave Room" onClick={() => leaveRoom()} />
      <div className="info">{roomId}</div>
      <Messages roomId={roomId} />
    </div>
  );
}
