// ----------------------------------------------------------------------

export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
  themeContrast: 'default' | 'bold';
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
  themeLayout: 'vertical' | 'mini';
};

export type SettingsContextProps = SettingsValueProps & {
  // state actions
  onUpdate: <K extends keyof SettingsValueProps>(
    name: K,
    value: SettingsValueProps[K]
  ) => void;

  onReset: VoidFunction;
  canReset: boolean;

  // UI state
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
