import { CloseOutlined } from "@ant-design/icons";
import { ReactElement, useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
import Button, { BUTTON_TYPE, ColorOptions } from "../button/button";
import "./index.scss";

interface ModalProps {
  component: ReactElement;
  handleClose: Function;
  showModal: boolean;
  topBarButtons?: ReactElement;
}

export interface ModalComponent {
  handleClose?: Function;
}

export default function Slider(props: ModalProps) {
  const { component, handleClose, showModal, topBarButtons } = props;
  const theme = useContext(ThemeContext).currentTheme;

  if (!showModal) {
    return <></>;
  }

  return (
    <div className={`slider ${theme.isLightMode ? "light" : "dark"}`}>
      <section>
        <div className="content">{component}</div>
      </section>
    </div>
  );
}
