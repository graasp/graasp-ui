import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ItemType, MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemIcon from './ItemIcon';

export default {
  title: 'Icons/ItemIcon',
  component: ItemIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof ItemIcon>;

const Template: ComponentStory<typeof ItemIcon> = (args) => (
  <ItemIcon {...args} />
);

export const Folder = Template.bind({});
Folder.args = {
  type: ItemType.FOLDER,
};

export const Default = Template.bind({});
Default.args = {
  type: ItemType.FOLDER,
  iconSrc: 'https://picsum.photos/100',
};

export const Image = Template.bind({});
Image.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MimeTypes.Image.JPEG,
    },
  },
};

export const Video = Template.bind({});
Video.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MimeTypes.Video.MP4,
    },
  },
};
export const Audio = Template.bind({});
Audio.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MimeTypes.Audio.MP3,
    },
  },
};

export const PDF = Template.bind({});
PDF.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MimeTypes.PDF,
    },
  },
};

export const ZIP = Template.bind({});
ZIP.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MimeTypes.ZIP,
    },
  },
};
