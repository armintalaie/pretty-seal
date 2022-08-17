import { useContext } from "react";

import { ThemeContext } from "../../../setup/themeContext";
import "./index.scss";
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
  label?: string;
  icon?: string;
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

  if (!props.label) {
    return (
      <button
        style={{
          backgroundColor: currentTheme[bgColor],
          color: "#ffffff",
          height: "30px",
          width: "30px",
          textAlign: "center",
          verticalAlign: "middle",
          borderRadius: "50%",
        }}
        onClick={() => onClick()}
      >
        <>
          {props.icon && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/${props.icon}`}
              style={{ height: "16px" }}
            />
          )}
          {label}
        </>
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
