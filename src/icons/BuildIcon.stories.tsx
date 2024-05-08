import type { StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import BuildIcon from './BuildIcon';

export default {
  title: 'Icons/Builder',
  component: BuildIcon,

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

type Story = StoryObj<typeof BuildIcon>;

export const Default: Story = {
  args: { size: 50 },
};

export const Disabled: Story = {
  args: {
    primaryColor: 'grey',
    secondaryColor: 'white',
  },
};
