import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import {
  Direction,
  SelectProps as MuiSelectProps,
  ThemeProvider as MuiThemeProvider,
  SxProps,
} from '@mui/material';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { buildTheme } from '../theme.js';
import { I18nInstance } from '../types.js';
import LanguageSelect from './LanguageSelect.js';

type Props = {
  children: JSX.Element | JSX.Element[];
  i18n: I18nInstance;
  langs: { [key: string]: string };
  languageSelectSx: SxProps;
  languageSelectLabel?: string;
  languageSelectVariant?: MuiSelectProps['variant'];
  languageSelectSize?: MuiSelectProps['size'];
  defaultDirection?: Direction;
};

type Context = {
  languageSelect: JSX.Element;
  direction: Direction;
};

const ThemeContext = createContext<Context>({
  languageSelect: <></>,
  direction: 'ltr',
});

const getCacheForDirection = (direction?: Direction): EmotionCache =>
  createCache({
    key: `mui-dir-${direction}`,
    stylisPlugins: [
      prefixer,
      ...(direction === 'rtl' ? [rtlPlugin.default] : []),
    ],
  });

const ThemeProvider = ({
  children,
  i18n,
  langs,
  languageSelectSx,
  languageSelectLabel,
  languageSelectVariant = 'outlined',
  languageSelectSize = 'small',
  defaultDirection = 'ltr',
}: Props): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(defaultDirection);
  const languageSelect = (
    <LanguageSelect
      languageSelectSx={languageSelectSx}
      i18n={i18n}
      setDirection={setDirection}
      langs={langs}
      variant={languageSelectVariant}
      label={languageSelectLabel}
      size={languageSelectSize}
    />
  );
  const value = useMemo(
    () => ({ direction, languageSelect }),
    [direction, languageSelect],
  );

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    setDirection(defaultDirection);
  }, [defaultDirection]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={{ ...buildTheme(direction), direction }}>
        <CacheProvider value={getCacheForDirection(direction)}>
          {children}
        </CacheProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = (): Context => useContext(ThemeContext);

export { ThemeProvider, useTheme };
