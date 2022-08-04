import { ReactElement } from "react";
import "./index.css";

interface ModalProps {
  component: ReactElement;
  handleClose: Function;
  showModal: boolean;
}

export interface ModalComponent {
  handleClose?: Function;
}

export default function Modal(props: ModalProps) {
  const { component, handleClose, showModal } = props;

  if (!showModal) {
    return <></>;
  }

  // component.props = "s";
  // component.setProps.handleClose = handleClose;

  return (
    <div className="modal">
      <section>
        <div className="buttons">
          <button onClick={() => handleClose()}>Dismiss</button>
        </div>

        <div className="content">{component}</div>
      </section>
    </div>
  );
}
