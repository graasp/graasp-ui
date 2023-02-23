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

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  alt: 'myname',
  component: 'avatar',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  maxHeight: 100,
  maxWidth: 100,
};

export const ItemThumbnail = Template.bind({});
ItemThumbnail.args = {
  maxHeight: 100,
  maxWidth: 100,
  url: 'https://picsum.photos/100',
};

export const ItemThumbnailAvatar = Template.bind({});
ItemThumbnailAvatar.args = {
  maxHeight: 100,
  maxWidth: 100,
  component: 'avatar',
  url: 'https://picsum.photos/100',
};
