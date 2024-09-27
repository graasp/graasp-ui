import {
  Direction,
  Theme,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';

import { Context } from '@graasp/sdk';

export const PRIMARY_COLOR = '#000000';
export const SECONDARY_COLOR = '#FFFFFF';

/**
 * Here we explicitly set primary and secondary text colors.
 *
 * These colors do not make use of transparency,
 * as transparent colors do not work well with lucide icons because of overlapping paths.
 */
export const DEFAULT_TEXT_PRIMARY_COLOR = '#313131';
export const DEFAULT_TEXT_SECONDARY_COLOR = '#71717A';
export const DEFAULT_TEXT_DISABLED_COLOR = '#c0c0c4';
export const DEFAULT_ACTIVE_ACTION_COLOR = '#777578';
/**
 * Color used as a light version of the primary color for button and icon backgrounds.
 * For example in card thumbnails.
 */
export const DEFAULT_LIGHT_PRIMARY_COLOR = {
  main: '#ebeaea',
  dark: '#cbcaca',
} as const;

/**
 * Very light red color used as the default background color.
 * Alternative to the pure white default
 */
export const DEFAULT_BACKGROUND_COLOR = '#fffefe';

export const AccentColors: { [K in Context]: string } = {
  [Context.Builder]: '#a3a3a3',
  [Context.Player]: '#a3a3a3',
  [Context.Analytics]: '#a3a3a3',
  [Context.Account]: '#a3a3a3',
  [Context.Library]: '#a3a3a3',
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
  direction?: Direction;
};
export const createGraaspTheme = ({
  fontFamily,
  direction = 'ltr',
}: GraaspThemeOptions): Theme => {
  const baseTheme = createTheme({
    direction,
    palette: {
      action: {
        active: DEFAULT_ACTIVE_ACTION_COLOR,
      },
      text: {
        primary: DEFAULT_TEXT_PRIMARY_COLOR,
        secondary: DEFAULT_TEXT_SECONDARY_COLOR,
        disabled: DEFAULT_TEXT_DISABLED_COLOR,
      },
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
            color: '#bcbcbc',
            backgroundColor: 'white',
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
            '& input': {
              backgroundColor: 'white',
            },
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
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
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

/**
 * @deprecated use buildTheme
 */
export const theme = createGraaspTheme({});

export const buildTheme = (direction: Direction = 'ltr'): Theme =>
  createGraaspTheme({ direction });
