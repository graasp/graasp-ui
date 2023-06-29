import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import CopyButton from './CopyButton';

const meta: Meta<typeof CopyButton> = {
  title: 'Buttons/CopyButton',
  component: CopyButton,

  argTypes: {
    iconClassName: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    menuItemClassName: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },

    onClick: {
      action: 'clicked',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
  render: (args) => <CopyButton {...args} />,
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Icon: Story = {
  args: {
    color: 'primary',
    type: 'icon',
    text: 'Copier',
  },
};

export const MenuItem: Story = {
  args: {
    type: 'menuItem',
  },
};
