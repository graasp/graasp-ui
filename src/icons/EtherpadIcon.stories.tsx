import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import EtherpadIcon from './EtherpadIcon';

export default {
  title: 'Icons/EtherpadIcon',
  component: EtherpadIcon,
} as ComponentMeta<typeof EtherpadIcon>;

const Template: ComponentStory<typeof EtherpadIcon> = (args) => (
  <EtherpadIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};
