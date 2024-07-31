import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Grip, Snowflake } from 'lucide-react';

import { Box, IconButton, Stack } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';

import ItemBadges from '../ItemBadges/ItemBadges.js';
import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Card from './Card.js';

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
    footer: (
      <Stack
        width='100%'
        alignItems='end'
        direction='row'
        justifyContent='space-between'
      >
        <Box>
          <IconButton>
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
          </IconButton>
        </Box>
        <IconButton>
          <Grip />
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
          <Snowflake />
        </IconButton>
        <IconButton>
          <Snowflake />
        </IconButton>
        <IconButton>
          <Snowflake />
        </IconButton>
      </>
    ),
    menu: (
      <IconButton>
        <Snowflake />
      </IconButton>
    ),
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
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
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
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
          </IconButton>
          <IconButton>
            <Snowflake />
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
  },
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
} satisfies Story;

export const Selected: Story = {
  args: {
    dense: true,
    name: 'my card title',
    content: 'my content',
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
    alt: 'graasp',
    footer: 'myfooter',
    isSelected: true,
    className: 'class-card',
    onThumbnailClick: fn(),
  },
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
} satisfies Story;
