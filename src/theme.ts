import { Theme, createTheme, responsiveFontSizes } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Context } from '@graasp/sdk';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';
export const DEFAULT_BACKGROUND_COLOR = '#fafaff';
export const DEFAULT_GRAY_ICONS_COLOR = '#646464';

export const AccentColors: { [K in Context]: string } = {
  [Context.Builder]: '#00C38B',
  [Context.Player]: '#56B0F8',
  [Context.Library]: '#C658D0',
  [Context.Analytics]: '#FA5B7D',
  [Context.Account]: '#F2C955',
  [Context.Auth]: PRIMARY_COLOR,
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

type GraaspThemeOptions = {
  fontFamily?: string;
};
export const createGraaspTheme = ({
  fontFamily,
}: GraaspThemeOptions): Theme => {
  const baseTheme = createTheme({
    palette: {
      background: { default: DEFAULT_BACKGROUND_COLOR },
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
            color: 'white',
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
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
            backgroundColor: 'white',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
    },
    typography: {
      fontFamily: fontFamily ?? ['Nunito', 'Roboto', 'sans-serif'].join(','),
      display: {
        fontSize: '4.5rem',
        fontWeight: 800,
      },
      h1: {
        fontSize: '3.2rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
      },
      h4: {
        fontSize: '1.6rem',
      },
      h5: {
        fontSize: '1.1rem',
        fontWeight: 700,
      },
      h6: {
        fontSize: '1.1rem',
      },
      body1: {
        fontSize: '1rem',
      },
      button: {
        fontSize: '1rem',
      },
      label: {
        fontSize: '0.9rem',
        fontWeight: 700,
      },
      note: {
        fontSize: '0.9rem',
      },
    },
  });
  return responsiveFontSizes(baseTheme, {
    disableAlign: true,
    factor: 2,
    // allows to also convert non-standard typography styles like "display" that we added
    variants: [
      'display',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body1',
      'body2',
      'caption',
      'button',
      'label',
      'note',
    ],
  });
};
export const theme = createGraaspTheme({});
