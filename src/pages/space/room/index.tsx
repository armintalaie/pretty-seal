import { useContext, useState } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../../../components/common/button/button";
import Messages from "../../../components/common/message/messages";
import Modal from "../../../components/common/modal/modal";
import Invite from "../../../components/invites/invite";
import { ConfigurationContext } from "../../../context/configurationContext";
import "./index.scss";
import { CloseCircleOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

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
        <div>
          {config.rooms.showLeave && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              icon={<HomeOutlined />}
              onClick={() => leaveRoom()}
            />
          )}
          <h2> {props.roomname}</h2>
        </div>

        <div>
          {config.rooms.showLeave && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              icon={<CloseCircleOutlined />}
              onClick={() => leaveRoom(true)}
            />
          )}

          {config.rooms.showInvite && (
            <Button
              buttonType={BUTTON_TYPE.b2}
              customizations={{ bg: ColorOptions.SECONDARY }}
              onClick={() => setShowInvite(true)}
              icon={<UserOutlined />}
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
