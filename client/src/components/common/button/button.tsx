import { useContext } from "react";
import { ThemeContext } from "../../../setup/themeContext";

export enum ColorOptions {
  PRIMARY = "primaryColor",
  SECONDARY = "secondaryColor",
}

export enum BUTTON_TYPE {
  b1 = "b1",
  b2 = "b2",
}

interface Customizations {
  bg: ColorOptions;
}

interface ButtonProps {
  onClick: Function;
  label: string;
  customizations?: Customizations;
  buttonType?: BUTTON_TYPE;
}

const DEFAULT_CUSTOMIZATIONS = {
  bg: ColorOptions.PRIMARY,
};

export default function Button(props: ButtonProps) {
  const { currentTheme } = useContext(ThemeContext);
  const { label, onClick } = props;

  const customizations = { ...DEFAULT_CUSTOMIZATIONS, ...props.customizations };
  const bgColor = customizations.bg;

  if (props.buttonType === BUTTON_TYPE.b2) {
    return (
      <button
        style={{
          borderRadius: "5px",
          border: `1px solid ${currentTheme[bgColor]}`,
          background: "none",
        }}
        onClick={() => onClick()}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      style={{ backgroundColor: currentTheme[bgColor] }}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}
