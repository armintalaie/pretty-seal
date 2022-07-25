export interface ThemeDetail {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  secondaryTextColor: string;
}

const evergreen: ThemeDetail = {
  primaryColor: "#3d7f6e",
  secondaryColor: "#3d7f6e",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
};

const blueOasis: ThemeDetail = {
  primaryColor: "#41778a",
  secondaryColor: "#41778a",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
};

const burningRed: ThemeDetail = {
  primaryColor: "#9c3d3d",
  secondaryColor: "#9c3d3d",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
};

const purePurple: ThemeDetail = {
  primaryColor: "#4f408f",
  secondaryColor: "#4f408f",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
};

const copper: ThemeDetail = {
  primaryColor: "#B26E63",
  secondaryColor: "#B26E63",
  textColor: "#ffffff",
  secondaryTextColor: "#000000",
};

export const defaultThemes = {
  evergreen: evergreen,
  blueOasis: blueOasis,
  burningRed: burningRed,
  purePurple: purePurple,
  copper: copper,
};
