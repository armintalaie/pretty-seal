import { DEFAULT_THEME, Theme } from "./theme";

export interface Configration {
  theme: Theme;
  showInvite: boolean;
  showLeave: boolean;
  canInvite: boolean;
  customInfoMessage?: string;
  chatBackup: boolean;
  showNavBar: boolean;
}

export const DEFAULT_CONFIG: Configration = {
  theme: DEFAULT_THEME,
  showInvite: true,
  canInvite: true,
  showLeave: false,
  chatBackup: false,
  showNavBar: true,
};
