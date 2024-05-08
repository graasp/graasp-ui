import type { Meta, StoryObj } from '@storybook/react';

import { ItemType, MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemIcon from './ItemIcon';

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

export const H5P: Story = {
  name: 'H5P',
  args: {
    type: ItemType.H5P,
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
    size: '3rem',
    mimetype: MimeTypes.Image.JPEG,
  },
};
