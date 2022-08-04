import { useContext, useState } from "react";
import Button from "../components/common/button";
import Messages from "../components/common/message/messages";
import Modal from "../components/common/modal/modal";
import Invite from "../components/invites/invite";
import {
  Configration,
  ConfigurationContext,
} from "../setup/configurationContext";
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
    <div className="room">
      <div className="room-top-bar">
        {config.showLeave && (
          <Button label="Leave Room" onClick={() => leaveRoom()} />
        )}
        {config.showInvite && (
          <Button label="Invite" onClick={() => setShowInvite(true)} />
        )}
      </div>
      <Messages roomId={roomId} />
      <Modal
        component={<Invite roomId={roomId} />}
        showModal={showInvite}
        handleClose={() => setShowInvite(false)}
      />
    </div>
  );
}
