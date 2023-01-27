// TODO
import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ItemType, LocalFileItemExtra } from '@graasp/sdk';

import { MIME_TYPES } from '../constants';
import { ImmutableItemFactory } from '../types';
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
  item: ImmutableItemFactory<LocalFileItemExtra>({
    id: 'my-id',
    name: 'my item name',
    extra: {
      [ItemType.LOCAL_FILE]: {
        path: 'https://picsum.photos/100',
        mimetype: MIME_TYPES.IMAGE[0],
        name: 'original file name',
        size: 2600,
      },
    },
  }),
};
