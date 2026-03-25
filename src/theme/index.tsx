'use client';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// system
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
// options
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import { createContrast } from './options/contrast';
import { merge } from 'lodash';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {

  const presets = createPresets('default');

  const contrast = createContrast('default', 'light');

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette('light'),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows('light'),
        ...presets.customShadows,
      },
      shadows: shadows('light'),
      shape: { borderRadius: 8 },
      typography,
    }),
    [
      'light',
      presets.palette,
      presets.customShadows,
      contrast.palette,
    ]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
  );
}
