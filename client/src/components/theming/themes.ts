export interface ThemeDetail {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  isLightMode: boolean;
}

const evergreen: ThemeDetail = {
  primaryColor: "#3d7f6e",
  secondaryColor: "#3d7f6e",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const blueOasis: ThemeDetail = {
  primaryColor: "#41778a",
  secondaryColor: "#7cbed6",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const burningRed: ThemeDetail = {
  primaryColor: "#9c3d3d",
  secondaryColor: "#9c3d3d",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const purePurple: ThemeDetail = {
  primaryColor: "#4f408f",
  secondaryColor: "#4f408f",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

const copper: ThemeDetail = {
  primaryColor: "#B26E63",
  secondaryColor: "#B26E63",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
  isLightMode: false,
};

export const defaultThemes = {
  evergreen: evergreen,
  blueOasis: blueOasis,
  burningRed: burningRed,
  purePurple: purePurple,
  copper: copper,
};
