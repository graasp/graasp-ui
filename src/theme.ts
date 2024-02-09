import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Context } from '@graasp/sdk';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';

export const AccentColors: { [K in Context]: string } = {
  [Context.Builder]: '#00C38B',
  [Context.Player]: '#56B0F8',
  [Context.Library]: '#C658D0',
  [Context.Analytics]: '#FA5B7D',
  [Context.Account]: '#F2C955',
  [Context.Unknown]: PRIMARY_COLOR,
} as const;

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
  typography: {
    h1: {
      fontSize: '4rem',
    },
  },
});
