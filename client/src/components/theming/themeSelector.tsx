import { useContext, useState } from "react";
import { ThemeContext } from "../../setup/themeContext";
import Button from "../common/button";
import Modal from "../common/modal/modal";
import { defaultThemes, ThemeDetail } from "./themes";

export default function ThemeSelector() {
  const { currentTheme, changeTheme } = useContext(ThemeContext);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTheme, setCustomTheme] = useState<ThemeDetail>({
    primaryColor: "#ffffff",
    secondaryColor: "#ffffff",
    textColor: "#ffffff",
    secondaryTextColor: "#ffffff",
    isLightMode: false,
  });

  const applyCustomTheme = (theme: ThemeDetail) => {
    setShowCustomModal(false);
    setCustomTheme(theme);
    changeTheme(theme);
    console.log(theme);
  };

  return (
    <section className="theme-selector">
      <h2>Themes</h2>
      <h3>Select one color shade to apply it across the app</h3>
      {Object.values(defaultThemes).map((val) => {
        return (
          <button
            style={{
              backgroundColor: val.primaryColor,
              border:
                val.primaryColor === currentTheme.primaryColor
                  ? "2px solid #c5c5c5c5"
                  : "2px solid transparent",
            }}
            onClick={() => changeTheme(val)}
          ></button>
        );
      })}
      <button
        style={{
          // backgroundColor: customTheme.primaryColor,
          border: "2px solid #ffffff",
        }}
        onClick={() => setShowCustomModal(true)}
      >
        Custom Theme
      </button>
      <Modal
        component={<CustomThemeSelector applyTheme={applyCustomTheme} />}
        handleClose={setShowCustomModal}
        showModal={showCustomModal}
      />
    </section>
  );
}

function CustomThemeSelector({ applyTheme }: { applyTheme: Function }) {
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const theme: ThemeDetail = {
    primaryColor: primaryColor,
    secondaryColor: primaryColor,
    textColor: "#ffffff",
    secondaryTextColor: "#ffffff",
    isLightMode: false,
  };
  return (
    <div>
      <h1>Custom Theme</h1>
      <input
        name="name"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      ></input>
      <Button label="Apply Theme" onClick={() => applyTheme(theme)} />
    </div>
  );
}
