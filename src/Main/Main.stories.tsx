import { Meta, type StoryObj, composeStories } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react';

import MainMenu, { MenuItem } from '../MainMenu';
import * as UserSwitchStories from '../UserSwitch/UserSwitch.stories';
import Main from './Main';

const { SignedIn } = composeStories(UserSwitchStories);

const meta = {
  title: 'Common/Main',
  component: Main,
} satisfies Meta<typeof Main>;
export default meta;

type Story = StoryObj<typeof meta>;

const mainContent = (
  <>
    <h1>Lorem ipsum dolor sonvallis</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
      non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
      imperdiet. Semp risus in hendrerit gravida rutrum quisque non tellus.
      Convallis co
    </p>
    <img src='https://picsum.photos/500' style={{ maxWidth: '100%' }} />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
      non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
      imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
      Convallis convallis tellus id interdum velit laoreet id donec ultrices.
      Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      adipiscing bibendum est ultricies integer quis. Cursus euismod quis
      viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin
      fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
      tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
      varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
      Lorem donec massa sapien faucibus et molestie ac.
    </p>
    <p>
      Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
      ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
      integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
      lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
      Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
      vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
      accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
      Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
      senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
      aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
      accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
      sagittis orci a.
    </p>
  </>
);

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
    children: mainContent,
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
    children: mainContent,
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
      <Typography variant='h6' noWrap component='div'>
        Header with a quite long text is in the header
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
    children: mainContent,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;
