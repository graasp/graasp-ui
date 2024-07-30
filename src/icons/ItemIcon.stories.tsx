import type { Meta, StoryObj } from '@storybook/react';

import { ItemType, MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import ItemIcon from './ItemIcon.js';

const meta: Meta<typeof ItemIcon> = {
  title: 'Icons/ItemIcon',
  component: ItemIcon,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    type: {
      control: 'radio',
      options: [...Object.values(ItemType), 'upload'],
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
  },
};

export const Image: Story = {
  args: {
    type: ItemType.S3_FILE,
    mimetype: MimeTypes.Image.JPEG,
  },
};

export const Video: Story = {
  args: {
    type: ItemType.S3_FILE,
    mimetype: MimeTypes.Video.MP4,
  },
};

export const Audio: Story = {
  args: {
    type: ItemType.S3_FILE,
    mimetype: MimeTypes.Audio.MP3,
  },
};

export const PDF: Story = {
  args: {
    type: ItemType.S3_FILE,
    mimetype: MimeTypes.PDF,
  },
};

export const ZIP: Story = {
  args: {
    type: ItemType.S3_FILE,
    mimetype: MimeTypes.ZIP,
  },
};

export const App: Story = {
  args: {
    type: ItemType.APP,
  },
};

export const H5P: Story = {
  name: 'H5P',
  args: {
    type: ItemType.H5P,
  },
};

export const Link: Story = {
  args: {
    type: ItemType.LINK,
  },
};

export const Shortcut: Story = {
  args: {
    type: ItemType.SHORTCUT,
  },
};

export const EtherPad: Story = {
  args: {
    type: ItemType.ETHERPAD,
  },
};

export const FancyImage: Story = {
  args: {
    type: ItemType.S3_FILE,
    color: 'red',
    size: '3rem',
    mimetype: MimeTypes.Image.JPEG,
  },
};
