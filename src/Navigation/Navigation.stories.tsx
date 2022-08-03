import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from './Navigation';
import { Context } from '@graasp/sdk';

export default {
  title: 'Navigation',
  component: Navigation,
  parameters: {
    backgrounds: {
      values: [
        { name: 'black', value: '#000' },
        { name: 'white', value: '#fff' },
      ],
    },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const White = Template.bind({});
White.args = {
  currentValue: Context.BUILDER,
};
White.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export const Black = Template.bind({});
Black.args = {
  currentValue: Context.PLAYER,
  buttonColor: 'primary',
  buttonClassname: 'blackColor',
  triangleClassname: 'blackBorderTop',
};
Black.parameters = {
  backgrounds: {
    default: 'white',
  },
};
