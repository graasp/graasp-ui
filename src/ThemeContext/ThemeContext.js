import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime';

import { buildTheme } from '../theme.js';
import LanguageSelect from './LanguageSelect.js';

const ThemeContext = createContext({
  languageSelect: _jsx(_Fragment, {}),
  direction: 'ltr',
});
const getCacheForDirection = (direction) =>
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
}) => {
  const [direction, setDirection] = useState(defaultDirection);
  const languageSelect = _jsx(LanguageSelect, {
    languageSelectSx: languageSelectSx,
    i18n: i18n,
    setDirection: setDirection,
    langs: langs,
    variant: languageSelectVariant,
    label: languageSelectLabel,
    size: languageSelectSize,
  });
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
  return _jsx(ThemeContext.Provider, {
    value: value,
    children: _jsx(MuiThemeProvider, {
      theme: { ...buildTheme(direction), direction },
      children: _jsx(CacheProvider, {
        value: getCacheForDirection(direction),
        children: children,
      }),
    }),
  });
};
const useTheme = () => useContext(ThemeContext);
export { ThemeProvider, useTheme };
