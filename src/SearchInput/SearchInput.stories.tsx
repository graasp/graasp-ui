import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { SearchInput } from './SearchInput';

export default {
  title: 'Common/Search',
  component: SearchInput,

  argTypes: {
    onChange: {
      action: 'on change',
    },
  },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  width: 300,
};
