import { useContext, useState } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../../common/button/button";
import Messages from "../../common/message/messages";
import Modal from "../../common/modal/modal";
import Invite from "../../invites/invite";
import { ConfigurationContext } from "../../../setup/configurationContext";
import "./index.scss";

export interface RoomProps {
  roomname?: string;
  roomId: string;
  leaveRoom: Function;
}

export default function Room(props: RoomProps) {
  const { config } = useContext(ConfigurationContext);
  const { leaveRoom, roomId } = props;
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      <div className="top-bar">
        {config.rooms.showLeave && (
          <Button
            buttonType={BUTTON_TYPE.b2}
            customizations={{ bg: ColorOptions.SECONDARY }}
            icon={"box.svg"}
            onClick={() => leaveRoom()}
          />
        )}
        <h2> {props.roomname}</h2>
        <div>
          {config.rooms.showLeave && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              icon={"x-square.svg"}
              onClick={() => leaveRoom(true)}
            />
          )}

          {config.rooms.showInvite && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              onClick={() => setShowInvite(true)}
              icon={"user-plus.svg"}
            />
          )}
        </div>
      </div>
      <Messages roomId={roomId} />

      <Modal
        component={<Invite roomId={roomId} />}
        showModal={showInvite}
        handleClose={() => setShowInvite(false)}
      />
    </>
  );
}
