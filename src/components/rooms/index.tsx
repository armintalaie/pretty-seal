import { useContext, useEffect, useState } from "react";
import Modal from "../common/modal/modal";
import { SocketContext } from "../../context/socketContext";
import Setup from "./setup/setup";
import "./index.scss";
import RoomSettings from "./settings";

export interface RoomsProps {
  domainId: string;
  setIsInRoom: Function;
  currentRoom: string | undefined;
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
      roomName: roomId,
    });
  };

  const mainContent = (
    <>
      <div className="room-list">
        <div className="top-bar">
          <h3>Rooms</h3>
          <button
            onClick={() => {
              setShowAddRoom((prev) => !prev);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_854)">
                <path
                  d="M12 4V20M20 12H3.99998"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_854">
                  <rect width="24" height="24" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="rooms">
          {rooms.map((room) => (
            <div
              key={room}
              className={props.currentRoom === room.name ? "current" : ""}
              onClick={() => openRoom(room.id)}
            >
              <h3>{room.name}</h3>
            </div>
          ))}
        </div>
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
