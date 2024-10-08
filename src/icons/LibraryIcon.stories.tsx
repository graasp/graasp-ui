import type { StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import LibraryIcon from './LibraryIcon.js';

export default {
  title: 'Icons/Library',
  component: LibraryIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    disabled: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
};

type Story = StoryObj<typeof LibraryIcon>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 24 },
};

export const Big: Story = {
  args: { size: 100 },
};

export const Settings: Story = {
  args: { size: 24, showSetting: true },
};
