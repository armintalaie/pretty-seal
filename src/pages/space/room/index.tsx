import { useContext, useEffect, useState } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../../../components/common/button/button";
import Messages from "../../../components/common/message/messages";
import Modal from "../../../components/common/modal/modal";
import Invite from "../../../components/invites/invite";
import { ConfigurationContext } from "../../../context/configurationContext";
import "./index.scss";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import Block from "../../../components/common/block";
import { SpaceContext } from "../../../context/spaceContext";

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
            <div className="top-bar-room">
              <div>
                <h2> {props.roomname}</h2>
              </div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1_28028)">
                    <path
                      d="M17.935 19.5C13.5349 23.9 0.0999715 10.465 4.5 6.06501L5.73151 4.83345C6.65811 3.90683 8.2106 4.10678 8.87216 5.23795L9.40649 6.15156C9.79532 6.8164 9.76784 7.64544 9.33583 8.28307L8.97347 8.8179C8.57005 9.41334 8.64605 10.2113 9.15462 10.7199L11.2173 12.7826L13.2802 14.8453C13.7888 15.3538 14.5868 15.4298 15.1822 15.0264L15.7168 14.6642C16.3544 14.2322 17.1834 14.2047 17.8482 14.5935L18.7619 15.1278C19.8931 15.7894 20.0931 17.3419 19.1665 18.2685L17.935 19.5Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_28028">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {/* {config.rooms.showLeave && (
                  <Button
                    buttonType={BUTTON_TYPE.b2}
                    customizations={{ bg: ColorOptions.SECONDARY }}
                    icon={<CloseCircleOutlined />}
                    onClick={() => leaveRoom()}
                  />
                )}

                {config.rooms.showInvite && (
                  <Button
                    buttonType={BUTTON_TYPE.b2}
                    customizations={{ bg: ColorOptions.SECONDARY }}
                    icon={<UserOutlined />}
                    onClick={() => setShowInvite(true)}
                  />
                )} */}
              </div>
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
