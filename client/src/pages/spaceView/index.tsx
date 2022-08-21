import { useState } from "react";
import Button, { BUTTON_TYPE } from "../../components/common/button/button";
import { SpaceInfo } from "../../components/spaces/spaceSetup/spaceSetup";
import Rooms from "../../components/rooms";
import SpaceSettings from "../../components/spaces/spaceSettings";
import { ConfigurationContextProvider } from "../../setup/configurationContext";
import { SocketContextProvider } from "../../setup/socketContext";
import ThemeProvider from "../../setup/themeContext";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../services/apiHandler";
import { MoreOutlined } from "@ant-design/icons";

export default function SpaceView({
  spaceInfromation,
}: {
  spaceInfromation: SpaceInfo;
}) {
  const [showSpaceSettings, setShowSpaceSettings] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);

  return (
    <SocketContextProvider domain={spaceInfromation.domainId}>
      <ConfigurationContextProvider domain={spaceInfromation.domainId}>
        <ThemeProvider>
          <div className="block">
            {!isInRoom && (
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
            )}

            <SpaceSettings
              showModal={showSpaceSettings}
              handleClose={() => {
                setShowSpaceSettings(false);
              }}
            />
            <Rooms
              setIsInRoom={setIsInRoom}
              domainId={spaceInfromation.domainId}
            />
          </div>
        </ThemeProvider>
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
