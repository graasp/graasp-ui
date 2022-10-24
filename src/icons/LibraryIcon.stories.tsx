import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import LibraryIcon from './LibraryIcon';

export default {
  title: 'Icons/LibraryIcon',
  component: LibraryIcon,

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
} as ComponentMeta<typeof LibraryIcon>;

const Template: ComponentStory<typeof LibraryIcon> = (args) => (
  <LibraryIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = { size: 20 };

export const Big = Template.bind({});
Big.args = { size: 100 };
