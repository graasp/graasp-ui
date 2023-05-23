import type { StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import EditButton from './EditButton';

export default {
  title: 'Buttons/EditButton',
  component: EditButton,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    className: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

type Story = StoryObj<typeof EditButton>;

export const Default: Story = {
  args: {},
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};
