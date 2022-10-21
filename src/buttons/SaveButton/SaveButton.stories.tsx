import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import SaveButton from './SaveButton';

export default {
  title: 'Buttons/SaveButton',
  component: SaveButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof SaveButton>;

const Template: ComponentStory<typeof SaveButton> = (args) => (
  <SaveButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  hasChanges: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  hasChanges: true,
  variant: 'outlined',
};

export const Text = Template.bind({});
Text.args = {
  hasChanges: true,
  text: 'You should save',
  savedText: 'No change detected',
};
