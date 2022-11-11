import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ImmutableMember } from '../types';
import { TABLE_CATEGORIES } from '../utils/storybook';
import ForbiddenContent from './ForbiddenContent';
import ForbiddenText from './ForbiddenText';

const user = new ImmutableMember({ id: 'member-id', name: 'member-name' });

export default {
  title: 'Common/ForbiddenContent',
  component: ForbiddenContent,
  subcomponents: { ForbiddenText },

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
} as ComponentMeta<typeof ForbiddenContent>;

const Template: ComponentStory<typeof ForbiddenContent> = (args) => (
  <ForbiddenContent {...args} />
);

export const SignedIn = Template.bind({});
SignedIn.args = {
  user,
};

export const SignedOut = Template.bind({});
SignedOut.args = {
  user: new ImmutableMember({}),
};

export const SignedOutShowPseudonymized = Template.bind({});
SignedOutShowPseudonymized.args = {
  showPseudonymized: true,
  user,
};
