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
    type: {
      control: 'radio',
      options: ItemType,
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

export const ImageWithStyle: Story = {
  args: {
    type: ItemType.FOLDER,
    iconSrc: 'https://picsum.photos/200/100',
    size: '100px',
    sx: {
      borderRadius: 2,
    },
  },
};

export const Image: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    mimetype: MimeTypes.Image.JPEG,
  },
};

export const Video: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    mimetype: MimeTypes.Video.MP4,
  },
};

export const Audio: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    mimetype: MimeTypes.Audio.MP3,
  },
};

export const PDF: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    mimetype: MimeTypes.PDF,
  },
};

export const ZIP: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'black',
    mimetype: MimeTypes.ZIP,
  },
};

export const App: Story = {
  args: {
    type: ItemType.APP,
    color: 'black',
  },
};

export const Link: Story = {
  args: {
    type: ItemType.LINK,
    color: 'black',
  },
};

export const Shortcut: Story = {
  args: {
    type: ItemType.SHORTCUT,
    color: 'black',
  },
};

export const EtherPad: Story = {
  args: {
    type: ItemType.ETHERPAD,
    color: 'black',
  },
};

export const FancyImage: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'red',
    sx: { fontSize: '3rem' },
    extra: {
      [ItemType.S3_FILE]: {
        name: '',
        mimetype: MimeTypes.Image.JPEG,
      },
    } as S3FileItemExtra,
  },
};
