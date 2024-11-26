import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { v4 } from 'uuid';

import { Chip } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import { BrowserRouter } from 'react-router-dom';

import { ItemType } from '@graasp/sdk';

import { BigCard } from './BigCard.js';

const meta = {
  title: 'Common/BigCard',
  component: BigCard,

  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
  argTypes: {},
} satisfies Meta<typeof BigCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'my card title',
    tags: [
      '6th grade at school',
      'English',
      'Mathematics',
      'Taylor',
      'Biology',
      'French',
      'Good',
    ],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
    },
    link: '/link',
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // card link
    await expect(
      document.querySelector(`a[href="${args.link}"]`),
    ).toBeVisible();

    // tags
    args.tags!.map((t) => {
      expect(canvas.getByText(t)).toBeVisible();
    });

    // creator
    expect(canvas.getByText(args.creator!.name)).toBeVisible();

    // likes
    expect(canvas.getByText(args.likeCount!)).toBeVisible();

    // name, description
    expect(canvas.getByText(args.name)).toBeVisible();
    expect(canvas.getByText(args.description!)).toBeVisible();

    // img
    await expect(
      document.querySelector(`img[src="${args.image}"]`),
    ).toBeVisible();
  },
} satisfies Story;

export const LongTitleAndLiked = {
  args: {
    name: 'my card title that is very long because I want to show everything and have more lines',
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    isLiked: true,
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
    },
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
} satisfies Story;

export const OneTag = {
  args: {
    name: 'my card title that is very long because I want to show everything and have more lines',
    tags: ['6th grade'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    isLiked: true,
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
    },
    contentOverImage: <Chip label='mylabel' sx={{ background: 'red' }} />,
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
} satisfies Story;

export const Smaller = {
  args: {
    name: 'my card title',
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
    },
    height: 200,
    numberOfLinesToShow: 2,
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
} satisfies Story;

export const Empty = {
  args: {
    name: 'my card title',
    type: ItemType.DOCUMENT,
    creator: { name: 'member name' },
  },
  play: async ({ canvasElement }) => {
    // no link
    await expect(document.querySelector('#storybook-root a')).toBeNull();
  },
} satisfies Story;

export const WithLink = {
  args: {
    id: 'card-id',
    link: '/href',
    name: 'my card title',
    type: ItemType.DOCUMENT,
  },
  play: async ({ canvasElement }) => {
    // link exists
    await expect(document.querySelector('#storybook-root a')).toBeVisible();
  },
} satisfies Story;

export const WithLinkComponent = {
  args: {
    id: 'card-id',
    link: '/href',
    name: 'my card title',
    type: ItemType.DOCUMENT,
    LinkComponent: ({ to, style, children }) => (
      <a style={style} href={to}>
        {children}
      </a>
    ),
  },
  play: async ({ canvasElement }) => {
    // link exists
    await expect(document.querySelector('#storybook-root a')).toBeVisible();
  },
} satisfies Story;

export const Grid = {
  args: {
    name: 'my card title',
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
    },
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
  render: (args) => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 sm={6} lg={4}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 sm={6} lg={4}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 sm={6} lg={4}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 xs={12}>
          <BigCard {...args} />
        </Grid2>
      </Grid2>
    );
  },
} satisfies Story;
