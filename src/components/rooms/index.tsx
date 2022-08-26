import { useContext, useEffect, useState } from "react";
import Button, { BUTTON_TYPE } from "../common/button/button";
import Modal from "../common/modal/modal";
import { SocketContext } from "../../setup/socketContext";
import Setup from "./setup/setup";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";

export interface RoomsProps {
  domainId: string;
  setIsInRoom: Function;
}

export interface RoomProps {
  domainId: string;
  roomName: string;
}

export default function Rooms(props: RoomsProps) {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const { domainId } = props;
  const socket = useContext(SocketContext);
  const [rooms, setRooms] = useState<any[]>([]);
  useEffect(() => {
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.emit("rooms", (rooms: any) => {
      setRooms(rooms);
    });

    socket.on("room", (args) => {
      props.setIsInRoom({ domainId: args.roomId, roomName: args.name });
    });

    return () => {
      socket.off("rooms");
      socket.off("room");
    };
  }, [socket]);

  const openRoom = (roomId: string) => {
    socket.emit("room", {
      roomId: roomId,
      name: "displayName",
      roomName: roomId,
    });
  };

  const mainContent = (
    <>
      <div className="top-bar">
        <h2>Rooms</h2>
        <Button
          buttonType={BUTTON_TYPE.b2}
          onClick={() => {
            setShowAddRoom((prev) => !prev);
          }}
          icon={<PlusOutlined />}
        />
      </div>
      <div className="room-list">
        {rooms.map((room) => (
          <div onClick={() => openRoom(room.id)}>
            <h3>{room.name}</h3>
            <h6>{room.users} in room</h6>
          </div>
        ))}
      </div>
    </>
  );
  const RoomCreationModal = (
    <Modal
      component={<Setup domainId={domainId} handleClose={() => setShowAddRoom(false)} />}
      showModal={showAddRoom}
      handleClose={() => {
        setShowAddRoom(false);
      }}
    />
  );

  return (
    <div className="sub block">
      {mainContent}
      {RoomCreationModal}
    </div>
  );
}
