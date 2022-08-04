import { createContext, useContext, useEffect, useState } from "react";
import { ThemeDetail, defaultThemes } from "../components/theming/themes";
import { ConfigurationContext } from "./configurationContext";

interface ThemeContextInterface {
  currentTheme: ThemeDetail;
  changeTheme: (theme: ThemeDetail) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  currentTheme: defaultThemes.evergreen,
  changeTheme: () => {},
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [currentTheme, setCurrentTheme] = useState(
    useContext(ConfigurationContext).config.theme
  );

  useEffect(() => {
    fetch("http://localhost:8080/spaces/MAIN_ROOM/configuration", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((config) => setCurrentTheme(config.theme));
  }, []);

  return (
    <ThemeContext.Provider
      value={{ currentTheme: currentTheme, changeTheme: setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
