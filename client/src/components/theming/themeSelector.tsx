import { useContext } from "react";
import { ThemeContext } from "../../setup/themeContext";
import { defaultThemes } from "./themes";

export default function ThemeSelector() {
  const { currentTheme, changeTheme } = useContext(ThemeContext);
  return (
    <section className="theme-selector">
      <h2>Themes</h2>
      <h3>Select one color shade to apply it across the app</h3>
      {Object.values(defaultThemes).map((val) => {
        return (
          <button
            style={{
              backgroundColor: val.primaryColor,
              border:
                val.primaryColor === currentTheme.primaryColor
                  ? "2px solid #c5c5c5c5"
                  : "2px solid transparent",
            }}
            onClick={() => changeTheme(val)}
          ></button>
        );
      })}
    </section>
  );
}
