import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import BookmarkButton from './BookmarkButton';

const meta = {
  title: 'Buttons/BookmarkButton',
  component: BookmarkButton,

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
    handleBookmark: {
      action: 'add to bookmarks',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    handleUnbookmark: {
      action: 'remove from bookmarks',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} satisfies Meta<typeof BookmarkButton>;

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

    expect(args.handleBookmark).toHaveBeenCalled();
  },
} satisfies Story;
