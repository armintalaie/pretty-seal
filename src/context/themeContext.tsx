import { createContext, useState } from "react";
import { ThemeDetail, defaultThemes } from "../components/theming/themes";
interface ThemeContextInterface {
  currentTheme: ThemeDetail;
  changeTheme: (theme?: ThemeDetail) => void;
}

const defaultTheme = defaultThemes.sealyLight;
export const ThemeContext = createContext<ThemeContextInterface>({
  currentTheme: defaultTheme,
  changeTheme: () => {},
});

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState(defaultTheme);
  const updateTheme = (newTheme?: ThemeDetail) => {
    if (newTheme) {
      setTheme(newTheme);
    } else {
      setTheme(defaultTheme);
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        changeTheme: updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
