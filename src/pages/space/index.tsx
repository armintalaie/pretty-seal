import { useContext, useEffect, useState } from "react";
import Rooms, { RoomProps } from "../../components/rooms";
import SpaceSettings from "../../components/spaces/spaceSettings";
import Room from "./room";
import Block from "../../components/common/block";
import { SpaceContext } from "../../context/spaceContext";
import Login from "./login";
import SpaceInvite from "../../components/spaces/invite";

export default function SpaceView() {
  const spaceInfromation = useContext(SpaceContext).spaceInfo;
  const [showSpaceSettings, setShowSpaceSettings] = useState(false);
  const [showSpaceInvite, setShowSpaceInvite] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomProps | undefined>(undefined);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 720;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  if (!spaceInfromation) {
    return <Login />;
  }

  const mainContent = () => {
    const rooms = (
      <Block>
        <>
          <div className="top-bar">
            <h1>{spaceInfromation.name}</h1>

            <div>
              <button
                onClick={() => {
                  setShowSpaceInvite((prev) => !prev);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_27953)">
                    <path
                      d="M21 20.9999V20.5499C21 19.5733 21 19.085 20.8874 18.6856C20.604 17.681 19.8189 16.8959 18.8143 16.6126C18.415 16.4999 17.9266 16.4999 16.95 16.4999H12.55C11.5734 16.4999 11.085 16.4999 10.6857 16.6126C9.68108 16.8959 8.89596 17.681 8.61263 18.6856C8.5 19.085 8.5 19.5733 8.5 20.5499V20.9999"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 17.5V15.9C3 15.0633 3 14.6449 3.08289 14.2997C3.34624 13.2027 4.20272 12.3462 5.29966 12.0829C5.64493 12 6.06328 12 6.9 12H7"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 9.5C18.5 11.433 16.933 13 15 13C13.067 13 11.5 11.433 11.5 9.5C11.5 7.567 13.067 6 15 6C16.933 6 18.5 7.567 18.5 9.5Z"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <path
                      d="M11 4.38038C10.4137 3.54836 9.41108 3 8.27273 3C6.46525 3 5 4.38248 5 6.08785C5 7.43232 5.9107 8.5761 7.18182 9"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_27953">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button
                onClick={() => {
                  setShowSpaceSettings((prev) => !prev);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_489_191328)">
                    <path
                      d="M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4Z"
                      fill="black"
                    />
                    <path
                      d="M14 12C14 13.1045 13.1046 14 12 14C10.8954 14 10 13.1045 10 12C10 10.8954 10.8954 9.99998 12 9.99998C13.1046 9.99998 14 10.8954 14 12Z"
                      fill="black"
                    />
                    <path
                      d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_489_191328">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <SpaceSettings
              showModal={showSpaceSettings}
              handleClose={() => {
                setShowSpaceSettings(false);
              }}
            />
            <SpaceInvite
              showModal={showSpaceInvite}
              handleClose={() => {
                setShowSpaceInvite(false);
              }}
            />
          </div>
          <Rooms
            currentRoom={currentRoom ? currentRoom.roomName : undefined}
            setIsInRoom={setCurrentRoom}
            domainId={spaceInfromation.domainId}
          />
        </>
      </Block>
    );

    let room =
      width > breakpoint ? (
        <></>
      ) : (
        <Block>
          <></>
        </Block>
      );

    if (currentRoom) {
      room = (
        <>
          <Room
            roomname={currentRoom.roomName}
            roomId={currentRoom.domainId}
            leaveRoom={(exitRoom?: boolean) => {
              // exitRoom && socket.emit("room:leave", currentRoom.domainId);
              setCurrentRoom(undefined);
            }}
          />
        </>
      );

      return (
        <>
          {width > breakpoint && rooms}

          {room}
        </>
      );
    }

    return (
      <>
        {rooms}

        {width > breakpoint && room}
      </>
    );
  };

  return <>{mainContent()}</>;
}
