import type { StoryObj } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react';

import MainMenu, { MenuItem } from '../MainMenu';
import Main from './Main';

export default {
  title: 'Common/Main',
  component: Main,
};

type Story = StoryObj<typeof Main>;

export const Default: Story = {
  args: {
    headerLeftContent: <Typography sx={{ ml: 2 }}>Header</Typography>,
    headerRightContent: <Avatar sx={{ mr: 2 }}>H</Avatar>,
    sidebar: (
      <MainMenu>
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </MainMenu>
    ),
    children: <img src='https://picsum.photos/500' />,
  },
};
