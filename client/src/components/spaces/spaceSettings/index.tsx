import { useContext, useState } from "react";
import Button from "../../common/button/button";
import Toggle from "../../common/toggle/toggle";
import { ThemeDetail } from "../../layout/theming/themes";
import ThemeSelector from "../../layout/theming/themeSelector";
import {
  Config,
  Configration,
  ConfigurationContext,
} from "../../../setup/configurationContext";
import { SpaceContext } from "../../../setup/spaceContext";
import "./index.scss";
import { API_BASE_URL } from "../../../services/apiHandler";

export interface ConfigrationTemplate {
  theme?: ThemeDetail;
  showInvite?: boolean;
  showLeave?: boolean;
  canInvite?: boolean;
  customInfoMessage?: string;
  chatBackup?: boolean;
  showNavBar?: boolean;
}

// interface optionI {
//   theme: string;
//   showInvite: string;
//   showLeave: string;
//   canInvite: string;
//   customInfoMessage: string;
//   chatBackup: string;
//   showNavBar: string;
// }

// const option: optionI = {
//   theme: "User can customize theme",
//   showInvite: "Show invite button",
//   showLeave: "Show leave button",
//   canInvite: "User can invite",
//   customInfoMessage: "Show custom message in rooms",
//   chatBackup: "Back up chats to server",
//   showNavBar: "show navigation bar",
// };

export default function SpaceSettings() {
  const spaceConfig = useContext(ConfigurationContext);
  const spaceContext = useContext(SpaceContext);
  const spaceInfo = spaceContext.spaceInfo!;
  const { logOutOfSpace } = spaceContext.spaceController;
  const [config, setConfig] = useState(spaceInfo.configuration);

  const updateConfiguration = (newConfig: Configration) => {
    const copy = Object.assign(config, []);
    setConfig({ ...copy, ...newConfig });
  };

  const applyConfigurationChanges = async () => {
    await fetch(`${API_BASE_URL}/spaces/${spaceInfo.domainId}/configuration`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        configuration: config,
        clientSecret: spaceInfo.clientSecret,
      }),
    });
    spaceConfig.updateConfig(spaceInfo.domainId);
  };

  return (
    <div className="intro">
      <div className="info">
        <div>
          <b>Domain Id: </b>
          {spaceInfo.domainId}{" "}
        </div>
        <div>
          <b>Client Secret: </b>
          {spaceInfo.clientSecret}{" "}
        </div>
      </div>

      <div className="room space">
        <h1>Configurations</h1>

        {Object.keys(spaceInfo.configuration).map((item) => {
          const key = item as keyof Configration;
          if (key === "theme") {
            return (
              <ThemeSelector
                theme={spaceInfo.configuration.theme}
                onClick={(newTheme: ThemeDetail) => {
                  const cop = Object.assign({}, config);
                  cop[key] = newTheme;

                  updateConfiguration(cop);
                }}
              />
            );
          }

          return (
            <div className="settings">
              <h2>{item}</h2>
              {Object.entries(spaceInfo.configuration[key]).map(
                (value, settingsItem) => {
                  return (
                    <section className="row boxed">
                      <h4>{value[0]}</h4>
                      <Toggle
                        id={value[0]}
                        status={value[1] as boolean}
                        onClick={(status: boolean) => {
                          const k2 = value[0] as keyof Config;
                          const cop = Object.assign({}, config);
                          spaceInfo.configuration[key][k2] = status;
                          updateConfiguration(cop);
                        }}
                      />
                    </section>
                  );
                }
              )}
            </div>
          );
        })}

        <div>
          <Button
            label="Apply Changes"
            onClick={() => {
              applyConfigurationChanges();
            }}
          />

          <Button label="Log Out" onClick={logOutOfSpace} />
        </div>
      </div>
    </div>
  );
}
