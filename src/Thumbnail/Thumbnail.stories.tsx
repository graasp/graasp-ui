import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Thumbnail from './Thumbnail';

export default {
  title: 'Images/Thumbnail',
  component: Thumbnail,

  argTypes: {
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (
  args,
  { loaded: { data } },
) => (
  <Thumbnail
    {...args}
    // @ts-expect-error following function is not a query
    useThumbnail={data ? () => ({ data }) : args.useThumbnail}
  />
);

export const Default = Template.bind({});
Default.args = {
  maxWidth: 100,
  // @ts-expect-error following function is not a query
  useThumbnail: () => ({ data: null }),
  alt: 'myname',
  defaultValue: <>{'no thumbnail'}</>,
};

export const Loading = Template.bind({});
Loading.args = {
  maxWidth: 100,
  // @ts-expect-error following function is not a query
  useThumbnail: () => ({ isLoading: true }),
  maxHeight: 100,
};

export const ItemThumbnail = Template.bind({});
ItemThumbnail.loaders = [
  async () => ({
    data: await fetch('https://picsum.photos/100').then((img) => img.blob()),
  }),
];
ItemThumbnail.args = {
  maxHeight: 100,
  maxWidth: 100,
  // @ts-expect-error following function is not a query
  useThumbnail: () => ({}),
};

export const LinkThumbnail = Template.bind({});
LinkThumbnail.args = {
  maxHeight: 100,
  maxWidth: 100,
  // @ts-expect-error following function is not a query
  useThumbnail: () => ({}),
  thumbnailSrc: 'https://picsum.photos/100',
};
