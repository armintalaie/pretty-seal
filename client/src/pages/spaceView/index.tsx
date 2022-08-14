import { useState } from "react";
import Button, { BUTTON_TYPE } from "../../components/common/button/button";
import { SpaceInfo } from "../../components/spaces/spaceSetup/spaceSetup";
import Rooms from "../../components/rooms";
import SpaceSettings from "../../components/spaces/spaceSettings";
import { ConfigurationContextProvider } from "../../setup/configurationContext";
import { SocketContextProvider } from "../../setup/socketContext";
import ThemeProvider from "../../setup/themeContext";
import Modal from "../../components/common/modal/modal";

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
                  label="Settings"
                />
              </div>
            )}
            <Modal
              component={<SpaceSettings />}
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
