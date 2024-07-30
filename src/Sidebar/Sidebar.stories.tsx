import type { Meta, StoryObj } from '@storybook/react';
import { CirclePlus, Snowflake, Sparkles } from 'lucide-react';

import { Typography } from '@mui/material';

import { MenuItem } from '@/MainMenu/MenuItem/MenuItem.js';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Sidebar from './Sidebar.js';

const meta: Meta<typeof Sidebar> = {
  title: 'Common/Sidebar',
  component: Sidebar,

  decorators: [
    (story) => {
      return (
        <>
          {story()}
          <img src='https://picsum.photos/500' />
        </>
      );
    },
  ],

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleDrawerClose: {
      action: 'click',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    isSidebarOpen: true,
    drawerHeaderContent: <Typography>My Title</Typography>,
    children: (
      <>
        <MenuItem text='Item 1' icon={<Snowflake />} />
        <MenuItem text='Item 2' icon={<CirclePlus />} />
        <MenuItem text='Item 3' icon={<Sparkles />} />
      </>
    ),
  },
};
