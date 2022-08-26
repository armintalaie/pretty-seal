import { createContext, useContext } from "react";
import { ThemeDetail, defaultThemes } from "../components/theming/themes";
import { ConfigurationContext } from "./configurationContext";

interface ThemeContextInterface {
  currentTheme: ThemeDetail;
  changeTheme: (theme: ThemeDetail) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  currentTheme: defaultThemes.sealyLight,
  changeTheme: () => {},
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  let spaceTheme = useContext(ConfigurationContext);
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: spaceTheme ? spaceTheme.config.theme : defaultThemes.sealyLight,
        changeTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}