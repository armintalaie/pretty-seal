import { createContext, useContext } from "react";
import {
  ThemeDetail,
  defaultThemes,
} from "../components/layout/theming/themes";
import { ConfigurationContext } from "./configurationContext";

interface ThemeContextInterface {
  currentTheme: ThemeDetail;
  changeTheme: (theme: ThemeDetail) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  currentTheme: defaultThemes.sealyBlue,
  changeTheme: () => {},
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const spaceTheme = useContext(ConfigurationContext);
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: spaceTheme
          ? spaceTheme.config.theme
          : defaultThemes.sealyBlue,
        changeTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
