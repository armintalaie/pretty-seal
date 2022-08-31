import { isDisabled } from "@testing-library/user-event/dist/utils";
import { ReactElement, useContext } from "react";

import { ThemeContext } from "../../../context/themeContext";
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
  isDisabled?: boolean;
  icon?: ReactElement;
  customizations?: Customizations;
  buttonType?: BUTTON_TYPE;
}

const DEFAULT_CUSTOMIZATIONS = {
  bg: ColorOptions.PRIMARY,
};

export default function Button(props: ButtonProps) {
  const { currentTheme } = useContext(ThemeContext);
  const { label, onClick, isDisabled } = props;

  const customizations = { ...DEFAULT_CUSTOMIZATIONS, ...props.customizations };
  const bgColor = customizations.bg;

  if (!props.label) {
    return (
      <button
        disabled={isDisabled}
        style={{
          backgroundColor: currentTheme.primaryColor,
          color: "#ffffff",
          textAlign: "center",
          verticalAlign: "middle",
          borderRadius: "50%",
        }}
        onClick={() => onClick()}
      >
        {props.icon && props.icon}
        {label}
      </button>
    );
  }

  return (
    <button
      style={{ backgroundColor: currentTheme[bgColor] }}
      disabled={isDisabled}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
}
