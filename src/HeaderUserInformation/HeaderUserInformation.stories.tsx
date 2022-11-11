import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import HeaderUserInformation from './HeaderUserInformation';

export default {
  title: 'Common/HeaderUserInformation',
  component: HeaderUserInformation,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    onClick: { action: 'click' },
  },
} as ComponentMeta<typeof HeaderUserInformation>;

const Template: ComponentStory<typeof HeaderUserInformation> = (args) => (
  <HeaderUserInformation {...args} />
);

export const SignedIn = Template.bind({});
SignedIn.args = {
  avatar: 'https://picsum.photos/100',
  username: 'username',
};

export const SignedOut = Template.bind({});
SignedOut.args = {};
