import { useContext, useEffect, useState } from "react";
import Button, { BUTTON_TYPE } from "../../components/common/button/button";
import Rooms, { RoomProps } from "../../components/rooms";
import SpaceSettings from "../../components/spaces/spaceSettings";
import { MoreOutlined } from "@ant-design/icons";
import Room from "./room";
import Block from "../../components/common/block";
import Info from "../../components/common/info/info";
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
              <Button
                buttonType={BUTTON_TYPE.b2}
                onClick={() => {
                  setShowSpaceSettings((prev) => !prev);
                }}
                icon={<MoreOutlined />}
              />

              <Button
                buttonType={BUTTON_TYPE.b2}
                onClick={() => {
                  setShowSpaceInvite((prev) => !prev);
                }}
                icon={<MoreOutlined />}
              />
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
          <Info>
            <p>join or create a room to start communicating right away</p>
          </Info>

          <Rooms setIsInRoom={setCurrentRoom} domainId={spaceInfromation.domainId} />
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
