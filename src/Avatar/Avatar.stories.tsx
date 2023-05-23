import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Images/Avatar',
  component: Avatar,

  argTypes: {
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const DefaultAvatar: Story = {
  args: {
    alt: 'myname',
    component: 'avatar',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    maxHeight: 100,
    maxWidth: 100,
  },
};

export const ItemThumbnail: Story = {
  args: {
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
};

export const ItemThumbnailAvatar: Story = {
  args: {
    maxHeight: 100,
    maxWidth: 100,
    component: 'avatar',
    url: 'https://picsum.photos/100',
  },
};
