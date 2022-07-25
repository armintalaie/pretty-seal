import { useContext } from "react";
import { ThemeContext } from "../../setup/themeContext";

interface ButtonProps {
  onClick: Function;
  label: string;
}

export default function Button(props: ButtonProps) {
  const { currentTheme } = useContext(ThemeContext);
  const { label, onClick } = props;

  return (
    <button
      style={{ backgroundColor: currentTheme.primaryColor }}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}
