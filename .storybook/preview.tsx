import 'katex/dist/katex.min.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';

import * as React from 'react';
import 'react-quill/dist/quill.snow.css';

import { theme } from '../src/theme';
import './global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
  direction: {
    name: 'Direction',
    description: 'Direction for the components',
    defaultValue: 'ltr',
    toolbar: {
      items: [
        { value: 'ltr', title: 'left-to-right' },
        { value: 'rtl', title: 'right-to-left' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, { globals }) => {
    return (
      <ThemeProvider
        theme={{
          ...theme,
          direction: globals.direction,
          palette: {
            ...theme.palette,
            mode: globals.theme,
          },
        }}
      >
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];
