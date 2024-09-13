import type { Meta, StoryObj } from '@storybook/react';

import {
  DescriptionPlacement,
  ItemType,
  LocalFileItemFactory,
  MaxWidth,
  MimeTypes,
  UnionOfConst,
} from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures.js';
import FileItem from './FileItem.js';

const meta = {
  title: 'Items/FileItem',
  component: FileItem,

  render: (args, { loaded: { content } }) => {
    return <FileItem {...args} content={content} />;
  },
} satisfies Meta<typeof FileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const buildImageStory = (
  descriptionPlacement?: UnionOfConst<typeof DescriptionPlacement>,
): Story =>
  ({
    args: {
      item: LocalFileItemFactory({
        id: 'my-id',
        name: 'my item name',
        extra: {
          [ItemType.LOCAL_FILE]: {
            path: '/test-assets/small_photo.jpg',
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
        settings: descriptionPlacement ? { descriptionPlacement } : {},
        creator: MOCK_MEMBER,
      }),
    },
  }) satisfies Story;

export const Image = buildImageStory();

export const ImageDescriptionAbove = buildImageStory(
  DescriptionPlacement.ABOVE,
);

export const BigContainedImage = {
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: '/test-assets/big_photo.jpg',
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
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: '/test-assets/small_photo.jpg',
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
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: '/test-assets/test.svg',
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
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: '/test-assets/test.webp',
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
  args: {
    item: LocalFileItemFactory({
      id: 'my-id',
      name: 'my item name',
      extra: {
        [ItemType.LOCAL_FILE]: {
          path: '/test-assets/sample.wav',
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
