import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import PinButton from './PinButton';

const meta: Meta<typeof PinButton> = {
  title: 'Buttons/PinButton',
  component: PinButton,

  argTypes: {
    onClick: {
      action: 'pin',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    pinText: {},
  },
};

export default meta;

type Story = StoryObj<typeof PinButton>;

export const IsPinned: Story = {
  args: {
    isPinned: true,
    color: 'primary',
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
    pinText: 'pin item',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.pinText!));

    expect(args.onClick).toHaveBeenCalled();
  },
};
