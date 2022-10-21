import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { PRIMARY_COLOR } from '../theme';
import GraaspLogo from './GraaspLogo';

export default {
  title: 'Icons/GraaspLogo',
  component: GraaspLogo,

  argTypes: {},
} as ComponentMeta<typeof GraaspLogo>;

const Template: ComponentStory<typeof GraaspLogo> = (args) => (
  <GraaspLogo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  height: 40,
};

export const Primary = Template.bind({});
Primary.args = {
  height: 100,
  sx: { fill: PRIMARY_COLOR },
};
