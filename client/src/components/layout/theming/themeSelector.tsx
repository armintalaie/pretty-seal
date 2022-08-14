import { useContext, useState } from "react";
import { ThemeContext } from "../../../setup/themeContext";
import Button from "../../common/button/button";
import Modal from "../../common/modal/modal";
import { defaultThemes, ThemeDetail } from "./themes";
import "./index.css";

export interface ThemeSelectorProps {
  theme?: ThemeDetail;
  onClick?: Function;
}

const templateTheme = {
  primaryColor: "#ffffff",
  secondaryColor: "#ffffff",
  textColor: "#ffffff",
  secondaryTextColor: "#ffffff",
  isLightMode: false,
};

export default function ThemeSelector(props: ThemeSelectorProps) {
  const { currentTheme, changeTheme } = useContext(ThemeContext);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTheme, setCustomTheme] = useState<ThemeDetail>(
    props.theme ? props.theme : templateTheme
  );

  const applyCustomTheme = (theme: ThemeDetail) => {
    setShowCustomModal(false);
    setCustomTheme(theme);
    changeTheme(theme);
  };

  return (
    <section className="theme-selector">
      <h2>Themes</h2>
      <h3>Select one color shade to apply it across the app</h3>
      <section>
        {Object.values(defaultThemes).map((val) => {
          return (
            <button
              className="themeBtn"
              style={{
                border:
                  val.primaryColor === currentTheme.primaryColor
                    ? "2px solid #c5c5c5c5"
                    : "2px solid transparent",
              }}
              onClick={() =>
                props.onClick ? props.onClick(val) : changeTheme(val)
              }
            >
              <div
                style={{
                  backgroundColor: val.primaryColor,
                  border:
                    val.primaryColor === currentTheme.primaryColor
                      ? "2px solid #c5c5c5c5"
                      : "2px solid transparent",
                }}
              ></div>

              <div
                style={{
                  backgroundColor: val.secondaryColor,
                  border:
                    val.primaryColor === currentTheme.primaryColor
                      ? "2px solid #c5c5c5c5"
                      : "2px solid transparent",
                }}
              ></div>
            </button>
          );
        })}
        <button
          style={{
            backgroundColor: customTheme.primaryColor,
            border: "2px solid #ffffff",
          }}
          onClick={() => setShowCustomModal(true)}
        >
          Custom
        </button>
        <Modal
          component={
            <CustomThemeSelector
              currentTheme={currentTheme}
              applyTheme={props.onClick ? props.onClick : applyCustomTheme}
            />
          }
          handleClose={setShowCustomModal}
          showModal={showCustomModal}
        />
      </section>
    </section>
  );
}

function CustomThemeSelector({
  currentTheme,
  applyTheme,
}: {
  currentTheme: ThemeDetail;
  applyTheme: Function;
}) {
  const [newTheme, setNewTheme] = useState(currentTheme);

  const updateNewTheme = (field: string, value: string) => {
    setNewTheme((prev) => {
      return { ...prev, [field]: value };
    });
  };

  return (
    <div>
      <h1>Custom Theme</h1>

      <h3>
        Create your own custom theme by provide HEX color codes (inlcuding the
        #){" "}
      </h3>

      <div className="form">
        <div>
          <label
            htmlFor="name"
            style={{
              backgroundColor: newTheme.primaryColor,
              color: newTheme.textColor,
            }}
          >
            Primary Color
          </label>
          <input
            name="primary-color"
            value={newTheme.primaryColor}
            onChange={(e) => updateNewTheme("primaryColor", e.target.value)}
          ></input>
          <input
            name="text-color"
            value={newTheme.textColor}
            onChange={(e) => updateNewTheme("textColor", e.target.value)}
          ></input>
        </div>

        <div>
          <label
            htmlFor="name"
            style={{
              backgroundColor: newTheme.secondaryColor,
              color: newTheme.secondaryTextColor,
            }}
          >
            Secondary Color
          </label>

          <input
            name="secondary-color"
            value={newTheme.secondaryColor}
            onChange={(e) => updateNewTheme("secondaryColor", e.target.value)}
          ></input>
          <input
            value={newTheme.secondaryTextColor}
            name="secondary-text-color"
            onChange={(e) =>
              updateNewTheme("secondaryTextColor", e.target.value)
            }
          ></input>
        </div>

        <div>
          <Button label="Save" onClick={() => applyTheme(newTheme)} />
        </div>
      </div>
    </div>
  );
}
