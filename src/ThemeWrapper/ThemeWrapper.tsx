import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { prefixer } from 'stylis';

import { Direction, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { ReactNode, useEffect } from 'react';

import rtlPlugin from '@graasp/stylis-plugin-rtl';

import { theme } from '../theme.js';
import { I18nInstance } from '../types.js';

type Props = {
  children: ReactNode;
  i18n: I18nInstance;
};

const getCacheForDirection = (direction?: Direction): EmotionCache =>
  createCache({
    key: `mui-dir-${direction}`,
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
  });

export function ThemeWrapper({ children, i18n }: Props): JSX.Element {
  const direction = i18n.dir(i18n.language);

  // needed to set the right attribute on the HTML
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  return (
    <MuiThemeProvider theme={{ ...theme, direction }}>
      <CacheProvider value={getCacheForDirection(direction)}>
        {children}
      </CacheProvider>
    </MuiThemeProvider>
  );
}
