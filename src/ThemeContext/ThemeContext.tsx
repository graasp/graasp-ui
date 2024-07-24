import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { Direction, SxProps } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

import { useContext, useEffect, useMemo } from 'react';
import { createContext, useState } from 'react';

import { buildTheme } from '../theme';
import { I18nInstance } from '../types';
import LanguageSelect from './LanguageSelect';

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
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
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
