import { Theme } from '@mui/material/styles';
import { ButtonProps, buttonClasses } from '@mui/material/Button';

// ----------------------------------------------------------------------

export function loadingButton(_theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          ...(ownerState.variant === 'soft' && {
            [`&.${buttonClasses.loadingPositionStart} .${buttonClasses.loadingIndicator}`]: {
              left: 10,
            },
            [`&.${buttonClasses.loadingPositionEnd} .${buttonClasses.loadingIndicator}`]: {
              right: 14,
            },
            ...(ownerState.size === 'small' && {
              [`&.${buttonClasses.loadingPositionStart} .${buttonClasses.loadingIndicator}`]: {
                left: 10,
              },
              [`&.${buttonClasses.loadingPositionEnd} .${buttonClasses.loadingIndicator}`]: {
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}
