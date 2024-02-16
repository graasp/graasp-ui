import type { Meta, StoryObj } from '@storybook/react';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import CopyButton from './CopyButton';

const meta = {
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
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon = {
  args: {
    color: 'primary',
    type: ActionButton.ICON_BUTTON,
    text: 'Copier',
  },
} satisfies Story;

export const MenuItem = {
  args: {
    type: 'menuItem',
  },
} satisfies Story;
