import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton, ColorVariants } from '@/types.js';

import { TABLE_CATEGORIES } from '../../utils/storybook.js';
import BookmarkButton from './BookmarkButton.js';

const meta = {
  title: 'Buttons/BookmarkButton',
  component: BookmarkButton,

  args: {
    handleBookmark: fn(),
    handleUnbookmark: fn(),
  },
  argTypes: {
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    color: {
      options: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
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

type Story = StoryObj<typeof BookmarkButton>;

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
