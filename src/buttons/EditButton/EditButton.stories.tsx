import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import EditButton from './EditButton';

export default {
  title: 'Buttons/EditButton',
  component: EditButton,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    className: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof EditButton>;

const Template: ComponentStory<typeof EditButton> = (args) => (
  <EditButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};
