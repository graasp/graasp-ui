import type { StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import LikeButton from './LikeButton.js';

export default {
  title: 'Buttons/LikeButton',
  component: LikeButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    tooltipLike: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    tooltipUnlike: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleLike: {
      action: 'like',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    handleUnlike: {
      action: 'unlike',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {};
