import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '@/types.js';
import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import ShareButton from './ShareButton.js';

const meta: Meta<typeof ShareButton> = {
  title: 'Buttons/ShareButton',
  component: ShareButton,

  argTypes: {
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {};

export const MenuItem: Story = {
  args: {
    type: ActionButton.MENU_ITEM,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Share'));

    expect(args.onClick).toHaveBeenCalled();
  },
};
