import type { Meta, StoryObj } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Typography from '@mui/material/Typography';

import { MenuItem } from '../MainMenu';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Sidebar from './Sidebar';

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
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </>
    ),
  },
};
