import ThemeProvider from "../../setup/themeContext";
import "./index.css";

export default function Layout({ children }: { children: JSX.Element }) {
  const navbar = () => {
    return (
      <nav>
        <h1>Chatty Seal </h1>
      </nav>
    );
  };

  return (
    <ThemeProvider>
      <div className="layout">
        {navbar()}
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
