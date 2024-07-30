import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import SaveButton from './SaveButton.js';

const meta: Meta<typeof SaveButton> = {
  title: 'Buttons/SaveButton',
  component: SaveButton,

  args: {
    onClick: fn(),
  },
  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SaveButton>;

export const Default: Story = {
  args: {
    hasChanges: true,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    hasChanges: true,
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    hasChanges: true,
    text: 'You should save',
    savedText: 'No change detected',
  },
};
