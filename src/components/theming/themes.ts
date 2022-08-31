export interface ThemeDetail {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  isLightMode: boolean;
}

const purePurple: ThemeDetail = {
  primaryColor: "#92778C",
  secondaryColor: "#5E4C5A",
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
  primaryColor: "#1a8da8",
  secondaryColor: "#72a3b0",
  textColor: "#000000",
  secondaryTextColor: "#000000",
  isLightMode: true,
};

export const defaultThemes = {
  sealyBlue: sealyBlue,
  sealyLight: sealyLight,
  purePurple: purePurple,
  copper: copper,
};

export const lightMode = {
  primary: "#000000",
  secondary: "#000000",
};

export const darkMode = {
  primary: "#000000",
  secondary: "#000000",
};
