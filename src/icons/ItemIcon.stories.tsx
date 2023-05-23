import type { Meta, StoryObj } from '@storybook/react';

import { ItemType, MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemIcon from './ItemIcon';

const meta: Meta<typeof ItemIcon> = {
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
};

export default meta;

type Story = StoryObj<typeof ItemIcon>;

export const Folder: Story = {
  args: {
    type: ItemType.FOLDER,
  },
};

export const Default: Story = {
  args: {
    type: ItemType.FOLDER,
    iconSrc: 'https://picsum.photos/100',
  },
};

export const Image: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    extra: {
      [ItemType.S3_FILE]: {
        mimetype: MimeTypes.Image.JPEG,
      },
    },
  },
};

export const Video: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    extra: {
      [ItemType.S3_FILE]: {
        mimetype: MimeTypes.Video.MP4,
      },
    },
  },
};

export const Audio: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    extra: {
      [ItemType.S3_FILE]: {
        mimetype: MimeTypes.Audio.MP3,
      },
    },
  },
};

export const PDF: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    extra: {
      [ItemType.S3_FILE]: {
        mimetype: MimeTypes.PDF,
      },
    },
  },
};

export const ZIP: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    extra: {
      [ItemType.S3_FILE]: {
        mimetype: MimeTypes.ZIP,
      },
    },
  },
};
