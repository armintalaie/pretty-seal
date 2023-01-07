import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

export default function Block({ children }: { children: JSX.Element }) {
  const theme = useContext(ThemeContext).currentTheme;
  return <div className={`block ${theme.isLightMode ? "light" : "dark"}`}>{children}</div>;
}
