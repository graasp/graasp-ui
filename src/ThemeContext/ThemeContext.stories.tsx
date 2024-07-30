import type { Meta, StoryObj } from '@storybook/react';

import { ThemeProvider, useTheme } from './ThemeContext.js';

const Child = (): JSX.Element => {
  const { languageSelect } = useTheme();
  return languageSelect;
};

const meta: Meta<typeof ThemeProvider> = {
  title: 'Context/Theme',
  component: ThemeProvider,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ThemeProvider>;

// hack to actually change a mock i18n
const i18n = {
  language: 'en',
  t: (s: string) => s,
  dir: (l: string) => {
    if (l === 'ar') {
      return 'rtl';
    }
    return 'ltr';
  },
  changeLanguage: (lang: string) => {
    i18n.language = lang;
  },
};

export const Default: Story = {
  args: {
    children: <Child />,
    i18n,
    langs: {
      en: 'English',
      ar: 'Arabic',
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    children: <Child />,
    i18n,
    langs: {
      en: 'English',
      ar: 'Arabic',
    },
  },
};
