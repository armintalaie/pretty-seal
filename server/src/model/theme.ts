export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textcolor: string;
  secondaryTextColor: string;
  isLightMode: boolean;
}

export const DEFAULT_THEME = {
  primaryColor: "#1f3dff",
  secondaryColor: "#a345ff",
  textcolor: "#ffffff",
  secondaryTextColor: "#ffffff",
  isLightMode: false,
};
