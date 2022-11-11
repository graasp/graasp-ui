import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: { main: '#ffffff' },
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
