import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import ResizingIcon from './ResizingIcon';

export default {
  title: 'Icons/ResizingIcon',
  component: ResizingIcon,
} as ComponentMeta<typeof ResizingIcon>;

const Template: ComponentStory<typeof ResizingIcon> = (args) => (
  <ResizingIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
