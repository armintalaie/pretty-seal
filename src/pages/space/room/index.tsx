import { useContext, useState } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../../../components/common/button/button";
import Messages from "../../../components/common/message/messages";
import Modal from "../../../components/common/modal/modal";
import Invite from "../../../components/invites/invite";
import { ConfigurationContext } from "../../../context/configurationContext";
import "./index.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import Block from "../../../components/common/block";

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
      <Block key={props.roomId}>
        <>
          <div className="top-bar">
            <div>
              <h2> {props.roomname}</h2>
            </div>

            <div>
              {config.rooms.showLeave && (
                <Button
                  buttonType={BUTTON_TYPE.b2}
                  customizations={{ bg: ColorOptions.SECONDARY }}
                  icon={<CloseCircleOutlined />}
                  onClick={() => leaveRoom()}
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
      </Block>
    </>
  );
}
