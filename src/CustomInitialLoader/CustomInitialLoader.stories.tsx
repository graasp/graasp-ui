import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import CustomInitialLoader from './CustomInitialLoader';

export default {
  title: 'Actions/CustomInitialLoader',
  component: CustomInitialLoader,
  decorators: [
    (story) => {
      return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
          {story()}
        </div>
      );
    },
  ],
  argTypes: {},
} as ComponentMeta<typeof CustomInitialLoader>;

const Template: ComponentStory<typeof CustomInitialLoader> = (args) => (
  <CustomInitialLoader {...args}>{args.children}</CustomInitialLoader>
);

export const Default = Template.bind({});
Default.args = {};
