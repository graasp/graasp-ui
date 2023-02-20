import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import ShareButton from './ShareButton';

export default {
  title: 'Buttons/ShareButton',
  component: ShareButton,

  argTypes: {
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof ShareButton>;

const Template: ComponentStory<typeof ShareButton> = (args) => (
  <ShareButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: false,
};

export const SharingOpen = Template.bind({});
SharingOpen.args = {
  open: true,
};
