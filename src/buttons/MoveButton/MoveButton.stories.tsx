import { Meta, StoryObj } from '@storybook/react';

import { ActionButton, ColorVariants } from '@/types.js';
import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import MoveButton from './MoveButton.js';

const meta: Meta<typeof MoveButton> = {
  title: 'Buttons/MoveButton',
  component: MoveButton,

  argTypes: {
    color: {
      options: Object.values(ColorVariants),
      control: {
        type: 'radio',
      },
    },
    onClick: {
      action: 'move',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MoveButton>;

export const MenuItem: Story = {
  args: {
    type: ActionButton.MENU_ITEM,
  },
};

export const Icon: Story = {
  args: {
    type: ActionButton.ICON_BUTTON,
  },
};
