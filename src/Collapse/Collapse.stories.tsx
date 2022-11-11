import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Collapse from './Collapse';

export default {
  title: 'Common/Collapse',
  component: Collapse,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => (
  <Collapse {...args}>
    <img src='https://picsum.photos/100' />
  </Collapse>
);

export const CollapsedImage = Template.bind({});
CollapsedImage.args = {
  title: 'My collapsed element',
};
