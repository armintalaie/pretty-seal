import { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
import "./index.scss";

interface AlertProps {
  text: string;
  alertType: AlertType;
}

export enum AlertType {
  INFO = "info",
  ALERT = "alert",
}

export default function Alert(props: AlertProps) {
  const theme = useContext(ThemeContext).currentTheme;
  const { text, alertType } = props;
  return (
    <div className={`banner ${alertType}`} style={{ backgroundColor: `${theme.primaryColor}` }}>
      <h3>
        <span className="icon">{/* <LoadingOutlined />{" "} */}</span>
        {text}
        <span className="icon">{/* <CloseOutlined onClick={() => alert("aa")} /> */}</span>
      </h3>
    </div>
  );
}
