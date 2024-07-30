import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import PlayIcon from './PlayIcon.js';

const meta: Meta<typeof PlayIcon> = {
  title: 'Icons/Player',
  component: PlayIcon,

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

export default meta;

type Story = StoryObj<typeof PlayIcon>;

export const Default: Story = {
  args: { size: 50 },
};

export const Small: Story = {
  args: { size: 30 },
};
