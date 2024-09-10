import type { Meta, StoryObj } from '@storybook/react';
import { v4 } from 'uuid';

import { Box, Unstable_Grid2 as Grid2, Stack } from '@mui/material';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Avatar from './Avatar.js';
import { getColorFromId, stringToColor } from './stringToColor.js';

const meta = {
  title: 'Images/Avatar',
  component: Avatar,

  argTypes: {
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAvatar = {
  args: {
    alt: 'myname',
    component: 'avatar',
  },
} satisfies Story;

export const AvatarImage = {
  args: {
    alt: 'Avatar',
    maxHeight: 100,
    maxWidth: 100,
    component: 'avatar',
    url: 'https://picsum.photos/100',
  },
} satisfies Story;

export const Loading = {
  args: {
    alt: 'Loading Avatar',
    isLoading: true,
    maxHeight: 100,
    maxWidth: 100,
  },
} satisfies Story;

export const ItemThumbnail = {
  args: {
    alt: 'Item thumbnail',
    component: 'img',
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
} satisfies Story;

export const ColoredAvatars = {
  args: {
    component: 'avatar',
    alt: 'user',
  },
  render: (props) => {
    return (
      <Stack direction='row' gap={2} flexWrap='wrap'>
        {[
          '1',
          '00',
          '11',
          '000',
          '111',
          '0000',
          '1111',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          // 'Evelynn',
          // 'Samuel',
          // 'Bob',
          // 'Natasha',
          // 'Samantha',
          // 'toto',
          // '1234',
          // 'user 007',
          // '1237892378147532',
          // 'west',
          // 'alice',
          // 'ed',
          // 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        ].map((name) => {
          return (
            <Avatar
              {...props}
              key={name}
              alt={name}
              sx={{ bgcolor: stringToColor(name) }}
            />
          );
        })}
      </Stack>
    );
  },
} satisfies Story;

const ids = Array.from(Array(512)).map(() => v4());
const gradientIds = Array.from(Array(64)).map(
  (_, idx) => `${(idx * 4).toString(16).padStart(2, '0')}a`,
);
export const ColoredIdAvatars = {
  args: {
    component: 'avatar',
    alt: 'user',
  },
  render: (props) => {
    return (
      <Stack direction='row' gap={2} flexWrap='wrap'>
        {gradientIds.map((id) => {
          return (
            <Avatar
              {...props}
              key={id}
              alt={id}
              maxWidth='10px'
              maxHeight='10px'
              sx={{ bgcolor: getColorFromId(id) }}
            />
          );
        })}
      </Stack>
    );
  },
} satisfies Story;

export const Colors = {
  args: {
    component: 'avatar',
    alt: 'user',
  },
  render: () => {
    return (
      <Stack direction='row' gap={1}>
        {Array.from(Array(64)).map((_, idx) => {
          const color = `${(idx * 4).toString(16).padStart(2, '0')}`;
          return (
            <Stack direction='column' gap={1}>
              {Array.from(Array(16)).map((_, sat) => (
                <Box
                  bgcolor={getColorFromId(`${color}${sat.toString(16)}`)}
                  height={20}
                  width={20}
                />
              ))}
            </Stack>
          );
        })}
      </Stack>
    );
  },
} satisfies Story;
