import { useContext } from "react";
import { ThemeContext } from "../../../setup/themeContext";
import "./index.scss";

export default function Info({ children }: { children: JSX.Element }) {
  const theme = useContext(ThemeContext).currentTheme;
  return (
    <div className="info-wrapper">
      <div className={`info ${theme.isLightMode ? "light" : "dark"}`}>{children}</div>
    </div>
  );
}
