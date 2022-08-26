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

export default function Modal(props: ModalProps) {
  const { component, handleClose, showModal, topBarButtons } = props;
  const theme = useContext(ThemeContext).currentTheme;

  if (!showModal) {
    return <></>;
  }

  return (
    <div className={`modal ${theme.isLightMode ? "light" : "dark"}`}>
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
