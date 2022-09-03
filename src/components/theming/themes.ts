export interface ThemeDetail {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  isLightMode: boolean;
}

const purePurple: ThemeDetail = {
  primaryColor: "#92778C",
  secondaryColor: "#ba9bb3",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: true,
};

const copper: ThemeDetail = {
  primaryColor: "#B26E63",
  secondaryColor: "#875951",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const sealyBlue: ThemeDetail = {
  primaryColor: "#2a8da8",
  secondaryColor: "#72a3b0",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const sealyLight: ThemeDetail = {
  primaryColor: "#2688ff",
  secondaryColor: "#82b3e8",
  textColor: "#000000",
  secondaryTextColor: "#000000",
  isLightMode: true,
};

const lavaLight: ThemeDetail = {
  primaryColor: "#e63549",
  secondaryColor: "#e07985",
  textColor: "#000000",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const mojito: ThemeDetail = {
  primaryColor: "#5fb54c",
  secondaryColor: "#c5f598",
  textColor: "#000000",
  secondaryTextColor: "#000000",
  isLightMode: true,
};

export const defaultThemes = {
  sealyLight: sealyLight,
  purePurple: purePurple,
  mojito: mojito,
  sealyBlue: sealyBlue,
  copper: copper,
  lavaLight: lavaLight,
};

export const lightMode = {
  primary: "#000000",
  secondary: "#000000",
};

export const darkMode = {
  primary: "#000000",
  secondary: "#000000",
};
