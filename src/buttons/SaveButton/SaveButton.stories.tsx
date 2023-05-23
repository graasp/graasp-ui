import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import SaveButton from './SaveButton';

const meta: Meta<typeof SaveButton> = {
  title: 'Buttons/SaveButton',
  component: SaveButton,

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
