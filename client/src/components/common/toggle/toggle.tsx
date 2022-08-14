import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../setup/themeContext";
import "./index.css";

interface ButtonProps {
  onClick: Function;
  status: boolean;
  id: string;
}

export default function Toggle(props: ButtonProps) {
  const { currentTheme } = useContext(ThemeContext);
  const { id, status, onClick } = props;
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status) element.current?.classList.add("ON");
    else {
      element.current?.classList.remove("ON");
    }
  });
  return (
    <div className="container">
      <div
        className="toggle-switch"
        onClick={() => {
          onClick(!status);
        }}
        style={{ backgroundColor: currentTheme.primaryColor }}
      >
        <div
          ref={element}
          style={{ backgroundColor: currentTheme.secondaryColor }}
        >
          {status ? "ON" : "OFF"}
        </div>
      </div>
    </div>
  );
}
