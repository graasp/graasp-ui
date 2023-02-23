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
  alt: 'myname',
  defaultComponent: <img src='https://picsum.photos/100' />,
};

export const Loading = Template.bind({});
Loading.args = {
  maxWidth: 100,
  maxHeight: 100,
  isLoading: true,
};

export const ItemThumbnail = Template.bind({});
ItemThumbnail.args = {
  maxHeight: 100,
  maxWidth: 100,
  url: 'https://picsum.photos/100',
};
