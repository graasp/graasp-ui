import { expect } from '@storybook/jest';
import type { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import FavoriteButton from './FavoriteButton';

export default {
  title: 'Buttons/FavoriteButton',
  component: FavoriteButton,

  argTypes: {
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleFavorite: {
      action: 'add to favorites',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    handleUnfavorite: {
      action: 'remove from favorites',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

type Story = StoryObj<typeof FavoriteButton>;

export const Default: Story = {
  args: {},
};

export const IsFavorite: Story = {
  args: { isFavorite: true },
};

export const MenuItem: Story = {
  args: {
    text: 'Add to Favorites',
    type: ActionButton.MENU_ITEM,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.text!));

    expect(args.handleFavorite).toHaveBeenCalled();
  },
};
