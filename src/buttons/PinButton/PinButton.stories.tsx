import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton, ColorVariants } from '@/types.js';
import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import PinButton from './PinButton.js';

const meta = {
  title: 'Buttons/PinButton',
  component: PinButton,

  args: {
    onClick: fn(),
  },
  argTypes: {
    color: {
      options: Object.values(ColorVariants),
      control: {
        type: 'radio',
      },
    },
    onClick: {
      action: 'pin',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    pinText: {},
  },
} satisfies Meta<typeof PinButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IsPinned = {
  args: {
    isPinned: true,
    color: 'primary',
  },
} satisfies Story;

export const Icon = {
  args: {
    type: ActionButton.ICON_BUTTON,
  },
} satisfies Story;

export const MenuItem = {
  args: {
    type: ActionButton.MENU_ITEM,
    pinText: 'pin item',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.pinText!));

    expect(args.onClick).toHaveBeenCalled();
  },
} satisfies Story;
