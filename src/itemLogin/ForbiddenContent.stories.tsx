import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ForbiddenContent from './ForbiddenContent';
import ForbiddenText from './ForbiddenText';

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
  memberId: 'member-id',
};

export const SignedOut = Template.bind({});
SignedOut.args = {
  memberId: undefined,
};

export const SignedOutShowPseudonymized = Template.bind({});
SignedOutShowPseudonymized.args = {
  showPseudonymized: true,
  memberId: 'member-id',
};
