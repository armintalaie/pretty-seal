import { useContext } from "react";
import Messages from "../components/common/message/messages";
import { SocketContext } from "../setup/socketContext";
export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
}

export default function Room(props: RoomProps) {
  const { roomId } = props;
  const socket = useContext(SocketContext);

  return (
    <div className="room">
      {/* <h2>room name</h2> */}
      <div
        className="info"
        //style={{ backgroundColor: value.theme.primaryColor }}
      >
        {roomId}
      </div>
      <Messages roomId={roomId} />
    </div>
  );
}
