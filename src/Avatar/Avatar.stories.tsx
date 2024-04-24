import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Avatar from './Avatar';

const meta = {
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
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAvatar = {
  args: {
    alt: 'myname',
    component: 'avatar',
  },
} satisfies Story;

export const AvatarImage = {
  args: {
    alt: 'Avatar',
    maxHeight: 100,
    maxWidth: 100,
    component: 'avatar',
    url: 'https://picsum.photos/100',
  },
} satisfies Story;

export const Loading = {
  args: {
    alt: 'Loading Avatar',
    isLoading: true,
    maxHeight: 100,
    maxWidth: 100,
  },
} satisfies Story;

export const ItemThumbnail = {
  args: {
    alt: 'Item thumbnail',
    component: 'img',
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
} satisfies Story;
