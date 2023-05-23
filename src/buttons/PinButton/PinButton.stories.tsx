import type { Meta, StoryObj } from '@storybook/react';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import PinButton from './PinButton';

const meta: Meta<typeof PinButton> = {
  title: 'Buttons/PinButton',
  component: PinButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      action: 'pin',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PinButton>;

export const IsPinned: Story = {
  args: {
    isPinned: true,
  },
};

export const Icon: Story = {
  args: {
    type: ActionButton.ICON_BUTTON,
  },
};

export const MenuItem: Story = {
  args: {
    type: ActionButton.MENU_ITEM,
  },
};
