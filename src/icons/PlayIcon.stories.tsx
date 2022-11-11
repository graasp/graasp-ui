import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import PlayIcon from './PlayIcon';

export default {
  title: 'Icons/PlayIcon',
  component: PlayIcon,

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
} as ComponentMeta<typeof PlayIcon>;

const Template: ComponentStory<typeof PlayIcon> = (args) => (
  <PlayIcon {...args} />
);

export const Default = Template.bind({});
Default.args = { size: 50 };

export const Small = Template.bind({});
Small.args = { size: 30 };
