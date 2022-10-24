import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Avatar from './Avatar';

export default {
  title: 'Images/Avatar',
  component: Avatar,

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
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (
  args,
  { loaded: { data } },
) => (
  // @ts-expect-error useAvatar does not match type
  <Avatar {...args} useAvatar={data ? () => ({ data }) : args.useAvatar} />
);

export const DefaultImage = Template.bind({});
DefaultImage.args = {
  // @ts-expect-error this is not a valid query
  useAvatar: () => ({ data: null }),
  defaultImage: 'https://picsum.photos/100',
};

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  // @ts-expect-error this is not a valid query
  useAvatar: () => ({ data: null }),
  alt: 'myname',
  component: 'avatar',
};

export const Loading = Template.bind({});
Loading.args = {
  // @ts-expect-error this is not a valid query
  useAvatar: () => ({ isLoading: true }),
  maxHeight: 100,
  maxWidth: 100,
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
  // @ts-expect-error this is not a valid query
  useAvatar: () => ({}),
};
