import type { Meta, StoryObj } from '@storybook/react';

import {
  DescriptionPlacement,
  ItemType,
  LocalFileItemFactory,
  MaxWidth,
  MimeTypes,
} from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import { TABLE_CATEGORIES } from '../utils/storybook';
import FileItem from './FileItem';

const meta = {
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
} satisfies Meta<typeof FileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Image = {
  loaders: [
    async () => ({
      content: await fetch('https://picsum.photos/100').then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://picsum.photos/100',
          mimetype: MimeTypes.Image.PNG,
          name: 'original file name',
          size: 2600,
          altText: 'my image alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description: 'my image description',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const ImageDescriptionAbove = {
  loaders: [
    async () => ({
      content: await fetch('https://picsum.photos/100').then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://picsum.photos/100',
          mimetype: MimeTypes.Image.PNG,
          name: 'original file name',
          size: 2600,
          altText: 'my image alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description: 'my image description',
      path: 'item-path',
      settings: {
        descriptionPlacement: DescriptionPlacement.ABOVE,
      },
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const BigContainedImage = {
  loaders: [
    async () => ({
      content: await fetch('https://picsum.photos/1000').then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://picsum.photos/1000',
          mimetype: MimeTypes.Image.PNG,
          name: 'original file name',
          size: 2600,
          altText: 'my image alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description:
        'This image is really big but is constrained to its container',
      path: 'item-path',
      settings: {
        maxWidth: MaxWidth.Small,
      },
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const SmallContainedImage = {
  loaders: [
    async () => ({
      content: await fetch('https://picsum.photos/100').then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://picsum.photos/100',
          mimetype: MimeTypes.Image.PNG,
          name: 'original file name',
          size: 2600,
          altText: 'my image alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description:
        'This image is small but is constrained to its big container',
      path: 'item-path',
      settings: {
        maxWidth: MaxWidth.Large,
      },
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const ImageSVG = {
  loaders: [
    async () => ({
      content: await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg',
      ).then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg',
          mimetype: MimeTypes.Image.SVG, // Should be image/svg+xml
          name: 'original file name',
          size: 2600,
          altText: 'my svg alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description: 'my svg description',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const ImageWebP = {
  loaders: [
    async () => ({
      content: await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vulphere_WebP_OTAGROOVE_demonstration_2.webp',
      ).then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vulphere_WebP_OTAGROOVE_demonstration_2.webp',
          mimetype: MimeTypes.Image.WEBP, // Should be image/svg+xml
          name: 'original file name',
          size: 2600,
          altText: 'my webp alt text',
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description: 'my webp description',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;

export const WAVAudio = {
  loaders: [
    async () => ({
      content: await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/8/8f/Bass_loop_2_%28Carrai_Pass%29.wav',
      ).then((r) => r.blob()),
    }),
  ],
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Bass_loop_2_%28Carrai_Pass%29.wav',
          mimetype: MimeTypes.Audio.WAV, // Should be audio/wav
          name: 'original file name',
          size: 10000000,
          content: '',
        },
      },
      type: ItemType.LOCAL_FILE,
      description: 'my audio description',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
    }),
  },
} satisfies Story;
