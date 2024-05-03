import type { Meta, StoryObj } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardActions, ListItem, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

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
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
    thumbnail: 'https://picsum.photos/200/100',
    creator: 'graasp',
    menuItems: [<ListItem>hello</ListItem>],
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
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
    fullWidth: true,
    elevation: false,
    creator: 'graasp',
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
    menuItems: [
      <IconButton>
        <AcUnitIcon />
      </IconButton>,
    ],
  },
} satisfies Story;

export const FullWidth = {
  args: {
    fullWidth: true,
    name: 'my card title',
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
    thumbnail: 'https://picsum.photos/200/100',
    creator: 'graasp',
    footer: (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    ),
  },
} satisfies Story;

export const Badges: Story = {
  args: {
    name: 'my card title',
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
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
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data and we can see the overflow also here it i going to be visible ?',
    thumbnail: 'https://picsum.photos/100/100',
    creator: 'graasp',
  },
};

export const TallCard: Story = {
  args: {
    name: 'my card title',
    description:
      'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
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
