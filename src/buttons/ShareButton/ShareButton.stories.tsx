import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import ShareButton from './ShareButton';

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
};

export default meta;

type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {
  args: {
    open: false,
  },
};

export const SharingOpen: Story = {
  args: {
    open: true,
  },
};

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
