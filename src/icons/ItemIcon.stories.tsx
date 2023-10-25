import type { Meta, StoryObj } from '@storybook/react';

import { ItemType, MimeTypes, S3FileItemExtra } from '@graasp/sdk';

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
        name: '',

        mimetype: MimeTypes.Image.JPEG,
      },
    } as S3FileItemExtra,
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
    } as S3FileItemExtra,
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
    } as S3FileItemExtra,
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
    } as S3FileItemExtra,
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
    } as S3FileItemExtra,
  },
};
