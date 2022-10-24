import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import ItemFlagButton from './ItemFlagButton';

export default {
  title: 'Actions/Flag/ItemFlagButton',
  component: ItemFlagButton,
} as ComponentMeta<typeof ItemFlagButton>;

const Template: ComponentStory<typeof ItemFlagButton> = (args) => (
  <ItemFlagButton {...args} />
);

export const Default = Template.bind({});
