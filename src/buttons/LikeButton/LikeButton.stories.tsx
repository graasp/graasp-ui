import type { StoryObj } from '@storybook/react';

import { ColorVariants } from '@/types.js';
import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import LikeButton from './LikeButton.js';

export default {
  title: 'Buttons/LikeButton',
  component: LikeButton,

  argTypes: {
    color: {
      options: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
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
