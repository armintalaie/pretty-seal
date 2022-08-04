export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textcolor: string;
  secondaryTextColor: string;
  isLightMode: boolean;
}

export const DEFAULT_THEME = {
  primaryColor: "#ff3dff",
  secondaryColor: "#aa1dff",
  textcolor: "#ffffff",
  secondaryTextColor: "#ffffff",
  isLightMode: false,
};
