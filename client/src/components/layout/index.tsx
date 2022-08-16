import ThemeProvider from "../../setup/themeContext";
import "./index.css";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <ThemeProvider>
      <div className="layout">
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
