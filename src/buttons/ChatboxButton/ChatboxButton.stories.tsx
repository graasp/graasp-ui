import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import ChatboxButton from './ChatboxButton';

const meta = {
  title: 'Buttons/ChatboxButton',
  component: ChatboxButton,

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
    color: 'error',
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
    showChat: true,
    type: ActionButton.MENU_ITEM,
    showChatText: 'Show Chat',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.showChatText!));

    expect(args.onClick).toHaveBeenCalled();
  },
} satisfies Story;
