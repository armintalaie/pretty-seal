import { useContext, useState } from "react";
import Toggle from "../../common/toggle/toggle";
import { ThemeDetail } from "../../theming/themes";
import { Config, Configration, ConfigurationContext } from "../../../context/configurationContext";
import { SpaceContext } from "../../../context/spaceContext";
import "./index.scss";
import { API_BASE_URL } from "../../../services/apiHandler";
import Modal from "../../common/modal/modal";
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
              <div key={"theme"}></div>
            );
          }
          return (
            <div className="settings">
              <h3>{item}</h3>
              {Object.entries(spaceInfo.configuration[key]).map((value, settingsItem) => {
                return (
                  <section className="" key={settingsItem}>
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
        <div>
          <button
            onClick={() => {
              applyConfigurationChanges();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_27793)">
                <path
                  d="M4 14.6667L7.2 18.9333C7.56667 19.4222 7.75 19.6667 8 19.6667C8.25 19.6667 8.43333 19.4222 8.8 18.9333L20 4"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_27793">
                  <rect width="24" height="24" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button onClick={() => logOutOfSpace()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1_27835)">
                <g clipPath="url(#clip1_1_27835)">
                  <path
                    d="M16.5001 12L3.00006 12M3.00006 12L7.70129 7M3.00006 12L7.70129 17"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 21L17 21C18.8856 21 19.8284 21 20.4142 20.4142C21 19.8284 21 18.8856 21 17L21 7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3L14 3"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1_27835">
                  <rect width="24" height="24" fill="black" />
                </clipPath>
                <clipPath id="clip1_1_27835">
                  <rect
                    width="24"
                    height="24"
                    fill="black"
                    transform="translate(0 24) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      }
    />
  );
}
