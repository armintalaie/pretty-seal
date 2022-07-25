import { createContext, useState } from "react";
import { ThemeDetail, defaultThemes } from "../components/theming/themes";

interface ThemeContextInterface {
  currentTheme: ThemeDetail;
  changeTheme: (theme: ThemeDetail) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  currentTheme: defaultThemes.evergreen,
  changeTheme: () => {},
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [currentTheme, setCurrentTheme] = useState(defaultThemes.evergreen);

  return (
    <ThemeContext.Provider
      value={{ currentTheme: currentTheme, changeTheme: setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
