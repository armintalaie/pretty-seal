import { useContext, useState } from "react";
import Button from "../components/common/button";
import { ModalComponent } from "../components/common/modal/modal";
import Toggle from "../components/common/toggle/toggle";
import { SpaceInfo } from "../components/spaceSetup/spaceSetup";
import { ThemeDetail } from "../components/theming/themes";
import ThemeSelector from "../components/theming/themeSelector";
import {
  Configration,
  ConfigurationContext,
} from "../setup/configurationContext";
import { SpaceContext } from "../setup/spaceContext";

export interface ConfigrationTemplate {
  theme?: ThemeDetail;
  showInvite?: boolean;
  showLeave?: boolean;
  canInvite?: boolean;
  customInfoMessage?: string;
  chatBackup?: boolean;
  showNavBar?: boolean;
}

interface optionI {
  theme: string;
  showInvite: string;
  showLeave: string;
  canInvite: string;
  customInfoMessage: string;
  chatBackup: string;
  showNavBar: string;
}

const option: optionI = {
  theme: "User can customize theme",
  showInvite: "Show invite button",
  showLeave: "Show leave button",
  canInvite: "User can invite",
  customInfoMessage: "Show custom message in rooms",
  chatBackup: "Back up chats to server",
  showNavBar: "show navigation bar",
};

interface SpaceProps extends ModalComponent, SpaceInfo {}

export default function Space(spaceInfo: SpaceProps) {
  let spaceConfig = useContext(ConfigurationContext);
  const spaceContext = useContext(SpaceContext);
  const [config, setConfig] = useState(spaceInfo.configuration);

  const updateConfiguration = (newConfig: ConfigrationTemplate) => {
    const copy = Object.assign(config, []);
    setConfig({ ...copy, ...newConfig });
  };

  const applyConfigurationChanges = async () => {
    const result = await fetch(
      `http://localhost:8080/spaces/${spaceInfo.domainId}/configuration`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      }
    );
    spaceConfig.updateConfig(spaceInfo.domainId);
  };

  return (
    <div className="intro">
      <h4> {spaceInfo.name}</h4>
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
      <div className="info">
        <p>
          You can modify your space configuration and view information about
          rooms and users in your space on this page
        </p>
      </div>

      <div className="room space">
        <h1>Configurations</h1>

        {Object.keys(option).map((item) => {
          if (typeof config[item as keyof Configration] !== "boolean") {
            return <></>;
          }
          return (
            <section className="row">
              <h4>{option[item as keyof optionI]}</h4>
              <Toggle
                id={item}
                status={config[item as keyof Configration] as boolean}
                onClick={(status: ConfigrationTemplate) => {
                  updateConfiguration(status);
                }}
              />
            </section>
          );
        })}
        <ThemeSelector
          theme={config.theme}
          onClick={(newTheme: ThemeDetail) => {
            updateConfiguration({ theme: newTheme });
          }}
        />

        <div>
          <Button
            label="Apply Changes"
            onClick={() => {
              applyConfigurationChanges();
              if (spaceInfo.handleClose) spaceInfo.handleClose();
            }}
          />

          <Button
            label="Log Out"
            onClick={() => {
              spaceContext.updateSpace({ domainId: "MAIN_SPACE" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
