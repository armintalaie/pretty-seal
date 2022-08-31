import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import "./index.scss";

export default function Layout({ children }: { children: JSX.Element }) {
  const theme = useContext(ThemeContext).currentTheme;

  return (
    <div className={`layout ${theme.isLightMode ? "light" : "dark"}`}>
      <main>{children}</main>
    </div>
  );
}
