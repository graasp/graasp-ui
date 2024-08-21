import { Meta, type StoryObj, composeStories } from '@storybook/react';
import { CirclePlusIcon, SnowflakeIcon, SparklesIcon } from 'lucide-react';

import { Avatar, Box, Link, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';

import MainMenu from '@/MainMenu/MainMenu.js';
import MenuItem from '@/MainMenu/MenuItem/MenuItem.js';

import * as PlatformSwitchStories from '../PlatformSwitch/PlatformSwitch.stories.js';
import * as UserSwitchStories from '../UserSwitch/UserSwitch.stories.js';
import Main from './Main.js';

const { SignedIn } = composeStories(UserSwitchStories);
const { Dark } = composeStories(PlatformSwitchStories);

const meta = {
  title: 'Main/Main',
  component: Main,

  argTypes: {
    context: {
      control: 'radio',
      options: Object.values(Context),
    },
  },
} satisfies Meta<typeof Main>;
export default meta;

type Story = StoryObj<typeof meta>;

const LinkComponent = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <Link
    sx={{ textDecoration: 'none' }}
    color='inherit'
    href='https://graasp.org'
  >
    {children}
  </Link>
);

const mainContent = (
  <Box p={2}>
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
  </Box>
);

const headerLeftContent = (
  <Typography variant='h6' component='div'>
    Header
  </Typography>
);

const defaultArgs = {
  drawerOpenAriaLabel: 'open drawer',
  headerLeftContent: (
    <Typography variant='h6' component='div'>
      Header
    </Typography>
  ),
  drawerContent: (
    <MainMenu>
      <MenuItem text='Item 1' icon={<SnowflakeIcon />} />
      <MenuItem text='Item 2' icon={<CirclePlusIcon />} />
      <MenuItem text='Item 3' icon={<SparklesIcon />} />
    </MainMenu>
  ),
  children: mainContent,
} satisfies Partial<Story['args']>;

export const Default = {
  args: {
    ...defaultArgs,
    headerRightContent: <Avatar>H</Avatar>,
    open: false,
  },
  parameters: { layout: 'fullscreen' },
} satisfies Story;

export const WithFooter = {
  args: {
    ...defaultArgs,
    headerRightContent: <Avatar>H</Avatar>,
    open: false,
    footerContent: (
      <Box p={2} bgcolor='red' boxShadow='0px -2px 4px -1px rgba(0,0,0,0.2)'>
        Footer
      </Box>
    ),
  },
  parameters: { layout: 'fullscreen' },
} satisfies Story;

export const Mobile = {
  args: {
    ...defaultArgs,
    headerLeftContent,
    headerRightContent: <SignedIn />,
    open: false,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    layout: 'fullscreen',
  },
} satisfies Story;

export const Desktop = {
  args: {
    ...defaultArgs,
    headerLeftContent: (
      <Typography variant='h6' noWrap component='div'>
        Header with a quite long text is in the header
      </Typography>
    ),
    headerRightContent: <SignedIn />,
    open: true,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;

export const BuilderMain = {
  args: {
    ...defaultArgs,
    context: 'builder',
    headerRightContent: <SignedIn />,
    open: true,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;

export const PlayerMain = {
  args: {
    ...defaultArgs,
    context: 'player',
    headerRightContent: <SignedIn />,
    open: true,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;

export const LibraryMain = {
  args: {
    ...defaultArgs,
    context: 'library',
    headerRightContent: <SignedIn />,
    open: false,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;

export const AnalyticsMain = {
  args: {
    ...defaultArgs,
    context: 'analytics',
    headerRightContent: <SignedIn />,
    open: true,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;

export const ColoredBackground = {
  args: {
    ...defaultArgs,
    context: 'builder',
    headerRightContent: <SignedIn />,
    open: true,
    LinkComponent,
    PlatformComponent: <Dark />,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Story;
