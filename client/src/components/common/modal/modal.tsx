import "./index.css";

interface ModalProps {
  component: JSX.Element;
  handleClose: Function;
  showModal: boolean;
}

export default function Modal(props: ModalProps) {
  const { component, handleClose, showModal } = props;

  if (!showModal) {
    return <></>;
  }

  return (
    <div className="modal">
      <section>
        {component}
        <button onClick={() => handleClose()}>Close</button>
      </section>
    </div>
  );
}
