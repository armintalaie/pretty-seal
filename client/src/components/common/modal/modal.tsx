import { CloseOutlined } from "@ant-design/icons";
import { ReactElement } from "react";
import Button, { BUTTON_TYPE, ColorOptions } from "../button/button";
import "./index.css";

interface ModalProps {
  component: ReactElement;
  handleClose: Function;
  showModal: boolean;
  topBarButtons?: ReactElement;
}

export interface ModalComponent {
  handleClose?: Function;
}

export default function Modal(props: ModalProps) {
  const { component, handleClose, showModal, topBarButtons } = props;

  if (!showModal) {
    return <></>;
  }

  return (
    <div className="modal">
      <section>
        <div className="buttons">
          <Button
            buttonType={BUTTON_TYPE.b2}
            customizations={{ bg: ColorOptions.SECONDARY }}
            icon={<CloseOutlined />}
            onClick={() => handleClose()}
          />
          {topBarButtons}
        </div>

        <div className="content">{component}</div>
      </section>
    </div>
  );
}
