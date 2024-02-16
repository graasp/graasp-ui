import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import FavoriteButton from './FavoriteButton';

const meta = {
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
} satisfies Meta<typeof FavoriteButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const IsFavorite = {
  args: { isFavorite: true },
} satisfies Story;

export const MenuItem = {
  args: {
    text: 'Add to Favorites',
    type: ActionButton.MENU_ITEM,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.text!));

    expect(args.handleFavorite).toHaveBeenCalled();
  },
} satisfies Story;
