import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, ListItemText, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { BrowserRouter } from 'react-router-dom';

import { CopyButton } from '..';
import ItemBadges from '../ItemBadges/ItemBadges';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Card from './Card';

const meta = {
  title: 'Common/Card',
  component: Card,

  args: {
    isDragging: false,
    isOver: false,
  },
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
    ),
  },
} satisfies Story;

export const Dense: Story = {
  args: {
    dense: true,
    name: 'my card title',
    content: 'folder',
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
    alt: 'graasp',
    to: 'graasp',
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
    footer: (
      <Stack
        width='100%'
        alignItems='center'
        direction='row'
        justifyContent='space-between'
      >
        <ItemBadges isHidden isPublic isPublished isPinned />
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
      </Stack>
    ),
  },
} satisfies Story;

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
      <Stack
        width='100%'
        alignItems='center'
        direction='row'
        justifyContent='space-between'
      >
        <ItemBadges isHidden isPublic isPublished isPinned />
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
      </Stack>
    ),
  },
};

export const DenseMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    dense: true,
    name: 'my card title',
    content: 'my content',
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
    alt: 'graasp',
    footer: 'myfooter',
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // does not show content
    const el = await canvas.findByText(args.content as string);
    expect(el).not.toBeVisible();

    // does not show footer
    const footerEl = await canvas.queryByText(args.footer as string);
    expect(footerEl).not.toBeVisible();
  },
} satisfies Story;
