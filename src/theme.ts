import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { Context } from '@graasp/sdk';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';

export const AccentColors = {
  [Context.Builder]: '#1ecaa5',
  [Context.Player]: '#009eff',
  [Context.Library]: '#9300c6',
  [Context.Analytics]: '#0707a3',
  [Context.Unknown]: '#1ecaa5',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  zIndex: {
    drawer: 100,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[400],
        },
      },
    },
  },
});
