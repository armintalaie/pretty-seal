import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Block from "../../components/common/block";
import { RoomProps } from "../../components/rooms";
import { SocketContext } from "../../context/socketContext";
import { SpaceContext } from "../../context/spaceContext";
import Room from "../space/room";

export default function RoomView() {
  const socket = useContext(SocketContext);
  const { id, roomId } = useParams();
  const [room, setRoom] = useState<RoomProps>({ domainId: roomId!, roomName: roomId! });
  const space = useContext(SpaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    space.spaceController.logIntoSpace(id);
  }, [space.spaceController]);

  useEffect(() => {
    socket.on("room", (args) => {
      setRoom({ domainId: args.roomId, roomName: args.name });
    });
    return () => {
      socket.off("room");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("room", {
      roomId: roomId,
      name: "displayName",
      roomName: roomId,
    });
  }, []);

  if (!space.spaceInfo) {
    return (
      <Block>
        <></>
      </Block>
    );
  }

  if (!room.domainId) {
    navigate("/");
    return <></>;
  }

  return (
    <>
      <Room
        roomname={room.roomName}
        roomId={room.domainId}
        leaveRoom={() => {
          space.spaceController.logOutOfSpace();
          navigate("/");
        }}
      />
    </>
  );
}
