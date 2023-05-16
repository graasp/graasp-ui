// TODO
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ItemType, LocalFileItemType, MimeTypes, convertJs } from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import { TABLE_CATEGORIES } from '../utils/storybook';
import FileItem from './FileItem';

const meta: Meta<typeof FileItem> = {
  title: 'Items/FileItem',
  component: FileItem,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
  render: (args, { loaded: { content } }) => {
    return <FileItem {...args} content={content} />;
  },
};

export default meta;

type Story = StoryObj<typeof FileItem>;

export const Image: Story = {
  loaders: [
    async () => ({
      content: await fetch('https://picsum.photos/100').then((r) => r.blob()),
    }),
  ],
  args: {
    item: convertJs<LocalFileItemType>({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://picsum.photos/100',
          mimetype: MimeTypes.Image.PNG,
          name: 'original file name',
          size: 2600,
        },
      },
      type: 'file',
      description: 'my image description',
      path: 'item-path',
      settings: { altText: 'my image alt text' },
      creator: MOCK_MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
};

export const ImageSVG: Story = {
  loaders: [
    async () => ({
      content: await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg',
      ).then((r) => r.blob()),
    }),
  ],
  args: {
    item: convertJs<LocalFileItemType>({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg',
          mimetype: MimeTypes.Image.SVG, // Should be image/svg+xml
          name: 'original file name',
          size: 2600,
        },
      },
      type: 'file',
      description: 'my svg description',
      path: 'item-path',
      settings: { altText: 'my svg alt text' },
      creator: MOCK_MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
};

export const WAVAudio: Story = {
  loaders: [
    async () => ({
      content: await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/8/8f/Bass_loop_2_%28Carrai_Pass%29.wav',
      ).then((r) => r.blob()),
    }),
  ],
  args: {
    item: convertJs<LocalFileItemType>({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Bass_loop_2_%28Carrai_Pass%29.wav',
          mimetype: MimeTypes.Audio.WAV, // Should be audio/wav
          name: 'original file name',
          size: 10000000,
        },
      },
      type: 'file',
      description: 'my audio description',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
};
