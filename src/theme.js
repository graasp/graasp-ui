import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Context } from '@graasp/sdk';

export const PRIMARY_COLOR = '#5050d2';
export const SECONDARY_COLOR = '#FFFFFF';
/**
 * Here we explicitly set primary and secondary text colors.
 *
 * These colors do not make use of transparency,
 * as transparent colors do not work well with lucide icons because of overlapping paths.
 */
export const DEFAULT_TEXT_PRIMARY_COLOR = '#313131';
export const DEFAULT_TEXT_SECONDARY_COLOR = '#71717A';
export const DEFAULT_ACTIVE_ACTION_COLOR = '#777578';
/**
 * Color used as a light version of the primary color for button and icon backgrounds.
 * For example in card thumbnails.
 */
export const DEFAULT_LIGHT_PRIMARY_COLOR = {
  main: 'hsl(249, 100%, 94%)',
  dark: 'hsl(249, 100%, 90%)',
};
/**
 * Very light purple color used as the default background color.
 * Alternative to the pure white default
 */
export const DEFAULT_BACKGROUND_COLOR = '#fafaff';
export const AccentColors = {
  [Context.Builder]: '#00C38B',
  [Context.Player]: '#56B0F8',
  [Context.Library]: '#C658D0',
  [Context.Analytics]: '#FA5B7D',
  [Context.Account]: '#F2C955',
  [Context.Auth]: PRIMARY_COLOR,
  [Context.Unknown]: PRIMARY_COLOR,
};
export const createGraaspTheme = ({ fontFamily, direction = 'ltr' }) => {
  const baseTheme = createTheme({
    direction,
    palette: {
      action: {
        active: DEFAULT_ACTIVE_ACTION_COLOR,
      },
      text: {
        primary: DEFAULT_TEXT_PRIMARY_COLOR,
        secondary: DEFAULT_TEXT_SECONDARY_COLOR,
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
export const buildTheme = (direction = 'ltr') =>
  createGraaspTheme({ direction });
