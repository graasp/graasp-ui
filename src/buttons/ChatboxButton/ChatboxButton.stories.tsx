import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types.js';
import { TABLE_CATEGORIES } from '../../utils/storybook.js';
import ChatboxButton from './ChatboxButton.js';

const meta = {
  title: 'Buttons/ChatboxButton',
  component: ChatboxButton,

  args: {
    onClick: fn(),
  },
  argTypes: {
    onClick: {
      action: 'show chat',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} satisfies Meta<typeof ChatboxButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowChat: Story = {
  args: {
    showChat: true,
    color: 'primary',
  },
};

export const Icon: Story = {
  args: {
    showChat: true,
    type: ActionButton.ICON_BUTTON,
  },
};

export const IconFalse: Story = {
  args: {
    showChat: false,
    type: ActionButton.ICON_BUTTON,
  },
};

export const MenuItem = {
  args: {
    showChat: false,
    type: ActionButton.MENU_ITEM,
    showChatText: 'Show Chat',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.showChatText!));

    expect(args.onClick).toHaveBeenCalled();
  },
} satisfies Story;
