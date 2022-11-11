import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import AnalyticsIcon from './AnalyticsIcon';

export default {
  title: 'Icons/AnalyticsIcon',
  component: AnalyticsIcon,

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
} as ComponentMeta<typeof AnalyticsIcon>;

const Template: ComponentStory<typeof AnalyticsIcon> = (args) => (
  <AnalyticsIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
