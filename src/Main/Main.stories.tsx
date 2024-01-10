import { Meta, type StoryObj, composeStories } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react';

import MainMenu, { MenuItem } from '../MainMenu';
import * as UserSwitchStories from '../UserSwitch/UserSwitch.stories';
import Main from './Main2';

const { SignedIn } = composeStories(UserSwitchStories);

const meta = {
  title: 'Common/Main',
  component: Main,
} satisfies Meta<typeof Main>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    headerLeftContent: (
      <Typography variant='h6' component='div'>
        Header
      </Typography>
    ),
    headerRightContent: <Avatar>H</Avatar>,
    open: false,
    drawerContent: (
      <MainMenu>
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </MainMenu>
    ),
    children: <img src='https://picsum.photos/500' />,
  },
} satisfies Story;

export const Mobile = {
  args: {
    headerLeftContent: (
      <Typography variant='h6' component='div'>
        Header
      </Typography>
    ),
    headerRightContent: <SignedIn />,
    open: false,
    drawerContent: (
      <MainMenu>
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </MainMenu>
    ),
    children: <img src='https://picsum.photos/500' />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
} satisfies Story;

export const Desktop = {
  args: {
    headerLeftContent: (
      <Typography variant='h6' component='div'>
        Header
      </Typography>
    ),
    headerRightContent: <SignedIn />,
    open: true,
    drawerContent: (
      <MainMenu>
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </MainMenu>
    ),
    children: <img src='https://picsum.photos/500' />,
  },
} satisfies Story;
