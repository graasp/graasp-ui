import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ItemType } from '@graasp/sdk';

import { MIME_TYPES } from '../constants';
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
      mimetype: MIME_TYPES.IMAGE[0],
    },
  },
};

export const Video = Template.bind({});
Video.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MIME_TYPES.VIDEO[0],
    },
  },
};
export const Audio = Template.bind({});
Audio.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MIME_TYPES.AUDIO[0],
    },
  },
};

export const PDF = Template.bind({});
PDF.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MIME_TYPES.PDF[0],
    },
  },
};

export const ZIP = Template.bind({});
ZIP.args = {
  type: ItemType.S3_FILE,
  color: 'black',
  extra: {
    [ItemType.S3_FILE]: {
      mimetype: MIME_TYPES.ZIP[0],
    },
  },
};
