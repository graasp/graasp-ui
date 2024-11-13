import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Header from './Header.js';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleDrawerOpen: { action: 'open' },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Example = {
  args: {
    hasSidebar: true,
    leftContent: <Typography sx={{ ml: 2 }}>Header</Typography>,
    rightContent: <Avatar sx={{ mr: 2 }}>H</Avatar>,
    centerContent: <Typography sx={{ ml: 2 }}>Title</Typography>,
  },
} satisfies Story;

export const Builder = {
  args: {
    ...Example.args,
    context: Context.Builder,
  },
} satisfies Story;

export const Player = {
  args: {
    ...Example.args,
    context: Context.Player,
  },
} satisfies Story;

export const Library = {
  args: {
    ...Example.args,
    context: Context.Library,
  },
} satisfies Story;

export const Analytics = {
  args: {
    ...Example.args,
    context: Context.Analytics,
  },
} satisfies Story;
