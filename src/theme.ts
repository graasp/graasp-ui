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

// add custom typography variants, based on the design guideline
declare module '@mui/material/styles' {
  interface TypographyVariants {
    display: React.CSSProperties;
    label: React.CSSProperties;
    note: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    label?: React.CSSProperties;
    note?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    label: true;
    note: true;
  }
}

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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variants to render a <p> by default
          label: 'p',
          note: 'p',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Roboto', 'sans-serif'].join(','),
    // change base font size to 20px, according to design guideline
    display: {
      fontSize: '4.375rem',
      fontWeight: 800,
    },
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2.1875rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.375rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.375rem',
    },
    body1: {
      fontSize: '1.25rem',
    },
    button: {
      fontSize: '1.25rem',
    },
    label: {
      fontSize: '1.125rem',
      fontWeight: 700,
    },
    note: {
      fontSize: '1.125rem',
    },
  },
});
