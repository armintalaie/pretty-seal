import { SaveOutlined, LogoutOutlined } from "@ant-design/icons";
import { useContext } from "react";
import QRCode from "react-qr-code";
import { SpaceContext } from "../../../context/spaceContext";
import Button, { BUTTON_TYPE } from "../../common/button/button";
import Info from "../../common/info/info";
import Modal from "../../common/modal/modal";
import { SettingsModalProps } from "../spaceSettings";
import "./index.css";

export default function SpaceInvite(props: SettingsModalProps) {
  const { spaceInfo } = useContext(SpaceContext);
  const component = (
    <div>
      <h2>Invite to {spaceInfo?.name}</h2>
      <section className="invite-code"></section>
      <Info>
        <div>
          <h4>You can add users to this space via an invite</h4>
        </div>
      </Info>
    </div>
  );

  return (
    <Modal
      component={component}
      handleClose={props.handleClose}
      showModal={props.showModal}
      topBarButtons={<></>}
    />
  );
}
