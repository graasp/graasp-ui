import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Context } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Header from './Header';

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

export const Example: Story = {
  args: {
    hasSidebar: true,
    leftContent: <Typography sx={{ ml: 2 }}>Header</Typography>,
    rightContent: <Avatar sx={{ mr: 2 }}>H</Avatar>,
    centerContent: <Typography sx={{ ml: 2 }}>Title</Typography>,
  },
};

export const Builder: Story = {
  args: {
    ...Example.args,
    context: Context.Builder,
  },
};

export const Player: Story = {
  args: {
    ...Example.args,
    context: Context.Player,
  },
};

export const Library: Story = {
  args: {
    ...Example.args,
    context: Context.Library,
  },
};

export const Analytics: Story = {
  args: {
    ...Example.args,
    context: Context.Analytics,
  },
};
