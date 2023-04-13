// TODO
import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ItemType, LocalFileItemType, MimeTypes, convertJs } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import FileItem from './FileItem';

export default {
  title: 'Items/FileItem',
  component: FileItem,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof FileItem>;

const Template: ComponentStory<typeof FileItem> = (
  args,
  { loaded: { content } },
) => {
  return <FileItem {...args} content={content} />;
};

export const Image = Template.bind({});
Image.loaders = [
  async () => ({
    content: await fetch('https://picsum.photos/100').then((r) => r.blob()),
  }),
];
Image.args = {
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
    settings: {},
    creator: 'creator',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }),
};

export const ImageSVG = Template.bind({});
ImageSVG.loaders = [
  async () => ({
    content: await fetch(
      'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg',
    ).then((r) => r.blob()),
  }),
];
ImageSVG.args = {
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
    settings: {},
    creator: 'creator',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }),
};

export const WAVAudio = Template.bind({});
WAVAudio.loaders = [
  async () => ({
    content: await fetch(
      'https://upload.wikimedia.org/wikipedia/commons/8/8f/Bass_loop_2_%28Carrai_Pass%29.wav',
    ).then((r) => r.blob()),
  }),
];
WAVAudio.args = {
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
    creator: 'creator',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }),
};
