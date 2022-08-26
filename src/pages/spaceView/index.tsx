import { useContext, useEffect, useState } from "react";
import Button, { BUTTON_TYPE } from "../../components/common/button/button";
import { SpaceInfo } from "../../components/spaces/spaceSetup/spaceSetup";
import Rooms, { RoomProps } from "../../components/rooms";
import SpaceSettings from "../../components/spaces/spaceSettings";
import { ConfigurationContextProvider } from "../../setup/configurationContext";
import { SocketContext, SocketContextProvider } from "../../setup/socketContext";
import ThemeProvider from "../../setup/themeContext";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../services/apiHandler";
import { MoreOutlined } from "@ant-design/icons";
import Room from "../../components/rooms/room";
import Block from "../../components/common/block";

export default function SpaceView({ spaceInfromation }: { spaceInfromation: SpaceInfo }) {
  const [showSpaceSettings, setShowSpaceSettings] = useState(false);
  const socket = useContext(SocketContext);
  const [currentRoom, setCurrentRoom] = useState<RoomProps | undefined>(undefined);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 680;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const mainContent = () => {
    const rooms = (
      <Block>
        <>
          <div className="top-bar">
            <h1>{spaceInfromation.name}</h1>
            <Button
              buttonType={BUTTON_TYPE.b2}
              onClick={() => {
                setShowSpaceSettings((prev) => !prev);
              }}
              icon={<MoreOutlined />}
            />
          </div>
          <SpaceSettings
            showModal={showSpaceSettings}
            handleClose={() => {
              setShowSpaceSettings(false);
            }}
          />
          <Rooms setIsInRoom={setCurrentRoom} domainId={spaceInfromation.domainId} />
        </>
      </Block>
    );

    if (currentRoom) {
      const room = (
        <Block>
          <Room
            roomname={currentRoom.roomName}
            roomId={currentRoom.domainId}
            leaveRoom={(exitRoom?: boolean) => {
              exitRoom && socket.emit("room:leave", currentRoom.domainId);
              setCurrentRoom(undefined);
            }}
          />
        </Block>
      );

      return (
        <>
          {width > breakpoint && rooms}
          {room}
        </>
      );
    }
    return rooms;
  };

  return (
    <SocketContextProvider domain={spaceInfromation.domainId}>
      <ConfigurationContextProvider domain={spaceInfromation.domainId}>
        <ThemeProvider>{mainContent()}</ThemeProvider>
      </ConfigurationContextProvider>
    </SocketContextProvider>
  );
}

// function InviteToSpace({ spaceId }: { spaceId: string }) {
//   return (
//     <div>
//       <h1>Invite</h1>

//       <section className="invite-code">
//         <h4>
//           You can share the QR code that will prompt others to join this room
//         </h4>
//         <div>
//           <QRCode size={150} value={`${API_BASE_URL}/spaces/${spaceId}`} />
//         </div>
//       </section>
//     </div>
//   );
// }
