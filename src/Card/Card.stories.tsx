import type { Meta, StoryObj } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardActions, ListItemText, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { BrowserRouter } from 'react-router-dom';

import { CopyButton } from '..';
import ItemBadges from '../ItemBadges/ItemBadges';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Card from './Card';

const meta = {
  title: 'Common/Card',
  component: Card,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    name: 'my card title',
    alt: 'my card title',
    content: (
      <span>
        'my card description might be really long that is why we cut it after
        some lines of text to allow some space for more data'
      </span>
    ),
    thumbnail: 'https://picsum.photos/200/100',
    creator: 'graasp',
    renderMenuItems: () => [
      <ListItemText primary='Hello' />,
      <CopyButton type='menuItem' />,
    ],
    footer: (
      <CardActions sx={{ pt: 0, pl: 0 }}>
        <Stack
          width='100%'
          alignItems='end'
          direction='row'
          justifyContent='space-between'
        >
          <Box>
            <IconButton>
              <AcUnitIcon />
            </IconButton>
            <IconButton>
              <AcUnitIcon />
            </IconButton>
            <IconButton>
              <AcUnitIcon />
            </IconButton>
          </Box>
          <IconButton>
            <GrainIcon />
          </IconButton>
        </Stack>
      </CardActions>
    ),
  },
} satisfies Story;

export const Dense: Story = {
  args: {
    dense: true,
    name: 'my card title',
    content: <span>folder</span>,
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
    alt: 'graasp',
    footer: (
      <>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
      </>
    ),
    renderMenuItems: (fn) => [
      <IconButton onClick={fn}>
        <AcUnitIcon />
      </IconButton>,
    ],
  },
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
} satisfies Story;

export const FullWidth = {
  args: {
    fullWidth: true,
    content: (
      <span>
        'my card description might be really long that is why we cut it after
        some lines of text to allow some space for more data'
      </span>
    ),
    name: 'my card title',
    alt: 'my card title',
    thumbnail: 'https://picsum.photos/200/100',
    creator: 'graasp',
    renderMenuItems: () => [
      <IconButton>
        <MoreVertIcon />
      </IconButton>,
    ],
    footer: <>my footer</>,
  },
} satisfies Story;

export const Badges: Story = {
  args: {
    content: (
      <span>
        'my card description might be really long that is why we cut it after
        some lines of text to allow some space for more data'
      </span>
    ),
    alt: 'my card title',
    name: 'my card title',
    thumbnail: 'https://picsum.photos/200/100',
    creator: 'graasp',
    footer: (
      <>
        <ItemBadges isHidden isPublic isPublished isPinned />
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </>
    ),
  },
};

export const NoActions: Story = {
  args: {
    name: 'my card title',
    thumbnail: 'https://picsum.photos/100/100',
    creator: 'graasp',
    alt: 'graasp',
    content: (
      <span>
        'my card description might be really long that is why we cut it after
        some lines of text to allow some space for more data'
      </span>
    ),
  },
};

export const TallCard: Story = {
  args: {
    content: (
      <span>
        'my card description might be really long that is why we cut it after
        some lines of text to allow some space for more data'
      </span>
    ),
    name: 'my card title',
    alt: 'my card title',
    thumbnail: 'https://picsum.photos/200/500',
    creator: 'graasp',
    height: 300,
    footer: (
      <>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
      </>
    ),
  },
};

export const DenseMobile: Story = {
  args: {
    dense: true,
    name: 'my card title',
    content: <span>folder</span>,
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
    alt: 'graasp',
    footer: (
      <>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
        <IconButton>
          <AcUnitIcon />
        </IconButton>
      </>
    ),
    renderMenuItems: () => [
      <IconButton>
        <AcUnitIcon />
      </IconButton>,
    ],
  },
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
} satisfies Story;
