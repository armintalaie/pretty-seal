import { useContext, useState } from "react";
import Button, { BUTTON_TYPE } from "../../common/button/button";
import Toggle from "../../common/toggle/toggle";
import { ThemeDetail } from "../../theming/themes";
import ThemeSelector from "../../theming/themeSelector";
import { Config, Configration, ConfigurationContext } from "../../../context/configurationContext";
import { SpaceContext } from "../../../context/spaceContext";
import "./index.scss";
import { API_BASE_URL } from "../../../services/apiHandler";
import Modal from "../../common/modal/modal";
import { LogoutOutlined, SaveOutlined } from "@ant-design/icons";
import Info from "../../common/info/info";

export interface ConfigrationTemplate {
  theme?: ThemeDetail;
  showInvite?: boolean;
  showLeave?: boolean;
  canInvite?: boolean;
  customInfoMessage?: string;
  chatBackup?: boolean;
  showNavBar?: boolean;
}

const option = {
  showInvite: "Show Invite button",
  showLeave: "Show leave button",
  canInvite: "User can invite",
  customInfoMessage: "Show custom message in rooms",
  chatBackup: "Back up chats to server",
  showNavBar: "Show space top bar in room",
  showAppName: "Show space top bar in room",
  maxRoomMembers: "Maximum number of users in a room",
  allowNonSpaceUsers: "Allow users not in space to join rooms",
  infoMessage: "Show info message in rooms",
  canCustomize: "Allow custom themes to be applied",
};

export interface SettingsModalProps {
  handleClose: Function;
  showModal: boolean;
}

export default function SpaceSettings(props: SettingsModalProps) {
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

  const component = (
    <div className="intro">
      <Info>
        <>
          <div>
            <b>Domain Id: </b>
            {spaceInfo.domainId}{" "}
          </div>
          <div>
            <b>Client Secret: </b>
            {spaceInfo.clientSecret}{" "}
          </div>
        </>
      </Info>

      <div>
        <h2>Configurations</h2>

        {Object.keys(spaceInfo.configuration).map((item) => {
          const key = item as keyof Configration;
          if (key === "theme") {
            return (
              // <ThemeSelector
              //   theme={spaceInfo.configuration.theme}
              //   onClick={(newTheme: ThemeDetail) => {
              //     const cop = Object.assign({}, config);
              //     cop[key] = newTheme;
              //     updateConfiguration(cop);
              //   }}
              // />
              <></>
            );
          }
          return (
            <div className="settings">
              <h3>{item}</h3>
              {Object.entries(spaceInfo.configuration[key]).map((value, settingsItem) => {
                return (
                  <section className="">
                    <h4>
                      {Object.hasOwn(option, value[0])
                        ? option[value[0] as keyof typeof option]
                        : value[0]}
                    </h4>
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
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Modal
      component={component}
      handleClose={props.handleClose}
      showModal={props.showModal}
      topBarButtons={
        <>
          <Button
            buttonType={BUTTON_TYPE.b2}
            icon={<SaveOutlined />}
            onClick={() => {
              applyConfigurationChanges();
            }}
          />

          <Button buttonType={BUTTON_TYPE.b2} icon={<LogoutOutlined />} onClick={logOutOfSpace} />
        </>
      }
    />
  );
}
