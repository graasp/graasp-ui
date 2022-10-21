import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import BuildIcon from './BuildIcon';

export default {
  title: 'Icons/BuildIcon',
  component: BuildIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    disabled: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof BuildIcon>;

const Template: ComponentStory<typeof BuildIcon> = (args) => (
  <BuildIcon {...args} />
);

export const Default = Template.bind({});
Default.args = { size: 50 };

export const Disabled = Template.bind({});
Disabled.args = {};
