import { useContext, useState } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../../common/button/button";
import Messages from "../../common/message/messages";
import Modal from "../../common/modal/modal";
import Invite from "../../invites/invite";
import { ConfigurationContext } from "../../../setup/configurationContext";

import SpaceSettings from "../../spaces/spaceSettings";
export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
}

export default function Room(props: RoomProps) {
  const { config } = useContext(ConfigurationContext);
  const { leaveRoom, roomId } = props;
  const [showInvite, setShowInvite] = useState(false);
  const [showSpaceSettings, setShowSpaceSettings] = useState(false);

  return (
    <>
      <div className="top-bar">
        <h2>{props.roomname}</h2>
        <div>
          {config.rooms.showLeave && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              label="Leave Room"
              onClick={() => leaveRoom()}
            />
          )}
          {config.rooms.showInvite && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              label="Invite"
              onClick={() => setShowInvite(true)}
            />
          )}
          {config.space.canCustomize && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              onClick={() => {
                setShowSpaceSettings((prev) => !prev);
              }}
              label="Settings"
            />
          )}
        </div>
      </div>
      <Messages roomId={roomId} />
      <Modal
        component={<SpaceSettings />}
        showModal={showSpaceSettings}
        handleClose={() => {
          setShowSpaceSettings(false);
        }}
      />
      <Modal
        component={<Invite roomId={roomId} />}
        showModal={showInvite}
        handleClose={() => setShowInvite(false)}
      />
    </>
  );
}
