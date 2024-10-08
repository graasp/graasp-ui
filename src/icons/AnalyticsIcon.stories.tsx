import { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import AnalyticsIcon from './AnalyticsIcon.js';

const meta: Meta<typeof AnalyticsIcon> = {
  title: 'Icons/Analytics',
  component: AnalyticsIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AnalyticsIcon>;

export const Default: Story = {
  args: {},
};
