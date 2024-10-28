import type { Meta, StoryObj } from '@storybook/react';

import { ThemeWrapper } from './ThemeWrapper.js';

const meta: Meta<typeof ThemeWrapper> = {
  title: 'ThemeWrapper',
  component: ThemeWrapper,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ThemeWrapper>;

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
    children: <div />,
    i18n,
  },
};
