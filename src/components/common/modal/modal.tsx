import { ReactElement, useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
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
        <div className="buttons" onClick={() => handleClose()}>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_27794)">
                <path
                  d="M5 5L19 19M19 5L5 19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_27794">
                  <rect width="24" height="24" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </button>
          {topBarButtons}
        </div>

        <div className="content">{component}</div>
      </section>
    </div>
  );
}
